import random
import string
import time
from datetime import datetime, timedelta

from django.shortcuts import render, redirect
from django.utils import timezone

from web.models import VerificationCode


def register(request):
    return render(request, 'register.html')


def send_code(request):
    phone_number = request.POST['phone_number']

    if len(phone_number) == 12:
        code = ''.join(random.choices(string.digits, k=4))
        valid_for = timezone.now() + timedelta(minutes=2)

        if VerificationCode.objects.filter(phone_number=phone_number).exists():
            ver_code_obj = VerificationCode.objects.get(phone_number=phone_number)
            ver_code_obj.code = code
            ver_code_obj.valid_for = valid_for
            ver_code_obj.save()
            time.sleep(1)

            # send_ver_code(phone_number, code)

        else:
            ver_code_obj = VerificationCode.objects.create(phone_number=phone_number, code=code, valid_for=valid_for)
            time.sleep(1)

            # send_ver_code(phone_number, code)

        context = {
            'phone_number': phone_number,
            'ver_code_obj': ver_code_obj,
        }
        return render(request, 'send_code.html', context=context)

    else:
        context = {
            'error_message': 'Invalid phone number'
        }

        return render(request, 'register.html', context=context)


def check_code(request, phone_number):
    error_message = ''
    code = int(request.POST['code'])

    if VerificationCode.objects.filter(phone_number=phone_number).exists():

        ver_code_obj = VerificationCode.objects.get(phone_number=phone_number)
        if ver_code_obj.code == code and ver_code_obj.valid_for >= timezone.now():
            return redirect('register')
        elif ver_code_obj.code != code:
            error_message = "Invalid code"
        else:
            print(ver_code_obj.valid_for)
            print(timezone.now())
            print(ver_code_obj.valid_for <= timezone.now())
            error_message = "this code is not valid now"


    else:
        error_message = "Invalid phone number"

    context = {
        'phone_number': phone_number,
        'error_message': error_message,
    }
    return render(request, 'send_code.html', context=context)


