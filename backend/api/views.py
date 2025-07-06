from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import CustomUser
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Kudos
from .serializers import KudosSerializer
from django.utils.timezone import now
from datetime import timedelta
from rest_framework.permissions import IsAuthenticated
# Create your views here.

def get_kudos_given_this_week(user):
  today = now().date()
  start_of_week = today - timedelta(days=today.weekday())
  return len(Kudos.objects.filter(sender=user, created_at__date__gte=start_of_week))


class HomeAPIView(APIView):
  def get(self, request):
    return JsonResponse({'message':'Hi'})
  
class AuthAPIView(APIView):
  permission_classes = [IsAuthenticated]
  def get(self, request):
    try:
      user = request.user
      return Response({'message' : 'User authenticated successfully', 'user' : {'username' : user.username, 'org' : user.organization}}, status=status.HTTP_201_CREATED)
    except Exception as e:
      return Response({'error' : str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

class KudosStatsAPIView(APIView):
  def get(self, request, username):
    try:
      user = CustomUser.objects.get(username=username)
      given = user.kudos_given.all()
      received = user.kudos_received.all()

      given_serializer = KudosSerializer(given,many=True)
      received_serializer = KudosSerializer(received, many=True)

      given_serialized = given_serializer.data
      received_serialized = received_serializer.data

      print(type(given_serialized),given_serialized)
      return Response({'given':given_serialized, 
                       'received':received_serialized,
                       'remaining' : max(0, 3-get_kudos_given_this_week(user))
                        }, status=status.HTTP_200_OK)
    
    except Exception as e:
      return Response({'error' : str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

class GiveKudosAPIView(APIView):
  def post(self, request):
    try:
      data = request.data
      sender = CustomUser.objects.get(username=data['sender_username'])
      receiver = CustomUser.objects.get(username=data['receiver_username'])
      message = data['message']
      
      Kudos.objects.create(sender=sender, receiver=receiver, message=message)

      return Response({'message': 'Kudos successfully given'}, status=status.HTTP_201_CREATED)

    except Exception as e:
      return Response({'error' : str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

class AllUsersWithinOrgAPIView(APIView):
  def get(self, request, org):
    try:
      users = CustomUser.objects.filter(organization=org).values('id', 'username')
      return Response(list(users))
    
    except Exception as e:
      return Response({'error' : str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class LogoutAPIView(APIView):
  def post(self, request):
    try:
      response = Response({'message' : 'Logged out successfully'}, status=status.HTTP_200_OK)

      response.delete_cookie('jwt')
      return response
    
    except Exception as e:
      return Response({'error' : str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class LoginAPIView(APIView):
  def post(self, request):
    try:
      username = request.data.get('username')
      password = request.data.get('pwd')

      user = authenticate(request, username=username, password=password)

      if user is None:
        return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)
      
      # generate JWT tokens
      refresh = RefreshToken.for_user(user)
      access_token = str(refresh.access_token)

      response = Response({'message' : 'Login successful', 'user' : {'username' : username, 'org' : user.organization}}, status=status.HTTP_200_OK)
    
      response.set_cookie(
        key='jwt',
        value=access_token,
        httponly=True
      )

      return response
      
    except Exception as e:
      return Response({'error' : str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class RegisterAPIView(APIView):
  def post(self, request):
    try:
      data = request.data
      if CustomUser.objects.filter(username=data['username']).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
      
      user = CustomUser.objects.create(
        username = data['username'],
        password = make_password(data['pwd']),
        organization = data['org']
      )

      # Create JWT tokens
      refresh = RefreshToken.for_user(user)
      access_token = str(refresh.access_token)

      response = Response({'message' : 'User created successfully', 'user' : {'username' : data['username'], 'org' : user.organization}}, status=status.HTTP_201_CREATED)

      # Set HttpOnly Cookie
      response.set_cookie(
        key='jwt',
        value=access_token,
        httponly=True,
      )

      return response

    except Exception as e:
      return Response({'error' : str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




