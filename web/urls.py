from django.urls import path
from .views import register, send_code, check_code, profile, logout_view


urlpatterns = [
    path('', register, name='register'),
    path('logout/', logout_view, name='logout'),
    path('send_code/', send_code, name='send_code'),
    path('check_code/<str:phone_number>/', check_code, name='check_code'),
    path('profile/', profile, name='profile'),
]

