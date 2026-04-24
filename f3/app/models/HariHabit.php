<?php

class HariHabit extends DB\SQL\Mapper
{
    public function __construct($db)
    {
        parent::__construct($db, 'hari_habit');
    }
    public function create($habit_id, $hari_ids)
    {
        // validasi basic
        if (!is_array($hari_ids)) {
            throw new Exception("id_hari harus berupa array");
        }

        $stmt = $this->db->prepare("
            INSERT INTO hari_habit (id_habit, id_hari)
            VALUES (:id_habit, :id_hari)
        ");

        foreach ($hari_ids as $id_hari) {
            $stmt->execute([
                'id_habit' => $habit_id,
                'id_hari'  => $id_hari,
            ]);
        }
    }
    public function deleteByHabit($id_habit)
    {
        try {
            return $this->db->exec(
                "DELETE FROM hari_habit WHERE id_habit = ?",
                [$id_habit]
            );
        } catch (\Exception $e) {
            throw $e;
        }
    }
}
