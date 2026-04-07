import { route } from "preact-router"

export default function StatsPage() {
  const totalDays = 42
  const completedDays = 34
  const completionRate = Math.round((completedDays / totalDays) * 100)

  const heatmap = Array.from({ length: 70 }, (_, i) => {
    const level = i % 5
    return level
  })

  function getColor(level) {
    switch (level) {
      case 0:
        return "bg-gray-200"
      case 1:
        return "bg-gray-300"
      case 2:
        return "bg-gray-400"
      case 3:
        return "bg-gray-600"
      case 4:
        return "bg-gray-900"
      default:
        return "bg-gray-200"
    }
  }

  return (
    <div class="min-h-screen bg-gray-50 p-6">
      <div class="max-w-md mx-auto">
        <h1 class="text-2xl font-bold mb-6">
          Habit Statistics
        </h1>

        <div class="grid grid-cols-2 gap-3 mb-6">
          <div class="bg-white rounded-2xl p-4 shadow">
            <p class="text-sm text-gray-500">Current Streak</p>
            <p class="text-2xl font-bold mt-1">🔥 7</p>
          </div>

          <div class="bg-white rounded-2xl p-4 shadow">
            <p class="text-sm text-gray-500">Best Streak</p>
            <p class="text-2xl font-bold mt-1">🏆 14</p>
          </div>

          <div class="bg-white rounded-2xl p-4 shadow">
            <p class="text-sm text-gray-500">Completion</p>
            <p class="text-2xl font-bold mt-1">{completionRate}%</p>
          </div>

          <div class="bg-white rounded-2xl p-4 shadow">
            <p class="text-sm text-gray-500">Total Done</p>
            <p class="text-2xl font-bold mt-1">✅ {completedDays}</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-4 shadow mb-6">
          <div class="flex justify-between items-center mb-3">
            <h2 class="font-semibold">Weekly Progress</h2>
            <span class="text-sm text-gray-500">3 / 5</span>
          </div>

          <div class="w-full bg-gray-200 rounded-full h-3">
            <div
              class="bg-gray-900 h-3 rounded-full"
              style="width:60%"
            ></div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-4 shadow">
          <h2 class="font-semibold mb-4">
            Activity Heatmap
          </h2>

          <div class="grid grid-rows-7 grid-flow-col gap-1 overflow-x-auto pb-2">
            {heatmap.map(level => (
              <div
                class={`w-4 h-4 rounded-sm ${getColor(level)}`}
              />
            ))}
          </div>

          <div class="flex justify-between text-xs text-gray-400 mt-3">
            <span>10 weeks ago</span>
            <span>Now</span>
          </div>
        </div>

        <button
          onClick={() => route("/")}
          class="w-full mt-6 bg-gray-900 text-white p-3 rounded-xl"
        >
          Back Home
        </button>
      </div>
    </div>
  )
}