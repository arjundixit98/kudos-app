from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse

# Create your views here.


class HomeAPIView(APIView):
  def get(self, request):
    return JsonResponse({'message':'Hi'})
  

