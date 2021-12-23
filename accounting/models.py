from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from classes.models import SchoolClass
from users.models import Teacher, Student

# Предмет у школі
class SchoolSubject(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name

# предмет класу
class ClassSubject(models.Model):
    subject = models.ForeignKey(SchoolSubject, on_delete=models.CASCADE)
    school_class = models.ForeignKey('classes.SchoolClass', on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f'{self.subject.name} {self.school_class.__str__()}'

# Дані студента для уроку
class StudentLesson(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    lesson = models.ForeignKey('accounting.Lesson', on_delete=models.SET_NULL, null=True)
    was_present = models.BooleanField(default=False)

# Оцінка студента
class Mark(models.Model):
    student_lesson = models.ForeignKey(StudentLesson, on_delete=models.CASCADE)
    value = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(12)])

# Урок
class Lesson(models.Model):
    date = models.DateField()
    subject = models.ForeignKey(ClassSubject, on_delete=models.CASCADE)
    # the teacher who taught the lesson
    teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True)
    students = models.ManyToManyField(Student, through=StudentLesson)


















