<?php

class HabitController extends Controller
{
    public function index($f3, $params)
    {
        $id_hari = $params['id_hari'];
        $habit = new Habit($this->db);
        $data = $habit->getHabits($id_hari);
        $hari = $habit->getHari($id_hari);
        $this->responseJson('success', [
            'hari' => $hari,
            'data' => $data,
        ], 'berhasil memperoleh data habit');
    }
    public function store()
    {
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
            'jam'   => $input['jam'] ?? null,
        ];
        try {
            $this->db->beginTransaction();

            $id_habit = $habit->create($data_habit);
            $hari_habit->create($id_habit, $input['id_hari']);

            $this->db->commit();
            $this->responseJson('success', null, 'berhasil menambah habit');

        } catch (\PDOException $e) {
            $this->db->rollBack();

            // deteksi duplicate entry (paling reliable)
            if (str_contains($e->getMessage(), 'Duplicate entry')) {
                $this->responseJson('failed', null, 'Habit sudah ada!');
            } else {
                $this->responseJson('error', null, 'Database error');
            }

        } catch (\Exception $e) {
            $this->db->rollBack();
            $this->responseJson('error', null, 'Terjadi kesalahan pada server');
        }
    }
    public function getHabits()
    {
        $habit = new Habit($this->db);
        $data = $habit->getAllHabits();
        $this->responseJson('success', [
            'data' => $data,
        ], 'berhasil memperoleh data habit');

    }
    public function update($f3, $params)
    {
        $id = $params['id'];
        $habit = new Habit($this->db);
        $hari_habit = new HariHabit($this->db);

        $input = json_decode(file_get_contents('php://input'), true);

        if (empty($input['habit'])) {
            return $this->responseJson('failed', null, 'Nama habit wajib diisi!');
        }

        if (empty($input['id_hari'])) {
            return $this->responseJson('failed', null, 'Hari tidak boleh kosong!');
        }

        $data = [
            'habit' => $input['habit'],
            'jam'   => $input['jam'] ?? null,
        ];

        try {
            $this->db->beginTransaction();

            // 🔥 update habit utama
            $habit->updateHabit($id, $data);

            // 🔥 reset hari (hapus lalu insert ulang)
            $hari_habit->deleteByHabit($id);
            $hari_habit->create($id, $input['id_hari']);

            $this->db->commit();

            return $this->responseJson('success', null, 'Berhasil update habit');
        } catch (\PDOException $e) {
            $this->db->rollBack();

            if (str_contains($e->getMessage(), 'Duplicate entry')) {
                return $this->responseJson('failed', null, 'Habit sudah ada!');
            }

            return $this->responseJson('error', null, 'Database error');
        } catch (\Exception $e) {
            $this->db->rollBack();
            return $this->responseJson('error', null, 'Terjadi kesalahan pada server');
        }
    }
    public function destroy($f3, $params)
    {
        try {
            // Validasi parameter ID
            if (!isset($params['id']) || empty($params['id'])) {
                return $this->responseJson('error', null, 'ID tidak boleh kosong');
            }

            $id = (int) $params['id'];

            if ($id <= 0) {
                return $this->responseJson('error', null, 'ID tidak valid');
            }

            $habit = new Habit($this->db);

            // Cek apakah data ada
            $existingHabit = $habit->cekId($id);
            if (!$existingHabit) {
                return $this->responseJson('error', null, 'Habit tidak ditemukan');
            }

            // Hapus data
            $habit->delete($id);

            return $this->responseJson('success', null, 'Berhasil hapus habit');

        } catch (\Exception $e) {
            // Log error kalau perlu
            error_log($e->getMessage());

            return $this->responseJson('error', null, 'Terjadi kesalahan pada server');
        }
    }
}
