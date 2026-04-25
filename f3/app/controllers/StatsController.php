<?php

class StatsController extends Controller
{
    public function index($f3, $params)
    {
        $riwayat = new Riwayat($this->db);

        try {
            // 🔥 total done
            $totalDone = (int) $riwayat->totalDone();

            // 🔥 weekly (rolling 7 hari)
            $weekly = $riwayat->getWeeklyStats();
            $completedWeek = (int) ($weekly['completed'] ?? 0);
            $totalWeek = 7;

            // 🔥 daily counts (untuk streak + completion)
            $dailyCounts = $riwayat->getDailyCounts();

            $totalDays = count($dailyCounts);
            $completedDays = count(array_filter($dailyCounts, function ($d) {
                return $d['count'] > 0;
            }));

            $completionRate = $totalDays
                ? round(($completedDays / $totalDays) * 100)
                : 0;

            // 🔥 streak
            [$currentStreak, $bestStreak] = $this->calculateStreak($dailyCounts);

            // 🔥 heatmap
            $heatmapRaw = $riwayat->getHeatmap(70);
            $heatmap = $this->fillMissingDates($heatmapRaw, 70);

            // 🔥 TODAY
            $todayRaw = $riwayat->getTodayStats();
            $totalHabits = (int) $riwayat->getTotalHabitsToday();

            $todayDone = (int) ($todayRaw['done'] ?? 0);

            // 🔥 PER HABIT
            $perHabitRaw = $riwayat->getPerHabitStats();
            $perHabit = array_map(function ($h) {
                return [
                    'id' => $h['id'],
                    'habit' => $h['habit'],
                    'done' => (int) $h['done'],
                ];
            }, $perHabitRaw);

            // 🔥 TREND
            $trend = $riwayat->getTrend();

            // 🔥 AVERAGE
            $average = (float) $riwayat->getAveragePerDay();

            $this->responseJson('success', [
                'data' => [
                    'summary' => [
                        'current_streak' => $currentStreak,
                        'best_streak' => $bestStreak,
                        'completion_rate' => $completionRate,
                        'total_done' => $totalDone,
                    ],
                    'weekly' => [
                        'completed' => $completedWeek,
                        'total' => $totalWeek,
                    ],
                    'today' => [
                        'done' => $todayDone,
                        'total' => $totalHabits,
                    ],
                    'per_habit' => $perHabit,
                    'trend' => $trend,
                    'average_per_day' => $average,
                    'heatmap' => $heatmap,
                ],
            ], 'berhasil mengambil statistik');

        } catch (\Exception $e) {
            $this->responseJson('error', null, $e->getMessage());
        }
    }

    // 🔥 hitung streak
    private function calculateStreak($dailyCounts)
    {
        $dates = [];

        foreach ($dailyCounts as $d) {
            if ($d['count'] > 0) {
                $dates[] = $d['date'];
            }
        }

        sort($dates);

        $best = 0;
        $temp = 0;
        $prev = null;

        foreach ($dates as $date) {
            if ($prev) {
                $diff = (strtotime($date) - strtotime($prev)) / 86400;

                if ($diff == 1) {
                    $temp++;
                } else {
                    $temp = 1;
                }
            } else {
                $temp = 1;
            }

            $best = max($best, $temp);
            $prev = $date;
        }

        // 🔥 current streak (dari hari ini)
        $today = date('Y-m-d');
        $current = 0;
        $check = $today;

        while (in_array($check, $dates)) {
            $current++;
            $check = date('Y-m-d', strtotime($check . ' -1 day'));
        }

        return [$current, $best];
    }

    // 🔥 isi tanggal kosong untuk heatmap
    private function fillMissingDates($data, $days)
    {
        $map = [];

        foreach ($data as $d) {
            $map[$d['date']] = (int) $d['count'];
        }

        $result = [];

        for ($i = $days - 1; $i >= 0; $i--) {
            $date = date('Y-m-d', strtotime("-$i days"));

            $result[] = [
                'date' => $date,
                'count' => $map[$date] ?? 0,
            ];
        }

        return $result;
    }
}
