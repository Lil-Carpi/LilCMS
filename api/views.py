from django.shortcuts import render, redirect
from django.apps import apps
import mariadb

def connection():
    conn = mariadb.connect(
        user="carpi",
        password="supersegura20000",
        host="192.168.56.101",
        port=3306,
        database="logintest")
    return conn


def users(request):
    if 'usuario_id' in request.session:
        return redirect('admin')

    conn = connection()
    cursor = conn.cursor()

    
    if request.method == 'POST':
        email_ingresado = request.POST.get('email')
        password_ingresada = request.POST.get('password')

        cursor.execute('SELECT * FROM usuarios WHERE email=? AND password=?', (email_ingresado, password_ingresada))
        user = cursor.fetchone() 

        if user:
            request.session['usuario_id'] = user[0] 
            conn.close()
            return redirect('admin')
        else:
            error_message = "Correo o contraseña incorrectos."
            users_list = []
            cursor.execute('SELECT * FROM usuarios')
            for row in cursor.fetchall():
                users_list.append({"id": row[0], "nombre": row[1], "email": row[2], "password": row[3]})
            conn.close()
            return render(request, 'login.html', {'users': users_list, 'error_message': error_message})
    else:
        users_list = []
        cursor.execute('SELECT * FROM usuarios')
        for row in cursor.fetchall():
            users_list.append({"id": row[0], "nombre": row[1], "email": row[2], "password": row[3]})
        conn.close()
        
        return render(request, 'login.html', {'users': users_list})

def logout_view(request):
    request.session.flush()
    return redirect('login')


def login_view(request):
    return render(request, 'login.html')

def admin_view(request):
    if 'usuario_id' not in request.session:
        return redirect('login')
    return render(request, 'dashboard/admin.html')