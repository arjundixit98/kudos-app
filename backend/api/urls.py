from django.urls import path
from .views import HomeAPIView, RegisterAPIView, LoginAPIView, LogoutAPIView

urlpatterns = [
    path('', HomeAPIView.as_view()),
    path('register/', RegisterAPIView.as_view()),
    path('login/', LoginAPIView.as_view()),
    path('logout/', LogoutAPIView.as_view())

]
