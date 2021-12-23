from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

from classes.models import SchoolClass

User = get_user_model()


# Create your tests here.
class UserTestCase(APITestCase):
    def setUp(self) -> None:
        self.staff_user = User.objects.create_user(first_name="Mykola", last_name="Vasilenko", email='staff@gmail.com',
                                              password='dog_name', is_staff=True)
        self.sch_class = SchoolClass.objects.create(grade=7, letter='b')

    def test_staff_user_creates_student_account(self):
        url = reverse('users:students-list')
        data = {
            'user': {
                'first_name': 'Andriy',
                'last_name': 'Prodan',
                'email': 'prodandgri@gmail.com',
            },
            'school_class': self.sch_class.pk
        }
        # resp = self.client.post()