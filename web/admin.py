from django.contrib import admin
from .models import VerificationCode


class VerificationCodeAdmin(admin.ModelAdmin):
    list_display = ('id', 'code', 'phone_number', 'valid_for')
    list_display_links = ('phone_number',)
    search_fields = ('code', 'phone_number')


admin.site.register(VerificationCode, VerificationCodeAdmin)
