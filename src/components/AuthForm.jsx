import { useState } from "react";
import { User, Lock, Mail } from "lucide-react";

export default function AuthForm() {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!form.email || !form.password || (tab === "register" && !form.name)) {
      setError("Please fill all fields");
      return;
    }
    // Fake submit
    setError("");
    alert(tab === "login" ? "Login success!" : "Register success!");
  };

  return (
    <div>
      <div className="flex justify-center mb-6">
        <button
          className={`px-6 py-2 rounded-l-full font-semibold transition-all duration-200 text-base border-r border-gray-200 focus:outline-none ${
            tab === "login"
              ? "bg-gradient-to-br from-[#fc00ff] to-[#00dbde] text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gradient-to-br hover:from-[#fc00ff]/10 hover:to-[#00dbde]/10"
          }`}
          onClick={() => setTab("login")}
          type="button"
        >
          Login
        </button>
        <button
          className={`px-6 py-2 rounded-r-full font-semibold transition-all duration-200 text-base focus:outline-none ${
            tab === "register"
              ? "bg-gradient-to-br from-[#fc00ff] to-[#00dbde] text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gradient-to-br hover:from-[#fc00ff]/10 hover:to-[#00dbde]/10"
          }`}
          onClick={() => setTab("register")}
          type="button"
        >
          Register
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {tab === "register" && (
          <div className="relative">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-12 py-3 rounded-full border border-gray-300 focus:border-[#fc00ff] focus:ring-2 focus:ring-[#fc00ff]/20 outline-none transition-all duration-300 text-base font-serif bg-white shadow-sm"
            />
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        )}
        <div className="relative">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full px-12 py-3 rounded-full border border-gray-300 focus:border-[#fc00ff] focus:ring-2 focus:ring-[#fc00ff]/20 outline-none transition-all duration-300 text-base font-serif bg-white shadow-sm"
          />
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        <div className="relative">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-12 py-3 rounded-full border border-gray-300 focus:border-[#fc00ff] focus:ring-2 focus:ring-[#fc00ff]/20 outline-none transition-all duration-300 text-base font-serif bg-white shadow-sm"
          />
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <button
          type="submit"
          className="w-full py-3 rounded-full font-bold text-white bg-gradient-to-br from-[#fc00ff] to-[#00dbde] hover:opacity-90 transition-all duration-300 shadow-lg mt-2 text-lg tracking-wide"
        >
          {tab === "login" ? "Login" : "Register"}
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-500">
        {tab === "login" ? (
          <>
            Don't have an account?{' '}
            <button
              className="text-[#fc00ff] hover:underline font-semibold"
              onClick={() => setTab("register")}
              type="button"
            >
              Register
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              className="text-[#fc00ff] hover:underline font-semibold"
              onClick={() => setTab("login")}
              type="button"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
} 