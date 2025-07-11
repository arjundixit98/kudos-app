from django.core.management.base import BaseCommand
from api.models import CustomUser, Kudos
from faker import Faker
import random
from django.utils import timezone

fake = Faker()

class Command(BaseCommand):
    help = 'Generate demo users and kudos interactions with visible summary'

    def handle(self, *args, **kwargs):
        self.stdout.write("🔧 Creating demo users...")
        users = []
        for i in range(5):
            username = f'user{i}'
            user, created = CustomUser.objects.get_or_create(
                username=username,
                defaults={
                    'email': fake.email(),
                    'first_name': fake.first_name(),
                    'last_name': fake.last_name(),
                }
            )
            user.set_password('test1234')
            user.save()
            users.append(user)

            if created:
                self.stdout.write(f"✅ Created user: {username} / password: test1234")
            else:
                self.stdout.write(f"ℹ️  User already exists: {username}")

        self.stdout.write("\n🎯 Generating kudos interactions...\n")

        for _ in range(15):
            sender, receiver = random.sample(users, 2)
            message = fake.sentence(nb_words=6)
            amount = random.randint(1, 5)
            created_at = timezone.make_aware(fake.date_time_this_month())

            Kudos.objects.create(
                sender=sender,
                receiver=receiver,
                message=message,
                created_at=created_at
            )

            self.stdout.write(
                f"{sender.username} ➡️  {receiver.username} | Kudos: {amount} | \"{message}\" | {created_at.strftime('%Y-%m-%d %H:%M')}"
            )

        self.stdout.write(self.style.SUCCESS("\n🎉 Demo data generated successfully!"))