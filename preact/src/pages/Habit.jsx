import { useEffect, useState } from "preact/hooks";
import { getAllHabits, updateHabit } from "../api";
import { useToast } from "../context/ToastContext";
import Modal from "../components/Modal";
import HabitForm from "../components/HabitForm";

export default function Habit() {
  const toast = useToast();

  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getAllHabits();
      setHabits(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const hariMap = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  return (
    <div class="min-h-screen bg-gray-50 flex justify-center p-6">
      <div class="w-full max-w-2xl">
        <h1 class="text-2xl font-semibold mb-6">Manage Habit</h1>

        <div class="bg-white rounded-xl shadow overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-gray-100 text-gray-600">
              <tr>
                <th class="text-left p-3">Habit</th>
                <th class="text-left p-3">Jam</th>
                <th class="text-left p-3">Hari</th>
                <th class="text-left p-3">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {habits.length === 0 ? (
                <tr>
                  <td colspan="4" class="text-center p-4 text-gray-400">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                habits.map((h) => (
                  <tr key={h.id} class="border-t hover:bg-gray-50">
                    <td class="p-3 font-medium">{h.habit}</td>

                    <td class="p-3">{h.jam || "-"}</td>

                    <td class="p-3 text-gray-500">
                      {h.id_hari.map((i) => hariMap[i - 1]).join(", ")}
                    </td>

                    <td class="p-3">
                      <button
                        onClick={() => setSelectedHabit(h)}
                        class="text-blue-600"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 🔥 Modal Edit */}
        {selectedHabit && (
          <Modal onClose={() => setSelectedHabit(null)}>
            <HabitForm
              title="Edit Habit"
              initialData={selectedHabit}
              loading={loading}
              onCancel={() => setSelectedHabit(null)}
              onSubmit={async (data) => {
                try {
                  setLoading(true);

                  await updateHabit(selectedHabit.id, data);

                  toast.success("Berhasil update habit");
                  setSelectedHabit(null);
                  fetchData();
                } catch (err) {
                  console.error(err);
                  toast.error(err.message);
                } finally {
                  setLoading(false);
                }
              }}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}
