"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function SignupPage() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    // Insert user directly into account table
    const { data, error } = await supabase.from("account").insert([
      {
        name: user.name,
        email: user.email,
        password: user.password, // plain text for now (not secure, for testing)
      },
    ]);

    if (error) {
      setMessage("Signup failed: " + error.message);
      return;
    }

    setMessage("User created successfully! You can now log in.");
    setUser({ name: "", email: "", password: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sign Up</h1>
      <form
        onSubmit={handleSignup}
        style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}
      >
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
}
