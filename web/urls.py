from django.urls import path
from .views import register, send_code, check_code


urlpatterns = [
    path('', register, name='register'),
    path('send_code/', send_code, name='send_code'),
    path('check_code/<str:phone_number>/', check_code, name='check_code'),
]

