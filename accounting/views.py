from django.shortcuts import render
from rest_framework import viewsets, generics

# Create your views here.
from accounting.models import Lesson, ClassSubject, StudentLesson, Mark
from accounting.serializers import LessonSerializer, ClassSubjectSerializer, UpdateStudentLessonSerializer, \
    MarkSerializer, ReadLessonSerializer
from djangoProject.mixins import MultiSerializerViewSetMixin

# Приклади представлень DRF
class LessonViewSet(MultiSerializerViewSetMixin, viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_action_classes = {
        LessonSerializer: ('update', 'partial_update', 'list', 'create'),
        ReadLessonSerializer: ('retrieve', 'list')
    }


class ClassSubjectViewSet(viewsets.ModelViewSet):
    queryset = ClassSubject.objects.all()
    serializer_class = ClassSubjectSerializer


class StudentLessonUpdateAPIView(generics.UpdateAPIView):
    queryset = StudentLesson.objects.all()
    serializer_class = UpdateStudentLessonSerializer


class MarkViewSet(viewsets.ModelViewSet):
    queryset = Mark.objects.all()
    serializer_class = MarkSerializer




