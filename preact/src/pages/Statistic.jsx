import { useEffect, useState } from "preact/hooks";
import { getStats } from "../api";

export default function StatsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Gagal memuat statistik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  function getLevel(count) {
    if (count === 0) return 0;
    if (count < 2) return 1;
    if (count < 4) return 2;
    if (count < 6) return 3;
    return 4;
  }

  function getColor(level) {
    switch (level) {
      case 0:
        return "bg-blue-200";
      case 1:
        return "bg-blue-300";
      case 2:
        return "bg-blue-400";
      case 3:
        return "bg-blue-600";
      case 4:
        return "bg-blue-900";
      default:
        return "bg-blue-200";
    }
  }

  if (loading) {
    return (
      <div class="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!stats) {
    return (
      <div class="min-h-screen flex items-center justify-center">
        Gagal memuat data
      </div>
    );
  }

  const { summary, weekly, heatmap, today, per_habit, trend, average_per_day } =
    stats;

  const progress = weekly?.total ? (weekly.completed / weekly.total) * 100 : 0;
  const todayProgress = today?.total ? (today.done / today.total) * 100 : 0;

  return (
    <div class="min-h-screen bg-gray-50 p-6">
      <div class="max-w-md mx-auto space-y-6">
        {/* 🔥 HEADER */}
        <h1 class="text-2xl font-bold">Habit Statistics</h1>

        {/* 🔥 HEATMAP (PINDAH KE ATAS) */}
        <div class="bg-white rounded-2xl p-4 shadow">
          <h2 class="font-semibold mb-4">Activity</h2>

          <div class="grid grid-rows-7 grid-flow-col gap-1 overflow-x-auto pb-2">
            {heatmap.map((d) => {
              const level = getLevel(d.count);
              return (
                <div
                  key={d.date}
                  title={`${d.date} (${d.count})`}
                  class={`w-4 h-4 rounded-sm ${getColor(level)}`}
                />
              );
            })}
          </div>

          <div class="flex justify-between text-xs text-gray-400 mt-3">
            <span>Past</span>
            <span>Now</span>
          </div>
        </div>

        {/* 🔥 SUMMARY (compact & rapi) */}
        <div class="grid grid-cols-2 gap-3">
          <Card
            label="Current Streak"
            value={`🔥 ${summary?.current_streak ?? 0}`}
          />
          <Card label="Best Streak" value={`🏆 ${summary?.best_streak ?? 0}`} />
          <Card
            label="Completion"
            value={`${summary?.completion_rate ?? 0}%`}
          />
          <Card label="Total Done" value={`✅ ${summary?.total_done ?? 0}`} />
        </div>

        {/* 🔥 TODAY */}
        {today && (
          <div class="bg-white rounded-2xl p-4 shadow">
            <div class="flex justify-between mb-2 text-sm text-gray-500">
              <span>Today</span>
              <span>
                {today.done} / {today.total}
              </span>
            </div>

            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-gray-900 h-2 rounded-full"
                style={{ width: `${todayProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* 🔥 WEEKLY */}
        <div class="bg-white rounded-2xl p-4 shadow">
          <div class="flex justify-between items-center mb-3">
            <h2 class="font-semibold">Weekly</h2>
            <span class="text-sm text-gray-500">
              {weekly.completed} / {weekly.total}
            </span>
          </div>

          <div class="w-full bg-gray-200 rounded-full h-3">
            <div
              class="bg-gray-900 h-3 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 🔥 TREND + AVERAGE (side by side) */}
        <div class="grid grid-cols-2 gap-3">
          {trend && (
            <Card
              label="Trend"
              value={trend === "up" ? "📈 Improving" : "📉 Declining"}
            />
          )}

          {average_per_day && (
            <Card label="Avg / Day" value={average_per_day} />
          )}
        </div>

        {/* 🔥 PER HABIT (GRID 2 KOLOM) */}
        {per_habit && per_habit.length > 0 && (
          <div class="">
            <h2 class="font-semibold mb-4">Per Habit</h2>

            <div class="grid grid-cols-2 gap-3">
              {per_habit.map((h) => (
                <div class="bg-white rounded-2xl p-4 shadow">
                  <p class="font-medium text-sm truncate">{h.habit}</p>
                  <p class="text-xs text-gray-500 mt-1">{h.done} done</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* 🔥 reusable card */
function Card({ label, value }) {
  return (
    <div class="bg-white rounded-2xl p-4 shadow text-center">
      <p class="text-xs text-gray-500">{label}</p>
      <p class="text-lg font-semibold mt-1">{value}</p>
    </div>
  );
}
