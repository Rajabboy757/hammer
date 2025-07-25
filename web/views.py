import random
import string
import time
from datetime import datetime, timedelta

from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.utils import timezone

from api.models import User
from web.models import VerificationCode


def register(request):
    if request.user.is_authenticated:

        return redirect('profile')

    return render(request, 'register.html')


def logout_view(request):
    logout(request)
    return redirect('register')


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
    code = int(request.POST['code'])

    if VerificationCode.objects.filter(phone_number=phone_number).exists():

        ver_code_obj = VerificationCode.objects.get(phone_number=phone_number)
        if ver_code_obj.code == code and ver_code_obj.valid_for >= timezone.now():

            user = User.objects.filter(phone_number=phone_number).exists()
            if user:
                user = User.objects.get(phone_number=phone_number)
            else:
                user = User.objects.create(phone_number=phone_number)

            login(request, user)
            request.session['login_status'] = True
            return redirect('profile')

        elif ver_code_obj.code != code:
            error_message = "Invalid code"
        else:
            error_message = "this code is not valid now"

    else:
        error_message = "Invalid phone number"

    context = {
        'phone_number': phone_number,
        'error_message': error_message,
    }
    return render(request, 'send_code.html', context=context)


@login_required
def profile(request):
    user = request.user
    code = request.POST.get('invite_code')
    error_message = ''
    referals = []

    if user.invite_code:
        referals = User.objects.filter(activated_invite_code=user.invite_code)

    if request.POST:
        invite_codes = User.objects.exclude(id=user.id).values_list('invite_code', flat=True)
        if code in invite_codes:
            user.activated_invite_code = code
            user.save()
        else:
            error_message = 'Incorrect invite code'

    context = {
        'user': user,
        'referals': referals,
        'error_message': error_message,
    }
    return render(request, 'profile.html', context=context)


@login_required
def referals(request):
    user = request.user
    referals_list = []

    if user.invite_code:
        referals_list = User.objects.filter(activated_invite_code=user.invite_code)

    context = {
        'referals': referals_list,
    }
    return render(request, 'referals.html', context=context)
