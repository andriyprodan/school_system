from django.contrib import admin

# Register your models here.
from accounting.models import ClassSubject, SchoolSubject

admin.site.register(ClassSubject)
admin.site.register(SchoolSubject)