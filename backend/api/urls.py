from django.urls import path
from .views import HomeAPIView, RegisterAPIView, LoginAPIView, LogoutAPIView, AllUsersWithinOrgAPIView, GiveKudosAPIView, KudosStatsAPIView, AuthAPIView

urlpatterns = [
    path('', HomeAPIView.as_view()),
    path('register/', RegisterAPIView.as_view()),
    path('login/', LoginAPIView.as_view()),
    path('logout/', LogoutAPIView.as_view()),
    path('users/<str:org>/', AllUsersWithinOrgAPIView.as_view()),
    path('give_kudos/', GiveKudosAPIView.as_view()),
    path('kudos_stats/<str:username>/', KudosStatsAPIView.as_view()),
    path('auth_check/', AuthAPIView.as_view())
]
