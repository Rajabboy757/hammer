from django.contrib import admin
from .models import VerificationCode


class VerificationCodeAdmin(admin.ModelAdmin):
    list_display = ('id', 'phone_number', 'code', 'valid_for')
    list_display_links = ('phone_number',)
    search_fields = ('code', 'phone_number')


admin.site.register(VerificationCode, VerificationCodeAdmin)
