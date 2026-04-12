<?php

$f3->route('OPTIONS /api/*', function() {
    http_response_code(200);
});

$f3->route('POST /api/login', 'AuthController->login');
$f3->route('GET /api/me', 'AuthController->me');
$f3->route('GET /api/logout', 'AuthController->logout');
$f3->route('GET /api/barang', 'BarangController->index');
$f3->route('POST /api/barang', 'BarangController->store');
