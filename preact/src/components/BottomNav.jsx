import { route } from "preact-router";
import { useRouter } from "preact-router";

export default function BottomNav() {
  const [router] = useRouter();

  const currentPath = router.url;

  const navClass = (path) =>
    `px-4 py-2 rounded-lg transition-all duration-200 ${
      currentPath === path ? "bg-gray-900 text-white" : "text-gray-600"
    }`;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-sm">
      <div className="max-w-md mx-auto flex justify-around py-3">
        <button onClick={() => route("/")} className={navClass("/")}>
          Home
        </button>

        <button
          onClick={() => route("/statistic")}
          className={navClass("/statistic")}
        >
          Statistik
        </button>

        <button onClick={() => route("/add")} className={navClass("/add")}>
          Add
        </button>

        <button onClick={() => route("/habit")} className={navClass("/habit")}>
          Habit
        </button>
      </div>
    </div>
  );
}

