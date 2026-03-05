import { useState } from "preact/hooks"

export function App() {

  const [habits, setHabits] = useState([
    { id: 1, name: "Belajar CPNS", done: true },
    { id: 2, name: "Ngoding", done: false },
    { id: 3, name: "Olahraga", done: false },
    { id: 4, name: "Baca Buku", done: false }
  ])

  const toggleHabit = (id) => {
    setHabits(
      habits.map(h =>
        h.id === id ? { ...h, done: !h.done } : h
      )
    )
  }

  const progress =
    Math.round(
      habits.filter(h => h.done).length / habits.length * 100
    )

  return (

    <div class="min-h-screen bg-gray-50 flex justify-center p-6">

      <div class="w-full max-w-md">

        {/* header */}

        <div class="mb-8">

          <h1 class="text-2xl font-semibold text-gray-900">
            Habits
          </h1>

          <p class="text-sm text-gray-500">
            Track your daily progress
          </p>

        </div>

        {/* progress */}

        <div class="mb-6">

          <div class="flex justify-between text-sm text-gray-500 mb-2">

            <span>Today</span>
            <span>{progress}%</span>

          </div>

          <div class="w-full bg-gray-200 h-2 rounded-full">

            <div
              class="bg-gray-900 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />

          </div>

        </div>

        {/* habit list */}

        <div class="space-y-2">

          {habits.map(habit => (

            <div
              key={habit.id}
              class="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between"
            >

              <span
                class={`text-gray-800 ${
                  habit.done && "line-through text-gray-400"
                }`}
              >
                {habit.name}
              </span>

              <button
                onClick={() => toggleHabit(habit.id)}
                class={`w-5 h-5 rounded border flex items-center justify-center
                ${
                  habit.done
                    ? "bg-gray-900 border-gray-900 text-white"
                    : "border-gray-300"
                }`}
              >

                {habit.done && "✓"}

              </button>

            </div>

          ))}

        </div>

        {/* add button */}

        <button class="fixed bottom-8 right-8 w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center text-xl shadow">

          +

        </button>

      </div>

    </div>
  )
}