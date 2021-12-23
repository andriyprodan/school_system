from django.shortcuts import render, redirect
from rest_framework import viewsets
from django.contrib.auth import login

# Create your views here.
from users.serializers import TeacherSerializer
from users.models import Student, Teacher
from users.permissions import StaffPermission
from users.serializers import StudentSerializer
from django.contrib.auth.forms import AuthenticationForm


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    # permission_classes = (StaffPermission,)


def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('frontend:home')
    else:
        form = AuthenticationForm()
    return render(request, "users/login.html", {'form': form})



class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
