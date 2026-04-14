import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Usuario

@csrf_exempt
def api_login(request):
    if request.method == 'POST':
        datos = json.loads(request.body)
        email = datos.get('email')
        password = datos.get('password')

        try:
            usuario = Usuario.objects.get(email=email)

            if usuario.password == password:
                request.session['usuario_logueado'] = usuario.email

                return JsonResponse({
                    "success": True,
                    "message": f"Bienvenido a LilCMS, {usuario.nombre}",
                    "home": "/dashboard/index.html"
                })
            else:
                return JsonResponse({
                    "success": False,
                    "message": "Usuario o contraseña incorrectos. Intentelo de nuevo."
                })
        except Usuario.DoesNotExist:
            return JsonResponse({
                "success": False,
                "message": "Este usuario no existe. Contacte con el administrador del sitio."
            })

def api_userdata(request):
    email_sesion = request.session.get('usuario_logueado')

    if not email_sesion:
        return JsonResponse({
            "success": False,
            "Message": "No autorizado. Hey, no deberías estar aquí >:("
        }, status=401)

    usuario = Usuario.objects.get(email=email_sesion)
    return JsonResponse({
        "success": True,
        "data": {
            "nombre": usuario.nombre,
            "email": usuario.email
        }
    })

def api_logout(request):
    request.session.flush()
    return JsonResponse({
        "success": True,
        "message": "Sesión cerrada. Vuelva pronto :D"
    })