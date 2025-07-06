from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class CustomUser(AbstractUser):
  organization = models.CharField(max_length=100)

  def __str__(self):
    return self.username
  
class Kudos(models.Model):
  sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE,related_name="kudos_given")
  receiver = models.ForeignKey(CustomUser, on_delete=models.CASCADE,related_name="kudos_received")
  message = models.CharField(max_length=100)

  def __str__(self):
    return f'{self.sender.username} -> {self.message} -> {self.receiver.username}'