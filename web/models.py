from django.db import models

# Create your models here.


class VerificationCode(models.Model):
    code = models.IntegerField(max_length=4)
    phone_number = models.CharField(max_length=12)
    valid_for = models.DateTimeField()