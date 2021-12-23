from rest_framework import serializers

from accounting.models import Lesson, ClassSubject, StudentLesson, Mark
from users.serializers import StudentSerializer, TeacherSerializer


# Приклад серілізаторів DRF
class MarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = '__all__'


class UpdateStudentLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentLesson
        fields = '__all__'


class StudentLessonSerializer(serializers.ModelSerializer):
    mark_set = MarkSerializer(many=True)
    student = StudentSerializer()

    class Meta:
        model = StudentLesson
        fields = '__all__'
        depth = 2


class ReadLessonSerializer(serializers.ModelSerializer):
    studentlesson_set = StudentLessonSerializer(many=True, read_only=True)

    class Meta:
        model = Lesson
        fields = '__all__'
        # read_only_fields = ('students',)
        depth = 3


class StatisticsLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'


class LessonSerializer(serializers.ModelSerializer):
    studentlesson_set = StudentLessonSerializer(many=True, read_only=True)

    class Meta:
        model = Lesson
        # fields = '__all__'
        # read_only_fields = ('students',)
        exclude = ('students',)


class ClassSubjectSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer()
    class Meta:
        model = ClassSubject
        fields = '__all__'
        depth = 2
