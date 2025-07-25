from django.db import models
from django.contrib.auth.models import AbstractBaseUser
import random
import string


def generate_unique_invite_code():
    # from .models import User  # avoid circular import if put elsewhere

    while True:
        code = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
        if not User.objects.filter(invite_code=code).exists():
            return code


class User(AbstractBaseUser):
    phone_number = models.CharField(max_length=15, unique=True)
    invite_code = models.CharField(max_length=6, unique=True)
    activated_invite_code = models.CharField(max_length=6, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'phone_number'

    def __str__(self):
        return self.phone_number

    def save(self, *args, **kwargs):
        if not self.invite_code:
            self.invite_code = generate_unique_invite_code()
        super().save(*args, **kwargs)
