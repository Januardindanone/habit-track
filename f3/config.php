<?php

$f3->set('TEMP', '../tmp/');
$f3->set('DEBUG', 3);
$f3->set('AUTOLOAD', '../app/controllers/;../app/models/');
// $f3->set('UI', '../app/views/');
$f3->set('DB', new DB\SQL('mysql:host=localhost;port=3306;dbname=habit_tracker', 'habit_user', 'd'));

$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Tangani preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;