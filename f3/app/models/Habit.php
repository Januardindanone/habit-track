<?php

class Barang extends DB\SQL\Mapper {
    public function __construct($db) {
        parent::__construct($db, 'barang');
    }

    public function getAll() {
        return $this->db->exec("
            SELECT id, nama, harga 
            FROM barang
        ");
    }

    public function create($data) {
        $this->copyFrom($data);

        try {
            $this->save();
            return $this->id;
        } catch (\Exception $e) {
            throw new \Exception('Gagal menyimpan barang: ' . $e->getMessage());
        }
    }

    // public function update($id, $data) {
    //     $this->load(['id=?', $id]);
        
    //     try {
    //         if (!$this->dry()) {
    //             $this->copyFrom($data);
    //             $this->save();
    //             return true;
    //         }
    //     } catch (\Exception $e) {
    //         return false;
    //     }
    // }

}