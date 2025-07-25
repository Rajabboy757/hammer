import random
import string
from datetime import timedelta

from django.utils import timezone
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from web.models import VerificationCode
from .serializers import *


# Create your views here.


class SendCodeView(APIView):
    @swagger_auto_schema(
        request_body=SendCodeSerializer,
        operation_description="Send a verification code to phone number"
    )
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
    @swagger_auto_schema(
        request_body=VerifyCodeSerializer,
        operation_description="Verify a verification code and get token "
    )
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

    @swagger_auto_schema(
        request_body=InviteCodeActivateSerializer,
        operation_description="Activate invitors invite code"
    )
    def post(self, request):
        serializer = InviteCodeActivateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        code = serializer.validated_data['invite_code']

        if code == request.user.invite_code:
            return Response({"error": "You can't activate your own code"}, status=400)

        if request.user.activated_invite_code:
            return Response({"error": "Invite code already activated"}, status=400)

        invite_codes = User.objects.exclude(id=request.user.id).values_list('invite_code', flat=True)
        if code in invite_codes:
            request.user.activated_invite_code = code
            request.user.save()
            return Response({"message": "Invite activated"})
        else:
            return Response({"error": "Invalid invite code"}, status=400)


class ReferralListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        referrals = User.objects.filter(activated_invite_code=request.user.invite_code)
        return Response([u.phone_number for u in referrals])
