<?php

class Controller {
    protected $f3;
    protected $db;

    public function __construct() {
        $this->f3 = \Base::instance();
        $this->db = $this->f3->get('DB');
    }

protected function responseJson($status, $payload = null, $message = '', $httpCode = 200)
{
    http_response_code($httpCode);
    header('Content-Type: application/json');

    echo json_encode(array_merge([
        'status' => $status,
        'message' => $message
    ], $payload ?? []));

    exit;
}
    // function beforeroute($f3) {
    //     $public = ['/api/login'];

    //     // skip untuk route public
    //     if (in_array($f3->get('PATH'), $public)) return;

    //     if (!isset($_SESSION['user_id'])) {
    //         echo json_encode([
    //             'success' => false,
    //             'message' => 'Belum login'
    //         ]);
    //         die();
    //     }

    //     $f3->set('USER_ID', $_SESSION['user_id']);
    // }
  
}
