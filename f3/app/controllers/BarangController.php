<?php

class BarangController extends Controller {
    public function index() {
        $barang = new Barang($this->db);
        $data = $barang->getAll();
        header('Content-Type: application/json');
        echo json_encode([
            'success' => true,
            'data' => $data,
        ]);
        exit;
    }

    public function store(){
        $barang = new Barang($this->db);
        $input = json_decode(file_get_contents('php://input'), true);
        if (empty($input['nama']) || !isset($input['harga'])) {
            echo json_encode([
                'success' => false,
                'message' => 'Nama dan harga wajib diisi',
            ]);
            return;
        }

        try {
            $newItem = $barang->create($input);
            echo json_encode([
                'success' => true,
                'message' => 'Berhasil menambahkan barang',
            ]);
        } catch (\Exception $e) {
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function update($f3, $params) {
        $barang = new Barang($this->db);

        $id = $params['id'];
        $input = json_decode(file_get_contents('php://input'), true);

        if (empty($input['nama']) || !isset($input['harga'])) {
            echo json_encode([
                'status' => 'error',
                'data' => null,
                'message' => 'Nama dan harga wajib diisi'
            ]);
            return;
        }

        try {
            $updated = $barang->updateById($id, $input);

            if ($updated) {
                echo json_encode([
                    'status' => 'success',
                    'data' => $updated,
                    'message' => "Berhasil mengupdate barang ID $id"
                ]);
            } else {
                echo json_encode([
                    'status' => 'error',
                    'data' => null,
                    'message' => "Barang dengan ID $id tidak ditemukan"
                ]);
            }
        } catch (\Exception $e) {
            echo json_encode([
                'status' => 'error',
                'data' => null,
                'message' => $e->getMessage()
            ]);
        }
    }
}

