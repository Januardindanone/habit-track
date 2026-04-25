import { useState, useEffect } from "preact/hooks";
import { route } from "preact-router";
import { useToast } from "../context/ToastContext";

export default function Login({ onLogin }) {
  const [password, setPassword] = useState("");
  const toast = useToast();

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    if (isLogin) {
      onLogin();
      route("/");
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (password === "d") {
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("loginTime", Date.now());
      onLogin(); // 🔥 update state tanpa reload
      route("/");
      toast.success("Berhasil login");
    } else {
      toast.error("Password salah");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-6 rounded-2xl shadow"
      >
        <h1 className="text-xl font-semibold mb-4 text-center">Login</h1>

        <input
          type="password"
          placeholder="Masukkan password"
          value={password}
          onInput={(e) => setPassword(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button className="w-full bg-black text-white py-2 rounded-lg">
          Masuk
        </button>
      </form>
    </div>
  );
}
