import Router from "preact-router";

import Home from "./pages/Home";
import AddHabit from "./pages/AddHabit";
import Statistic from "./pages/Statistic";
import Habit from "./pages/Habit";
import BottomNav from "./components/BottomNav";

export function App() {
  return (
    <div className="pb-20">
      <Router>
        <Home path="/" />
        <AddHabit path="/add" />
        <Statistic path="/statistic" />
        <Habit path="/habit" />
      </Router>

      <BottomNav />
    </div>
  );
}

