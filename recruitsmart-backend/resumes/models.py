from django.db import models

# Create your models here.
from django.db import models

class Job(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    skills_required = models.TextField()  
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.description}"
    

class Resume(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    candidate_name = models.CharField(max_length=100)
    email = models.EmailField()
    resume_file = models.FileField(upload_to='docs')
    parsed_text = models.TextField(blank=True, null=True)  
    score = models.FloatField(default=0.0)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.candidate_name} - {self.job.title}"
