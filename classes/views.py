from django.db.models import Avg, Prefetch, F, Count, Case, When
from django.db.models import FloatField
from django.db.models.functions import Round, Cast
from rest_framework import generics
from rest_framework import permissions
from itertools import groupby
from operator import itemgetter
from rest_framework.response import Response

# Create your views here.
from rest_framework.views import APIView

from accounting.models import ClassSubject, Lesson, StudentLesson
from accounting.serializers import ClassSubjectSerializer, LessonSerializer, StatisticsLessonSerializer
from classes.models import SchoolClass
from classes.serializers import SchoolClassSerializer, SchoolClassWithScheduleSerializer
from schedule.serializers import PlaceInScheduleSerializer

from schedule.models import PlaceInSchedule
from users.models import Student
from users.serializers import StudentSerializer


class SchoolClassRetrieveAPIView(generics.RetrieveAPIView):
    queryset = SchoolClass.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = SchoolClassWithScheduleSerializer


class SchoolClassListCreateAPIView(generics.ListCreateAPIView):
    queryset = SchoolClass.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = SchoolClassSerializer

    def get_queryset(self):
        queryset = super().get_queryset().order_by('grade', 'letter')
        return queryset


class ClassScheduleSubjectsAPIView(APIView):
    def get(self, *args, **kwargs):
        # Створення масиву розкладу

        queryset = PlaceInSchedule.objects.select_related('subject').select_related('subject__teacher').filter(
            schedule__sch_class_id=self.kwargs['class_id'])
        queryset = queryset.order_by('number', 'day_of_week')

        data = PlaceInScheduleSerializer(queryset, many=True).data

        number_items = {}
        for number, items in groupby(data, itemgetter('number')):
            number_items[number] = {}
            for day, inner_items in groupby(items, itemgetter('day_of_week')):
                number_items[number][day] = list(inner_items)[0]
        return Response(number_items)


class ClassStudentsStatisticsAPIView(APIView):
    def get(self, *args, **kwargs):
        # Створення масиву успішності

        arr = StudentLesson.objects.values('student', subject=F('lesson__subject')).annotate(
            avg_mark=Round(Avg('mark__value'), precision=1)).annotate(
            presense_percent=(Round(100 * (
                        Cast(Count(Case(When(was_present=True, then=1))), FloatField()) / Cast(Count('id'),
                                                                                               FloatField())))))
        # presense_percent = Count(Case(When(was_present=True, then=1))),
        # presense_total = Count('id'))

        print(arr)
        number_items = {}
        for student_id, items in groupby(arr, itemgetter('student')):
            number_items[student_id] = {}
            for subject_id, inner_items in groupby(items, itemgetter('subject')):
                number_items[student_id][subject_id] = list(inner_items)[0]
        print(number_items)
        return Response(number_items)


class SchoolClassStudentsListAPIView(generics.ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def get_queryset(self):
        queryset = super().get_queryset().filter(school_class_id=self.kwargs['class_id'])
        return queryset


class SchoolClassSubjectsListAPIView(generics.ListAPIView):
    queryset = ClassSubject.objects.all()
    serializer_class = ClassSubjectSerializer

    def get_queryset(self):
        queryset = super().get_queryset().filter(school_class=self.kwargs['class_id'])
        return queryset
