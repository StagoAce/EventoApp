from django.shortcuts import render
from .models import user_collection, evento_collection
from django.http import HttpResponse, JsonResponse
from datetime import date, datetime
import json
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from bson import ObjectId

# Create your views here.

def index(request):
    return HttpResponse("<h1> App is running.. </h1>")

@csrf_exempt
def add_user(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            user = user_collection.find_one({"cedula": body.get("cedula")})
        
            if user is None:
                records = {
                    "cedula": body.get("cedula"),
                    "nombre": body.get("nombre"),
                    "apellidos": body.get("apellidos"),
                    "email": body.get("email"),
                    "rol": [body.get("rol", "usuario").lower()],
                    "eventos_out": [],
                    "eventos_in": []
                }
                
                user_collection.insert_one(records)
                return JsonResponse({"message": "New person is added"}, status=201)
            else:
                return JsonResponse({"message": "This person is not a new user"}, status=409)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

def get_all_users(request):
    try:
        users = user_collection.find()
        user_list = list(users)
        
        for user in user_list:
            if '_id' in user and isinstance(user['_id'], ObjectId):
                user['_id'] = str(user['_id'])
            if 'eventos_in' in user and isinstance(user['eventos_in'], list):
                user['eventos_in'] = [str(event_id) if isinstance(event_id, ObjectId) else event_id for event_id in user['eventos_in']]
            if 'eventos_out' in user and isinstance(user['eventos_out'], list):
                user['eventos_out'] = [str(event_id) if isinstance(event_id, ObjectId) else event_id for event_id in user['eventos_out']]
        
        users = json.dumps(user_list)
        
        return JsonResponse(user_list, safe=False, status=status.HTTP_200_OK) 
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def get_user(request, user_cedula):
    try:
        user = user_collection.find_one({"cedula": user_cedula})
        
        if user is not None:
            if '_id' in user and isinstance(user['_id'], ObjectId):
                user['_id'] = str(user['_id'])
            if 'eventos_in' in user and isinstance(user['eventos_in'], list):
                user['eventos_in'] = [str(event_id) if isinstance(event_id, ObjectId) else event_id for event_id in user['eventos_in']]
            if 'eventos_out' in user and isinstance(user['eventos_out'], list):
                user['eventos_out'] = [str(event_id) if isinstance(event_id, ObjectId) else event_id for event_id in user['eventos_out']]
            return JsonResponse(user, status=200)
        else:
            return JsonResponse({"error": "User not found"}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#------------------------ AREA DE EVENTOS -----------------------------------
@csrf_exempt
def create_evento(request, cedula_cliente):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            user = user_collection.find_one({"cedula": cedula_cliente})
            
            if user is not None:
                fecha_inicio_str = body.get("fecha_inicio")
                fecha_finalizacion_str = body.get("fecha_finalizacion")
                try:
                    fecha_inicio = datetime.strptime(fecha_inicio_str, "%Y-%m-%d %H:%M")
                    fecha_finalizacion = datetime.strptime(fecha_finalizacion_str, "%Y-%m-%d %H:%M")
                    
                    if fecha_inicio.date() > date.today():
                        estado = "activo"
                    elif fecha_finalizacion.date() < date.today():
                        estado = "en curso"
                    else:
                        estado = "finalizado"
                
                    records = {
                        "nombre": body.get("nombre"),
                        "organizador": user.get("nombre", "") + " " + user.get("apellidos", ""),
                        "lugar": body.get("lugar"),
                        "direccion": body.get("direccion"),
                        "fecha_inicio": fecha_inicio,
                        "fecha_finalizacion": fecha_finalizacion,
                        "descripcion": body.get("descripcion"),
                        "asistentes": [],
                        "estado": estado
                    }
                    
                    result = evento_collection.insert_one(records)
                                
                    filtro = {"_id": user["_id"]}
                    actualizacion = {"$push": {"eventos_in": result.inserted_id}}
                    user_collection.update_one(filtro, actualizacion)
                    
                    return JsonResponse({"message": "Creacion exitosa"}, status=201)
                    
                except ValueError:
                    return JsonResponse({"message": "Error con la fecha"}, status=400)
            else:
                return JsonResponse({"message": "Person doesn't exist"}, status=409)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Metodo incorrecto"}, status=405)
    
#Función para serializar un evento, convirtiendo ObjectId y datetime a tipos JSON serializables
def serialize_evento(evento):
    evento['_id'] = str(evento['_id'])  # Convertir ObjectId a string
    
    # Convertir fechas a formato ISO 8601 (string)
    if 'fecha_inicio' in evento:
        evento['fecha_inicio'] = evento['fecha_inicio'].isoformat()
    if 'fecha_finalizacion' in evento:
        evento['fecha_finalizacion'] = evento['fecha_finalizacion'].isoformat()
    
    return evento

def get_all_eventos(request):
    try:
        eventos = evento_collection.find()
        eventos_list = list(eventos)
        # Serializar cada evento
        eventos_list = [serialize_evento(evento) for evento in eventos_list]
        
        return JsonResponse(eventos_list, safe=False, status=status.HTTP_200_OK) 
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
    

        
    
