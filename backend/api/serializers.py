from rest_framework import serializers
from .models import CustomUser, Kudos
from django.contrib.auth.hashers import make_password


class KudosSerializer(serializers.ModelSerializer):
  sender = serializers.CharField(source='sender.username')
  receiver = serializers.CharField(source='receiver.username')

  class Meta:
    model = Kudos
    fields = ['message','sender','receiver']