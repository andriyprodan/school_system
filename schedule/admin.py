from django.contrib import admin

# Register your models here.
from schedule.models import PlaceInSchedule, ClassSchedule


admin.site.register(PlaceInSchedule)
admin.site.register(ClassSchedule)