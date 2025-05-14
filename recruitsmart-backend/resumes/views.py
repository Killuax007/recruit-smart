from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions,generics
from rest_framework.generics import RetrieveAPIView

from .models import Job, Resume
from .serializers import JobSerializer, ResumeSerializer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.AllowAny]
    
    
class JobDetailView(RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
class ResumeViewSet(viewsets.ModelViewSet):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    permission_classes = [permissions.AllowAny]

class ResumeListByJobView(generics.ListAPIView):
    serializer_class = ResumeSerializer

    def get_queryset(self):
        job_id = self.kwargs.get("job_id")
        return Resume.objects.filter(job_id=job_id).order_by("-score")