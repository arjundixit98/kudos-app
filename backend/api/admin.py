from django.contrib import admin
from .models import CustomUser, Kudos
# Register your models here.

admin.site.register(CustomUser)
admin.site.register(Kudos)