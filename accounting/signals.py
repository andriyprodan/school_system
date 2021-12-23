from django.db.models.signals import post_save
from django.dispatch import receiver

from accounting.models import Lesson
from classes.models import SchoolClass


@receiver(post_save, sender=Lesson)
def create_schedule_for_school_class(sender, instance, created, **kwargs):
    if created:
        instance.students.set(instance.subject.school_class.student_set.all())



