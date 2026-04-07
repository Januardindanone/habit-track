import { route } from "preact-router"
import { useState } from "preact/hooks"

export default function AddHabit() {
  const daysList = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu"
  ]

  const [habitName, setHabitName] = useState("")
  const [selectedDays, setSelectedDays] = useState([])
  const [time, setTime] = useState("")

  function toggleDay(day) {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day))
    } else {
      setSelectedDays([...selectedDays, day])
    }
  }

  function saveHabit() {
    const newHabit = {
      name: habitName,
      days: selectedDays,
      time: time || null
    }

    console.log(newHabit)

    // nanti bisa disimpan ke localStorage / state global
    route("/")
  }

  return (
    <div class="min-h-screen bg-gray-50 flex justify-center p-6">
      <div className="w-full max-w-md">
        <h1 class="text-2xl font-semibold mb-6">
          Add Habit
        </h1>

        <input
          type="text"
          placeholder="Habit name"
          value={habitName}
          onInput={(e) => setHabitName(e.target.value)}
          class="w-full border rounded-lg p-3 mb-4"
        />

        <p class="mb-2 font-medium">Pilih Hari</p>

        <div class="flex flex-wrap gap-2 mb-4">
          {daysList.map(day => (
            <button
              type="button"
              onClick={() => toggleDay(day)}
              class={`px-3 py-1.5 text-sm rounded-full border transition ${
                selectedDays.includes(day)
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>

        <p class="mb-2 font-medium">Jam (opsional)</p>

        <input
          type="time"
          value={time}
          onInput={(e) => setTime(e.target.value)}
          class="w-full border rounded-lg p-3 mb-4"
        />

        <button
          onClick={saveHabit}
          class="w-full bg-gray-900 text-white p-3 rounded-lg"
        >
          Save Habit
        </button>

        <button
          onClick={() => route("/")}
          class="w-full mt-3 text-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}