<?php
session_start(); 
header('Content-Type: application/json');

require __DIR__ . '/conexion.php';


$json_recibido = file_get_contents('php://input');
$datos = json_decode($json_recibido, true);

$email_recibido = $datos['email'] ?? '';
$password_recibida = $datos['password'] ?? '';

try {
    $stmt = $pdo->prepare('SELECT id, nombre, email, password FROM usuarios WHERE email = ?');
    $stmt->execute([$email_recibido]);
    $usuario_db = $stmt->fetch();

    if ($usuario_db && $password_recibida === $usuario_db['password']) {
        
        $_SESSION['usuario_id'] = $usuario_db['email'];

        echo json_encode([
            "success" => true,
            "message" => "Bienvenido a la Matrix, " . $usuario_db['nombre'],
            "home" => "/dashboard/index.html"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Usuario o contraseña incorrectos."
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error de conexión con la VM."
    ]);
}
?>
