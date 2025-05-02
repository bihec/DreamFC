// src/auth/Login.tsx
import { useState } from "react";
import { supabase } from "../services/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError("ایمیل یا رمز اشتباهه!");
    } else {
      alert("ورود با موفقیت انجام شد!");
      // می‌تونی کاربر رو به صفحه دیگه (مثلاً HomePage.tsx) هدایت کنی
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="p-6 bg-gray-100 rounded shadow">
        <h2 className="text-2xl mb-4">ورود</h2>
        <input
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">
          ورود
        </button>
      </form>
    </div>
  );
}