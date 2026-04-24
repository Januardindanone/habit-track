import { useState, useEffect } from "preact/hooks";
import { useToast } from "../context/ToastContext";

export default function HabitForm({
  initialData = {},
  onSubmit,
  onCancel,
  loading,
  title = "Habit",
}) {
  const toast = useToast();

  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  const [habitName, setHabitName] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [time, setTime] = useState("");

  useEffect(() => {
    if (initialData) {
      setHabitName(initialData.habit || "");
      setSelectedDays(initialData.id_hari || []);
      setTime(initialData.jam || "");
    }
  }, [initialData]);

  const toggleDay = (id) => {
    setSelectedDays((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
    );
  };

  const handleSubmit = () => {
    if (!habitName.trim()) return toast.error("Nama habit wajib diisi");
    if (!selectedDays.length) return toast.error("Pilih minimal 1 hari");

    onSubmit({
      habit: habitName,
      id_hari: selectedDays,
      jam: time || null,
    });
  };

  return (
    <div class="bg-white p-6 rounded-xl w-full max-w-md">
      <h2 class="text-xl font-semibold mb-4">{title}</h2>

      <input
        type="text"
        value={habitName}
        onInput={(e) => setHabitName(e.target.value)}
        class="w-full border rounded-lg p-3 mb-4"
        placeholder="Habit name"
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
        onClick={handleSubmit}
        disabled={loading}
        class="w-full bg-gray-900 text-white p-3 rounded-lg disabled:opacity-50"
      >
        {loading ? "Menyimpan..." : "Simpan"}
      </button>

      <button onClick={onCancel} class="w-full mt-3 text-gray-500">
        Batal
      </button>
    </div>
  );
}
