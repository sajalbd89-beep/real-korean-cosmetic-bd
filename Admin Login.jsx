"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "admin123") {
      document.cookie = "admin-auth=true";
      window.location.href = "/admin/dashboard";
    } else {
      alert("Wrong password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 border rounded">
        <h2 className="text-xl mb-4">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          className="border p-2 mb-3 w-full"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="bg-black text-white px-4 py-2">
          Login
        </button>
      </div>
    </div>
  );
}
