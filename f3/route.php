<?php

$f3->route('OPTIONS /api/*', function () {
    http_response_code(200);
});
$f3->route('GET /api/habit/@id_hari', 'HabitController->index');
$f3->route('GET /api/stats', 'StatsController->index');
$f3->route('POST /api/habit-update/@id', 'HabitController->update');
$f3->route('GET /api/habit', 'HabitController->getHabits');
$f3->route('POST /api/habit', 'HabitController->store');
$f3->route('POST /api/habit-delete/@id', 'HabitController->destroy');
$f3->route('POST /api/riwayat', 'RiwayatController->store');
$f3->route('POST /api/delete-riwayat/@id_riwayat', 'RiwayatController->destroy');
$f3->route('GET /', function ($f3) {
    require 'index.html';
});
