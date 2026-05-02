from django.db import models

class GateLog(models.Model):
    name = models.CharField(max_length=100)
    id_number= models.CharField(max_length=20)
    destination = models.CharField(max_length=100)
    
    check_in_time = models.DateTimeField(auto_now_add=True)
    check_out_time = models.DateTimeField(null=True, blank=True)
    
    def duration(self):
        if self.check_out_time:
            return self.check_out_time - self.check_in_time
        return None
    def __str__(self):
        return f"{self.name} ({self.id_number}) - {self.destination}"