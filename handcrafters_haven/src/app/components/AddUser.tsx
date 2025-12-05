"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AddUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const { data, error } = await supabase.from("account").insert([
      {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    ]);

    if (error) {
      console.error(error);
      setMessage("Error adding user: " + error.message);
    } else {
      setMessage("User added successfully!");
      setUser({ name: "", email: "", password: "" });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add New User</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
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
        <button type="submit">Add User</button>
      </form>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
}
