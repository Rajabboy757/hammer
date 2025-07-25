from rest_framework import serializers
from api.models import User
from web.models import VerificationCode

class SendCodeSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=12)

class VerifyCodeSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=12)
    code = serializers.IntegerField()

class InviteCodeActivateSerializer(serializers.Serializer):
    invite_code = serializers.CharField(max_length=6)

class UserProfileSerializer(serializers.ModelSerializer):
    referrals = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['phone_number', 'invite_code', 'activated_invite_code', 'referrals']

    def get_referrals(self, obj):
        return [u.phone_number for u in User.objects.filter(activated_invite_code=obj.invite_code)]
