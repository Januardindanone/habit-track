import { route } from "preact-router"

export default function Home(){

  return(

    <div class="min-h-screen bg-gray-50 flex justify-center p-6">

      <div class="w-full max-w-md">

        <h1 class="text-2xl font-semibold mb-6">
          Habits
        </h1>

        <div class="space-y-2">

          <div class="bg-white border rounded-lg p-4">
            Belajar CPNS
          </div>

          <div class="bg-white border rounded-lg p-4">
            Ngoding
          </div>

        </div>

      </div>


      {/* tombol tambah */}

      <button
        onClick={()=>route("/add")}
        class="fixed bottom-8 right-8 w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center text-xl shadow"
      >

        +

      </button>

    </div>

  )

}