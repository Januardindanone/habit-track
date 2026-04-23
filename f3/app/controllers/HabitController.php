<?php

class HabitController extends Controller {
    public function index($f3, $params) {
        $id_hari = $params['id_hari'];
        $habit = new Habit($this->db);
        $data = $habit->getHabits($id_hari);
        $hari = $habit->getHari($id_hari);
        $this->responseJson('success', [
            'hari' => $hari,
            'data' => $data
        ],'berhasil memperoleh data habit');
    }
    public function store(){
        $habit = new Habit($this->db);
        $hari_habit = new HariHabit($this->db);
        $input = json_decode(file_get_contents('php://input'), true);
        if (empty($input['habit'])) {
          $this->responseJson('failed', null, 'Nama habit wajib diisi!');
          return;
        }
        /* var_dump($input);die; */
        if (empty($input['id_hari'])) {
          $this->responseJson('failed', null, 'Hari tidak boleh kosong!');
          return;
        }
        $data_habit = [
            'habit' => $input['habit'],
            'jam'   => $input['jam'] ?? null
        ];
        try {
          $this->db->beginTransaction();
          $id_habit = $habit->create($data_habit);
          $hari_habit->create($id_habit, $input['id_hari']);
          $this->db->commit();
          $this->responseJson('success', null, 'berhasil menambah habit');
      } catch (\Exception $e) {
          $this->db->rollBack();
          $this->responseJson('error', null, $e->getMessage());
      }
    }

    // public function update($f3, $params) {
    //     $barang = new Barang($this->db);

    //     $id = $params['id'];
    //     $input = json_decode(file_get_contents('php://input'), true);

    //     if (empty($input['nama']) || !isset($input['harga'])) {
    //         echo json_encode([
    //             'status' => 'error',
    //             'data' => null, 'message' => 'Nama dan harga wajib diisi'
    //         ]);
    //         return;
    //     }

    //     try {
    //         $updated = $barang->updateById($id, $input);

    //         if ($updated) {
    //             echo json_encode([
    //                 'status' => 'success',
    //                 'data' => $updated,
    //                 'message' => "Berhasil mengupdate barang ID $id"
    //             ]);
    //         } else {
    //             echo json_encode([
    //                 'status' => 'error',
    //                 'data' => null,
    //                 'message' => "Barang dengan ID $id tidak ditemukan"
    //             ]);
    //         }
    //     } catch (\Exception $e) {
    //         echo json_encode([
    //             'status' => 'error',
    //             'data' => null,
    //             'message' => $e->getMessage()
    //         ]);
    //     }
    // }
}

