from django.db import models

# Create your models here.


class VerificationCode(models.Model):
    code = models.IntegerField()
    phone_number = models.CharField(max_length=12)
    valid_for = models.DateTimeField()