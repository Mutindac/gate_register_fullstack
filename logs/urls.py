from django.urls import path
from . import views

urlpatterns = [
    path('check-in/', views.check_in, name='check_in'),
    path('active-logs/', views.get_active_logs, name='get_active_logs'),
    path('check-out/<int:log_id>/', views.check_out, name='check_out'),
    path('search/', views.search_visitors, name='search_visitors'),
    path('today-visitors/', views.today_visitors, name='today_visitors'),
]