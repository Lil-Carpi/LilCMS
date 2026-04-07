document.getElementById('loginForm').addEventListener('submit', function(evento) {
    evento.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const mensaje = document.getElementById('mensaje');

    mensaje.style.color = "blue";
    mensaje.innerText = "Conectando con el servidor...";

    const datos = {
        email: email,
        password: password
    };

    const urlBackend = '/api_login.php';

    fetch(urlBackend, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(respuesta => respuesta.json())
    .then(data => {
        if (data.success) {
            mensaje.style.color = "green";
            mensaje.innerText = data.message + " Redirigiendo a " + data.home;

            setTimeout(() => {
                window.location.href = data.home;
            }, 1000);
        } else {
            mensaje.style.color = "red";
            mensaje.innerText = data.mensaje;
        }
    })
    .catch(error => {
        console.error("el error es:", error);
        mensaje.style.color = "red";
        mensaje.innerText = "Error de conexión con el servidor.";
    });
});