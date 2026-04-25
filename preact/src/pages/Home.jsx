import { useState, useEffect } from "preact/hooks";
import { getHabits, addRiwayat, deleteRiwayat } from "../api";
import { useToast } from "../context/ToastContext";

export default function Home() {
  const [habits, setHabits] = useState([]);
  const [hari, setHari] = useState("");

  const getTodayId = () => {
    const d = new Date().getDay();
    return d === 0 ? 7 : d;
  };

  const fetchData = async () => {
    try {
      const res = await getHabits(getTodayId());
      setHabits(res.habits);
      setHari(res.hari);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const completed = habits.filter((h) => h.done).length;
  const total = habits.length;
  const progress = total ? (completed / total) * 100 : 0;

  const handleCheck = async (id) => {
    const habit = habits.find((h) => h.id === id);
    if (!habit) return;
    try {
      if (!habit.done) {
        // ➜ tambah riwayat
        await addRiwayat(habit.id);
      } else {
        // ➜ hapus riwayat pakai id_riwayat
        if (!habit.id_riwayat) {
          console.error("id_riwayat tidak ada");
          return;
        }
        await deleteRiwayat(habit.id_riwayat);
      }
      // 🔥 ambil ulang dari backend (paling aman & akurat)
      await fetchData();
    } catch (err) {
      console.error(err);
      toasr.error("Gagal update habit");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-2">Habits</h1>
        <p className="text-sm text-gray-500 mb-5">Hari ini • {hari}</p>

        {/* Progress */}
        <div className="bg-white rounded-2xl p-4 shadow mb-5">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">Progress hari ini</span>
            <span className="font-semibold">
              {completed}/{total}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-900 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {habits.map((h) => (
            <div
              key={h.id}
              className={`rounded-2xl p-4 flex justify-between items-center shadow ${
                h.done ? "bg-green-100 border border-green-300" : "bg-white"
              }`}
            >
              <div>
                <p
                  className={`font-medium ${h.done ? "line-through text-gray-500" : ""}`}
                >
                  {h.habit}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  🔥 {h.total_done} kali {h.jam ? `• ${h.jam.slice(0, 5)}` : ""}
                </p>
              </div>

              <input
                type="checkbox"
                checked={h.done}
                onChange={() => handleCheck(h.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
