from django.db.models.signals import post_save
from django.dispatch import receiver

from classes.models import SchoolClass
from schedule.models import ClassSchedule, PlaceInSchedule


#
#
@receiver(post_save, sender=SchoolClass)
def create_schedule_for_school_class(sender, instance, created, **kwargs):
    """
    Сигнал, що створює розлкад для класу після того, як клас створено
    """
    if created:
        sch = ClassSchedule.objects.create(sch_class=instance)
        day_number_list = []
        for i in range(1, 7):
            for j in range(1, 9):
                day_number_list.append((i, j))
        PlaceInSchedule.objects.bulk_create([
            PlaceInSchedule(schedule=sch, day_of_week=day, number=number)
            for day, number in day_number_list
        ])




