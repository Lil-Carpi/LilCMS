// 1. En cuanto carga la página, pedimos los datos al backend
document.addEventListener('DOMContentLoaded', function () {

    fetch('/api_userdata.php')
        .then(respuesta => {
            // Si PHP nos dice que no estamos autorizados (Error 401), nos echamos de aquí
            if (respuesta.status === 401) {
                window.location.href = '/index.html';
                throw new Error('No autorizado');
            }
            return respuesta.json();
        })
        .then(json => {
            if (json.success) {
                // 2. SI HAY ÉXITO: Ocultamos el mensaje de carga y mostramos la tarjeta
                document.getElementById('mensaje-carga').style.display = 'none';
                document.getElementById('contenido-protegido').style.display = 'block';

                // 3. INYECTAMOS LOS DATOS usando JavaScript
                // JS se encarga de que los datos se pongan en el lugar correcto
                document.getElementById('titulo-bienvenida').innerText = '¡Bienvenido a tu espacio, ' + json.data.nombre + '!';
                document.getElementById('correo-usuario').innerText = json.data.email;
            }
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});

// 4. Lógica para el botón de cerrar sesión
document.getElementById('btn-logout').addEventListener('click', function () {
    // Hacemos una petición rápida al backend para destruir la sesión
    fetch('/api_logout.php')
        .then(() => {
            // Redirigimos al login
            window.location.href = '/index.html';
        });
});