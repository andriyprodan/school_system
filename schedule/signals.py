from django.db.models.signals import pre_save
from django.dispatch import receiver

from classes.models import SchoolClass
from schedule.models import ClassSchedule, DayOfWeek


# @receiver(pre_save, sender=ClassSchedule)
# def create_schedule_for_school_class(sender, instance, created, **kwargs):
#     if created:
#         instance.days_of_week.set(
#             DayOfWeek.objects.bulk_create([
#                 DayOfWeek(day=dow)
#                 for dow in DayOfWeek.DAYS_OF_WEEK
#             ])
#         )

