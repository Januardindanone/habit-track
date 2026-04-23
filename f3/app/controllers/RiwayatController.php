<?php

class RiwayatController extends Controller {
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
        $riwayat = new Riwayat($this->db);
        $input = json_decode(file_get_contents('php://input'), true);
        if (empty($input['id_habit'])) {
          $this->responseJson('failed', null, 'id_habit kosong!');
          return;
        }
       try {
          $tambah_riwayat = $riwayat->create($input);
          $this->responseJson('success', null, 'berhasil menambah riwayat habit');
      } catch (\Exception $e) {
          $this->responseJson('error', null, $e->getMessage());
      }
    }
    public function destroy($f3, $params) {
        $id_riwayat = $params['id_riwayat'];

        $riwayat = new Riwayat($this->db);
        $riwayat->deleteById($id_riwayat);

        $this->responseJson('success', null, 'Berhasil menghapus riwayat');
    }
}
