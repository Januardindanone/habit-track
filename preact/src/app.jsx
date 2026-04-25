import Router, { route } from "preact-router";
import { useState, useEffect } from "preact/hooks";

import Home from "./pages/Home";
import AddHabit from "./pages/AddHabit";
import Statistic from "./pages/Statistic";
import Habit from "./pages/Habit";
import Login from "./pages/Login";
import BottomNav from "./components/BottomNav";

export function App() {
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    const loginTime = localStorage.getItem("loginTime");

    if (loginTime) {
      const expired = Date.now() - loginTime > 1000 * 60 * 60 * 2;
      if (expired) {
        localStorage.removeItem("isLogin");
        localStorage.removeItem("loginTime");
      }
    }

    const status = localStorage.getItem("isLogin") === "true";
    setIsLogin(status);
  }, []);

  // 🔒 redirect harus di sini
  useEffect(() => {
    if (isLogin === false && location.pathname !== "/login") {
      route("/login", true);
    }
  }, [isLogin]);

  if (isLogin === null) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <div className="pb-20">
      <Router>
        {/* LOGIN */}
        <Login
          path="/login"
          onLogin={() => {
            localStorage.setItem("isLogin", "true");
            setIsLogin(true);
            route("/");
          }}
        />

        {/* PROTECTED */}
        {isLogin && <Home path="/" />}
        {isLogin && <AddHabit path="/add" />}
        {isLogin && <Statistic path="/statistic" />}
        {isLogin && <Habit path="/habit" />}

        {/* FALLBACK */}
        <div default className="p-4 text-center">
          Not Found
        </div>
      </Router>

      {isLogin && <BottomNav />}
    </div>
  );
}
