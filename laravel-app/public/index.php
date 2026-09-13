<?php

use Illuminate\Http\Request;

// PHP 8.5 deprecates PDO::MYSQL_ATTR_SSL_CA in favor of Pdo\Mysql::ATTR_SSL_CA;
// Laravel's MySQL connector still references the old constant. Harmless, but
// noisy in local dev — suppress deprecation notices from surfacing in output.
error_reporting(E_ALL & ~E_DEPRECATED);

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
(require_once __DIR__.'/../bootstrap/app.php')
    ->handleRequest(Request::capture());
