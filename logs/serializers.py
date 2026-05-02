from rest_framework import serializers
from .models import GateLog

class GateLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = GateLog
        fields = '__all__'