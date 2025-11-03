<?php
spl_autoload_register(function($class) { // definir autoloader
  $map = [                               // mapea los namespaces de core y app
    'Core\\' => __DIR__ . '/',
    'App\\' => __DIR__ . '/../app/'
  ];

  foreach ($map as $prefix => $base_dir) {  // se recorre el mapa de namespaces
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) === 0) { // verifica si la clase pertenece al namespace comparando los caracteres de $class con $prefix
                                                // ejemplo: $class = 'App\Controllers\HomeController' y $prefix = 'App\\': la comparacion devuelve o deberia devolver 0 => coinciden.
      $relative_class = substr($class, $len);   // extrae la parte relativa de la clase, sin el namespace
      $file = $base_dir . str_replace('\\', '/' $relative_class) . '.php'; // hace la conversion de los namespace en rutas usando "/" y concatena con base_dir y ".php"
      if (file_exists($file)) require_once $file; // si el fichero existe, carga a memoria.
    }
  }
});
