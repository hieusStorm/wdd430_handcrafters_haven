"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setMessage("");

    // 1️⃣ Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // This includes "Email not confirmed" or invalid credentials
      setMessage(error.message);
      return;
    }

    // 2️⃣ Optional: fetch extra info from account table (like name)
    const { data: userInfo, error: userError } = await supabase
      .from("account")
      .select("*")
      .eq("email", email)
      .single();

    if (userError) {
      setMessage("Logged in, but failed to fetch extra info.");
      console.error(userError);
    } else {
      console.log("User info:", userInfo);
    }

    // 3️⃣ Redirect to account page after successful login
    setMessage("Logged in successfully!");
    router.push("/account");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
}
