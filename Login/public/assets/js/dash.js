document.addEventListener('DOMContentLoaded', function () {

    //
    //fetch('http://localhost:8000/api/userdata/')
    //    .then(respuesta => {
    //        if (respuesta.status === 401) {
    //            window.location.href = '/index.html';
    //            throw new Error('No autorizado');
    //        }
    //        return respuesta.json();
    //    })
    //
    fetch('http://localhost:8000/api/userdata/', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(respuesta => respuesta.json())
        .then(json => {
            if (json.success) {
                document.getElementById('mensaje-carga').style.display = 'none';
                document.getElementById('contenido-protegido').style.display = 'block';

                document.getElementById('titulo-bienvenida').innerText = '¡Bienvenido a tu espacio, ' + json.data.nombre + '!';
                document.getElementById('correo-usuario').innerText = json.data.email;
            }
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});


document.getElementById('btn-logout').addEventListener('click', function () {

    fetch('http://localhost:8000/api/logout/')
        .then(() => {

            window.location.href = '/index.html';
        });
});