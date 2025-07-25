import random
import string
from datetime import timedelta

from django.utils import timezone
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *


# Create your views here.


class SendCodeView(APIView):
    def post(self, request):
        serializer = SendCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone = serializer.validated_data['phone_number']

        code = ''.join(random.choices(string.digits, k=4))
        valid_for = timezone.now() + timedelta(minutes=2)

        vc, created = VerificationCode.objects.update_or_create(
            phone_number=phone,
            defaults={'code': code, 'valid_for': valid_for}
        )

        # send_ver_code(phone, code)
        return Response({"message": f"Code sent to {phone} (mocked: {code})"})


class VerifyCodeView(APIView):
    def post(self, request):
        serializer = VerifyCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone = serializer.validated_data['phone_number']
        code = serializer.validated_data['code']

        try:
            vc = VerificationCode.objects.get(phone_number=phone)
        except VerificationCode.DoesNotExist:
            return Response({"error": "Code not found"}, status=400)

        if vc.code != code:
            return Response({"error": "Invalid code"}, status=400)
        if vc.valid_for < timezone.now():
            return Response({"error": "Code expired"}, status=400)

        user, _ = User.objects.get_or_create(phone_number=phone)

        from rest_framework.authtoken.models import Token
        token, _ = Token.objects.get_or_create(user=user)

        return Response({"token": token.key})


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)


class ActivateInviteCodeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = InviteCodeActivateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        code = serializer.validated_data['invite_code']

        if code == request.user.invite_code:
            return Response({"error": "You can't activate your own code"}, status=400)

        try:
            inviter = User.objects.get(invite_code=code)
        except User.DoesNotExist:
            return Response({"error": "Invalid invite code"}, status=400)

        if request.user.activated_invite_code:
            return Response({"error": "Invite code already used"}, status=400)

        request.user.activated_invite_code = code
        request.user.save()
        return Response({"message": "Invite activated"})


class ReferralListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        referrals = User.objects.filter(activated_invite_code=request.user.invite_code)
        return Response([u.phone_number for u in referrals])
