from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

# Create your models here.
from users.models import Student, Teacher


class SchoolClass(models.Model):
    grade = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(11)])
    # a, b, c, d ...
    LETTER_CHOICES = (
        ('А', 'А'),
        ('Б', 'Б'),
        ('В', 'В'),
        ('Г', 'Г'),
        ('Д', 'Д'),
        ('Е', 'Е')
    )
    letter = models.CharField(choices=LETTER_CHOICES, max_length=1)

    @property
    def students_num(self):
        return self.student_set.count()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['grade', 'letter'],
                name='unique class name'
            )
        ]

    def __str__(self):
        return f'{self.grade}-{self.letter}'
