<?php

class Riwayat extends DB\SQL\Mapper
{
    public function __construct(DB\SQL $db)
    {
        parent::__construct($db, 'riwayat');
    }

    public function create($data)
    {
        $this->copyFrom($data);

        try {
            $this->save();
            return $this->id;
        } catch (\Exception $e) {
            throw new \Exception('Gagal menambahkan riwayat habit' . $e->getMessage());
        }
    }

    public function deleteById($id)
    {
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

    // 🔥 total semua habit (count row)
    public function totalDone()
    {
        return $this->db->exec("
            SELECT COUNT(*) as total 
            FROM riwayat
        ")[0]['total'];
    }

    // 🔥 heatmap (intensity tetap pakai COUNT(*))
    public function getHeatmap($days = 70)
    {
        return $this->db->exec("
            SELECT 
                DATE(tanggal) as date,
                COUNT(*) as count
            FROM riwayat
            WHERE DATE(tanggal) >= CURDATE() - INTERVAL ? DAY
            GROUP BY DATE(tanggal)
            ORDER BY date ASC
        ", [$days]);
    }

    // 🔥 daily counts (untuk streak)
    public function getDailyCounts()
    {
        return $this->db->exec("
            SELECT 
                DATE(tanggal) as date,
                COUNT(*) as count
            FROM riwayat
            GROUP BY DATE(tanggal)
            ORDER BY date ASC
        ");
    }

    // 🔥 weekly (rolling 7 hari, bukan calendar week)
    public function getWeeklyStats()
    {
        return $this->db->exec("
            SELECT 
                COUNT(DISTINCT DATE(tanggal)) as completed
            FROM riwayat
            WHERE DATE(tanggal) >= CURDATE() - INTERVAL 6 DAY
        ")[0];
    }

    // 🔥 TODAY PROGRESS
    public function getTodayStats()
    {
        return $this->db->exec("
            SELECT COUNT(DISTINCT id_habit) as done
            FROM riwayat
            WHERE DATE(tanggal) = CURDATE()
        ")[0];
    }

    // 🔥 TOTAL HABIT (untuk today total)
    public function getTotalHabits()
    {
        return $this->db->exec("
            SELECT COUNT(*) as total 
            FROM habit
        ")[0]['total'];
    }
    public function getTotalHabitsToday()
    {
        return $this->db->exec("
        SELECT COUNT(*) as total
        FROM hari_habit
        WHERE id_hari = IF(DAYOFWEEK(CURDATE()) = 1, 7, DAYOFWEEK(CURDATE()) - 1)
    ")[0]['total'];
    }

    // 🔥 PER HABIT STATS
    public function getPerHabitStats()
    {
        return $this->db->exec("
            SELECT 
                h.id,
                h.habit,
                COUNT(r.id) as done,
                COUNT(DISTINCT DATE(r.tanggal)) as days_active
            FROM habit h
            LEFT JOIN riwayat r ON h.id = r.id_habit
            GROUP BY h.id
            ORDER BY done DESC
        ");
    }

    // 🔥 AVERAGE PER DAY
    public function getAveragePerDay()
    {
        return $this->db->exec("
            SELECT 
                ROUND(COUNT(*) / COUNT(DISTINCT DATE(tanggal)), 2) as avg
            FROM riwayat
        ")[0]['avg'] ?? 0;
    }

    // 🔥 TREND (7 hari vs 7 hari sebelumnya)
    public function getTrend()
    {
        $current = $this->db->exec("
            SELECT COUNT(*) as total
            FROM riwayat
            WHERE DATE(tanggal) >= CURDATE() - INTERVAL 6 DAY
        ")[0]['total'];

        $previous = $this->db->exec("
            SELECT COUNT(*) as total
            FROM riwayat
            WHERE DATE(tanggal) BETWEEN CURDATE() - INTERVAL 13 DAY 
                                   AND CURDATE() - INTERVAL 7 DAY
        ")[0]['total'];

        if ($current > $previous) {
            return 'up';
        }
        if ($current < $previous) {
            return 'down';
        }
        return 'same';
    }
}
