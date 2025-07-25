from django.urls import path
from .views import *

urlpatterns = [
    path('auth/send-code/', SendCodeView.as_view()),
    path('auth/verify-code/', VerifyCodeView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('profile/activate-invite/', ActivateInviteCodeView.as_view()),
    path('profile/referals/', ReferralListView.as_view()),
]
