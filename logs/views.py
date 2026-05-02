from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import GateLog
from .serializers import GateLogSerializer
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated

#check in
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def check_in(request):
    id_number = request.data.get('id_number')
    
    # Check if the visitor is already checked in
    if GateLog.objects.filter(id_number=id_number, check_out_time__isnull=True).exists():
        return Response({'error': 'Visitor already checked in'}, status=400)
    
    serializer = GateLogSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

#get active logs
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_active_logs(request):
    active_logs = GateLog.objects.filter(check_out_time__isnull=True)
    serializer = GateLogSerializer(active_logs, many=True)
    return Response(serializer.data)

#check out
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def check_out(request, log_id):
    try:
        log = GateLog.objects.get(id=log_id)
    except GateLog.DoesNotExist:
        return Response({'error': 'Visitor not found'}, status=404)
    
    if log.check_out_time is not None:
        return Response({'error': ' Visitor already checked out'}, status=400)
    
    log.check_out_time = timezone.now()
    log.save()
    
    serializer = GateLogSerializer(log)
    return Response(serializer.data)

#search api
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def search_visitors(request):
    query = request.query_params.get('q', '')
    logs = GateLog.objects.filter(
        name__icontains=query
    ) | GateLog.objects.filter(
        id_number__icontains=query
    ) | GateLog.objects.filter(
        destination__icontains=query
    ) | GateLog.objects.filter(
        check_in_time__icontains=query
    ) | GateLog.objects.filter(
        check_out_time__icontains=query
    )
    serializer = GateLogSerializer(logs, many=True)
    return Response(serializer.data)

#only today visitors
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def today_visitors(request):
    today = timezone.now().date()
    logs = GateLog.objects.filter(check_in_time__date=today)
    #logs = GateLog.objects.all()
    serializer = GateLogSerializer(logs, many=True)
    return Response(serializer.data)