<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "No tienes permiso para acceder aquí"]);
    exit;
}
require 'conexion.php';

try {
    $stmt = $pdo->prepare('SELECT nombre, email FROM usuarios WHERE email = ?');
    $stmt->execute([$_SESSION['usuario_id']]);
    $datos_usuario = $stmt->fetch();
    if ($datos_usuario) {
        echo json_encode([
            "success" => true,
            "data" => $datos_usuario
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Usuario no encontrado. Contacte con el administrador del sitio."
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error en la base de datos."
    ]);
}

?>