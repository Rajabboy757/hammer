from django.contrib import admin

from django.contrib import admin
from .models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'phone_number', 'invite_code', 'activated_invite_code')
    list_display_links = ('phone_number',)
    search_fields = ('invite_code', 'phone_number')


admin.site.register(User, UserAdmin)

