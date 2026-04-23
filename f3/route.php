<?php

$f3->route('OPTIONS /api/*', function() {
    http_response_code(200);
});
$f3->route('GET /api/habit/@id_hari', 'HabitController->index');
$f3->route('POST /api/habit', 'HabitController->store');
$f3->route('POST /api/riwayat', 'RiwayatController->store');
$f3->route('DELETE /api/riwayat/@id_habit', 'RiwayatController->destroy');
