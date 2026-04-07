import { route } from "preact-router"
import { useMemo, useState } from "preact/hooks"

export default function Home() {
  const today = "Selasa"

  const [habits, setHabits] = useState([
    {
      id: 1,
      title: "Belajar CPNS",
      time: "19:00",
      streak: 5,
      days: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"],
      done: false
    },
    {
      id: 2,
      title: "Ngoding",
      time: "21:00",
      streak: 12,
      days: ["Selasa", "Kamis", "Sabtu"],
      done: false
    },
    {
      id: 3,
      title: "Olahraga",
      time: null,
      streak: 3,
      days: ["Selasa", "Jumat", "Minggu"],
      done: true
    }
  ])

  const todayHabits = useMemo(() => {
    return habits
      .filter(habit => habit.days.includes(today))
      .sort((a, b) => a.done - b.done)
  }, [habits])

  const completed = todayHabits.filter(h => h.done).length
  const total = todayHabits.length
  const progress = total ? (completed / total) * 100 : 0

  function handleCheck(id) {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === id
          ? { ...habit, done: !habit.done }
          : habit
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-semibold">
            Habits
          </h1>

        </div>

        <p className="text-sm text-gray-500 mb-5">
          Hari ini • {today}
        </p>

        {/* Progress */}
        <div className="bg-white rounded-2xl p-4 shadow mb-5">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">
              Progress hari ini
            </span>

            <span className="font-semibold">
              {completed}/{total}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gray-900 h-2 rounded-full transition-all"
              style={`width:${progress}%`}
            />
          </div>
        </div>

        {/* Habit List */}
        <div className="space-y-3">
          {todayHabits.map(habit => (
            <div
              key={habit.id}
              className={`rounded-2xl p-4 flex justify-between items-center shadow transition-all
                ${
                  habit.done
                    ? "bg-green-100 border border-green-300"
                    : "bg-white"
                }`}
            >
              <div>
                <p
                  className={`font-medium ${
                    habit.done
                      ? "line-through text-gray-500"
                      : ""
                  }`}
                >
                  {habit.title}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {habit.time || "No time"} • 🔥 {habit.streak} hari
                </p>
              </div>

              <input
                type="checkbox"
                checked={habit.done}
                className="w-5 h-5"
                onChange={() => handleCheck(habit.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}