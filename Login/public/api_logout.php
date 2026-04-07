<?php
session_start();
$_SESSION = array();
session_destroy();
header('Content-Type: application/json');
echo json_encode(["success" => true, "message" => "Sesión cerrada"]);
?>