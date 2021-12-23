from django.db import models

# Create your models here.
from django.core.validators import MaxValueValidator, MinValueValidator

from accounting.models import ClassSubject
from users.models import Teacher


class ClassSchedule(models.Model):
    sch_class = models.OneToOneField('classes.SchoolClass', on_delete=models.CASCADE)

    def __str__(self):
        return f'Розклад {self.sch_class.grade}-{self.sch_class.letter}'


# Місце в розкладі
class PlaceInSchedule(models.Model):
    subject = models.ForeignKey(ClassSubject, on_delete=models.SET_NULL, null=True)
    schedule = models.ForeignKey(ClassSchedule, on_delete=models.CASCADE)

    DAYS_OF_WEEK = (
        (1, 'Понеділок'),
        (2, 'Вівторок'),
        (3, 'Середа'),
        (4, 'Четвер'),
        (5, "П'ятниця"),
        (6, 'Субота'),
    )
    day_of_week = models.PositiveIntegerField(choices=DAYS_OF_WEEK)
    number = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(8)])

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['schedule', 'number', 'day_of_week'],
                name='Два уроки не можуть проводитися одночасно'
            )
        ]

    def __str__(self):
        if self.subject is not None:
            return f'{self.get_day_of_week_display()}, {self.number} урок, {self.subject.subject.name} {self.schedule.sch_class.__str__()}'
        else:
            return f'{self.get_day_of_week_display()}, {self.number} урок'

