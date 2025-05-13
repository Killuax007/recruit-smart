from rest_framework.routers import DefaultRouter
from .views import *
from django.urls import path, include

router = DefaultRouter()
router.register(r'jobs', JobViewSet)
router.register(r'resumes', ResumeViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('resumes/job/<int:job_id>/', ResumeListByJobView.as_view(), name='resumes-by-job'),
]
