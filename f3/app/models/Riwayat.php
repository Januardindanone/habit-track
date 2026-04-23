<?php

class Riwayat extends DB\SQL\Mapper {
    public function __construct(DB\SQL $db) {
        parent::__construct($db, 'riwayat');
    }
    public function create($data) {
        $this->copyFrom($data);

        try {
            $this->save();
            return $this->id;
        } catch (\Exception $e) {
            throw new \Exception('Gagal menambahkan riwayat habit' . $e->getMessage());
        }
    }
    public function deleteById($id) {
        try {
            $this->load(['id = ?', $id]);
            if ($this->dry()) {
                throw new \Exception('Data tidak ditemukan');
            }

            $this->erase();
            return true;

        } catch (\Exception $e) {
            throw new \Exception('Gagal menghapus riwayat: ' . $e->getMessage());
        }
    }
}
