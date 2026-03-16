import { route } from "preact-router"

export default function AddHabit(){

  return(

    <div class="min-h-screen bg-gray-50 flex justify-center p-6">

      <div class="w-full max-w-md">

        <h1 class="text-2xl font-semibold mb-6">
          Add Habit
        </h1>


        <input
          type="text"
          placeholder="Habit name"
          class="w-full border rounded-lg p-3 mb-4"
        />


        <button
          class="w-full bg-gray-900 text-white p-3 rounded-lg"
        >
          Save Habit
        </button>


        <button
          onClick={()=>route("/")}
          class="w-full mt-3 text-gray-500"
        >
          Cancel
        </button>

      </div>

    </div>

  )

}