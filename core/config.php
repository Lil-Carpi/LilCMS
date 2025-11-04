<?php
// core/config/config.php
namespace Core\Config;

class Config {
    private static array $config = [];

    public static function load(string $path): void {
        if (!file_exists($path)) {
            throw new \Exception("Archivo de configuración no encontrado: $path");
        }
        self::$config = require $path;
    }

    public static function get(string $key, $default = null) {
        return self::$config[$key] ?? $default;
    }

    public static function set(string $key, $value): void {
        self::$config[$key] = $value;
    }
}

