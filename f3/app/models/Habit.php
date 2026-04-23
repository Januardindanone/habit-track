<?php

class Habit extends DB\SQL\Mapper {
    public function __construct($db) {
        parent::__construct($db, 'habit');
    }

    public function getHabits($id_hari) {
        return $this->db->exec("
            SELECT 
                h.id, 
                h.habit, 
                h.jam,

                -- total semua riwayat
                COUNT(r.id) AS total_done,

                -- cek apakah hari ini sudah ada
                IF(
                    SUM(DATE(r.tanggal) = CURDATE()) > 0,
                    1,
                    0
                ) AS done

            FROM habit h
            JOIN hari_habit hh 
                ON h.id = hh.id_habit

            LEFT JOIN riwayat r
                ON h.id = r.id_habit

            WHERE hh.id_hari = ?
            GROUP BY h.id
        ", [$id_hari]);
    }
    /* public function getHabits($id_hari) { */
    /*     return $this->db->exec(" */
    /*         SELECT  */
    /*             h.id,  */
    /*             h.habit,  */
    /*             h.jam, */
    /*             COUNT(r.id) AS total_done */
    /*         FROM habit h */
    /*         JOIN hari_habit hh  */
    /*             ON h.id = hh.id_habit */
    /*         LEFT JOIN riwayat r */
    /*             ON h.id = r.id_habit */
    /*         WHERE hh.id_hari = ? */
    /*         GROUP BY h.id */
    /*     ", [$id_hari]); */
    /* } */

    public function getHari($id_hari){
        return $this->db->exec(
            "SELECT hari FROM hari WHERE id = ?",
            [$id_hari]
        )[0]['hari'];
    }

    public function create($data) {
        $this->copyFrom($data);

        try {
            $this->save();
            return $this->id;
        } catch (\Exception $e) {
            throw new \Exception('Gagal menambahkan habit' . $e->getMessage());
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
