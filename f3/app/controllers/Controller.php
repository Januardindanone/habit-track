<?php

class Controller {
    protected $f3;
    protected $db;

    public function __construct() {
        $this->f3 = \Base::instance();
        $this->db = $this->f3->get('DB');
    }


    function beforeroute($f3) {
        $public = ['/api/login'];

        // skip untuk route public
        if (in_array($f3->get('PATH'), $public)) return;

        if (!isset($_SESSION['user_id'])) {
            echo json_encode([
                'success' => false,
                'message' => 'Belum login'
            ]);
            die();
        }

        $f3->set('USER_ID', $_SESSION['user_id']);
    }
  
}
