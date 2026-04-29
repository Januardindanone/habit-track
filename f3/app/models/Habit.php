<?php

class Habit extends DB\SQL\Mapper
{
    public function __construct($db)
    {
        parent::__construct($db, 'habit');
    }

    public function getHabits($id_hari)
    {
        return $this->db->exec("
          SELECT 
              h.id, 
              h.habit, 
              h.jam,

              -- total semua riwayat
              COUNT(r.id) AS total_done,

              -- status hari ini
              IF(SUM(DATE(r.tanggal) = CURDATE()) > 0, 1, 0) AS done,

              -- ambil id_riwayat hari ini (jika ada)
              MAX(
                  CASE 
                      WHEN DATE(r.tanggal) = CURDATE() 
                      THEN r.id 
                      ELSE NULL 
                  END
              ) AS id_riwayat

          FROM habit h
          JOIN hari_habit hh 
              ON h.id = hh.id_habit

          LEFT JOIN riwayat r
              ON h.id = r.id_habit

          WHERE hh.id_hari = ?
          GROUP BY h.id
          ORDER BY 
            done ASC,
            h.jam IS NULL,
            h.jam ASC
        ", [$id_hari]);
    }
    public function getHari($id_hari)
    {
        return $this->db->exec(
            "SELECT hari FROM hari WHERE id = ?",
            [$id_hari]
        )[0]['hari'];
    }
    public function getAllHabits()
    {
        try {
            $data = $this->db->exec("
            SELECT 
                h.id,
                h.habit,
                TIME_FORMAT(h.jam, '%H:%i') AS jam,
                GROUP_CONCAT(hh.id_hari ORDER BY hh.id_hari) AS id_hari
            FROM habit h
            LEFT JOIN hari_habit hh 
                ON h.id = hh.id_habit
            GROUP BY h.id
            ORDER BY 
                h.jam IS NULL,
                h.jam ASC
                ");
            foreach ($data as &$row) {
                $row['id_hari'] = $row['id_hari']
                    ? array_map('intval', explode(',', $row['id_hari']))
                    : [];
            }
            unset($row);
            return $data;
        } catch (\PDOException $e) {
            throw $e;
        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function create($data)
    {
        $this->copyFrom($data);

        try {
            $this->save();
            return $this->id;
        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function updateHabit($id, $data)
    {
        $this->copyFrom($data);

        try {
            return $this->db->exec(
                "UPDATE habit SET habit = ?, jam = ? WHERE id = ?",
                [$this->habit, $this->jam, $id]
            );
        } catch (\Exception $e) {
            throw $e; // 🔥 jangan ubah exception
        }
    }
    public function cekId($id)
    {
        try {
            $query = "SELECT COUNT(*) as total FROM {$this->table} WHERE id = :id";
            $stmt = $this->db->prepare($query);
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            return $result['total'] > 0;

        } catch (\Exception $e) {
            error_log($e->getMessage());
            return false;
        }
    }

    // Hapus data
    public function delete($id)
    {
        try {
            $query = "DELETE FROM {$this->table} WHERE id = :id";
            $stmt = $this->db->prepare($query);
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);

            return $stmt->execute();

        } catch (\Exception $e) {
            error_log($e->getMessage());
            throw $e;
        }
    }
}
