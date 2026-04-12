<?php

class AuthController extends Controller {

    function login($f3) {
        $data = json_decode($f3->get('BODY'), true);

        $user = new DB\SQL\Mapper($this->db, 'user');
        $user->load(['username=?', $data['username']]);

        if ($user->dry() || !password_verify($data['password'], $user->password)) {
            echo json_encode(['success' => false, 'message' => 'Username atau password salah']);
            return;
        }

        $f3->set('SESSION.user_id', $user->id);
        echo json_encode(['success' => true]);
    }

    function me($f3) {
        var_dump($_SESSION);
        echo json_encode(['logged_in' => $f3->exists('SESSION.user_id')]);
    }

    function logout($f3) {
        $f3->clear('SESSION');
    }


    // function login($f3) {
    //     $body = json_decode($f3->get('BODY'), true);
    //     $username = $body['username'];
    //     $password = $body['password'];

    //     // cek database
    //     $db = new DB\SQL($f3->get('DB_DSN'), $f3->get('DB_USER'), $f3->get('DB_PASS'));
    //     $user = new DB\SQL\Mapper($db, 'users');
    //     $user->load(['username=?', $username]);

    //     if ($user->dry() || $user->password !== $password) {
    //         echo json_encode(['success' => false, 'message' => 'Login gagal']);
    //         return;
    //     }

    //     // simpan session
    //     $_SESSION['user_id'] = $user->id;

    //     echo json_encode([
    //         'success' => true,
    //         'user' => ['id' => $user->id, 'nama' => $user->nama]
    //     ]);
    // }

    // function dashboard($f3) {
    //     echo \Template::instance()->render('dashboard.html');
    // }

    // function logout($f3) {
    //     $f3->clear('SESSION');
    //     $f3->reroute('/login');
    // }
    
    // function loginPage($f3) {
    //     $f3->set('error', '');
    //     echo \Template::instance()->render('login.html');
    // }

    // function login($f3) {
    //     $db = $f3->get('DB');

    //     $username = $f3->get('POST.username');
    //     $password = $f3->get('POST.password');

    //     $user = new User($db);

    //     if (!$user->getByUsername($username)) {
    //         $f3->set('error', 'User tidak ditemukan');
    //         echo \Template::instance()->render('login.html');
    //         return;
    //     }

    //     if (!password_verify($password, $user->password)) {
    //         $f3->set('error', 'Password salah');
    //         echo \Template::instance()->render('login.html');
    //         return;
    //     }

    //     // Set session
    //     $f3->set('SESSION.user_id', $user->id);
    //     $f3->set('SESSION.login_date', date('Y-m-d'));

    //     $f3->reroute('/dashboard');
    // }

}
