from django.contrib import admin
from .models import GateLog

@admin.register(GateLog)
class GateLogAdmin(admin.ModelAdmin):
    list_display = ('name', 'id_number', 'destination', 'check_in_time', 'check_out_time')
    search_fields = ('name', 'id_number', 'destination')
    list_filter = ('check_in_time', 'check_out_time')