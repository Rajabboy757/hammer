from django.contrib import admin
from django.urls import path, include
from django.views.static import serve
from django.urls import re_path
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    re_path(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
    re_path(r'^files/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    path('admin123/', admin.site.urls),
    path('api/', include('api.urls')),
    path('web/', include('web.urls')),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)