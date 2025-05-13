
import docx
import fitz
from rest_framework import serializers
from .models import *

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = '__all__'
        
    def create(self, validated_data):
        resume_file = validated_data.get('resume_file')
        job = validated_data.get('job')

        # Extract text
        text = self.extract_text(resume_file)
        validated_data['parsed_text'] = text

        # Score
        score = self.calculate_score(text, job.skills_required)
        validated_data['score'] = score

        return super().create(validated_data)

    def extract_text(self, resume_file):
        name = resume_file.name.lower()
        if name.endswith('.pdf'):
            return self.extract_pdf_text(resume_file)
        elif name.endswith('.docx'):
            return self.extract_docx_text(resume_file)
        else:
            return ''

    def extract_pdf_text(self, file):
        text = ""
        with fitz.open(stream=file.read(), filetype="pdf") as doc:
            for page in doc:
                text += page.get_text()
        return text

    def extract_docx_text(self, file):
        text = ""
        doc = docx.Document(file)
        for para in doc.paragraphs:
            text += para.text + "\n"
        return text

    def calculate_score(self, text, required_skills):
        if not required_skills:
            return 0.0
        skills = [s.strip().lower() for s in required_skills.split(",")]
        count = sum(skill in text.lower() for skill in skills)
        return round((count / len(skills)) * 100, 2)
