import { route } from "preact-router";
import { useState } from "preact/hooks";
import { useToast } from "../context/ToastContext";
import { addHabit } from "../api";

export default function AddHabit() {
  const toast = useToast();

  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  const [habitName, setHabitName] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleDay = (id) =>
    setSelectedDays((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
    );

  const saveHabit = async () => {
    if (!habitName.trim()) return toast.error("Nama habit wajib diisi");
    if (!selectedDays.length) return toast.error("Pilih minimal 1 hari");

    try {
      setLoading(true);

      await addHabit({
        habit: habitName,
        id_hari: selectedDays,
        jam: time || null,
      });

      toast.success("Berhasil menambah habit");

      setHabitName("");
      setSelectedDays([]);
      setTime("");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Gagal menyimpan habit");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div class="min-h-screen bg-gray-50 flex justify-center p-6">
      <div class="w-full max-w-md">
        <h1 class="text-2xl font-semibold mb-6">Add Habit</h1>

        <input
          type="text"
          placeholder="Habit name"
          value={habitName}
          onInput={(e) => setHabitName(e.target.value)}
          class="w-full border rounded-lg p-3 mb-4"
        />

        <p class="mb-2 font-medium">Pilih Hari</p>

        <div class="flex flex-wrap gap-2 mb-4">
          {days.map((d, i) => (
            <button
              key={i}
              onClick={() => toggleDay(i + 1)}
              class={`px-3 py-1.5 text-sm rounded-full border ${
                selectedDays.includes(i + 1)
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <input
          type="time"
          value={time}
          onInput={(e) => setTime(e.target.value)}
          class="w-full border rounded-lg p-3 mb-4"
        />

        <button
          onClick={saveHabit}
          disabled={loading}
          class="w-full bg-gray-900 text-white p-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Save Habit"}
        </button>

        <button onClick={() => route("/")} class="w-full mt-3 text-gray-500">
          Cancel
        </button>
      </div>
    </div>
  );
}
