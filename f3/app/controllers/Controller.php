<?php

class Controller
{
    protected $f3;
    protected $db;

    public function __construct()
    {
        $this->f3 = \Base::instance();
        $this->db = $this->f3->get('DB');
    }

    protected function responseJson($status, $payload = null, $message = '', $httpCode = 200)
    {
        http_response_code($httpCode);
        header('Content-Type: application/json');

        echo json_encode(array_merge([
            'status' => $status,
            'message' => $message,
        ], $payload ?? []));

        exit;
    }
}
