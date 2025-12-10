"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

interface AuthFormProps {
  onAuthSuccess?: (userData: any) => void;
}

export default function AuthForm({ onAuthSuccess }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      // Query the account table to check credentials
      const { data, error } = await supabase
        .from("account")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single();

      if (error || !data) {
        throw new Error("Invalid email or password");
      }

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(data));
      
      setMessage("Successfully signed in!");
      if (onAuthSuccess) onAuthSuccess(data);
    } catch (err: any) {
      setError(err.message || "Error signing in");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      // Check if email already exists
      const { data: existingUser } = await supabase
        .from("account")
        .select("id")
        .eq("email", email)
        .single();

      if (existingUser) {
        throw new Error("Email already registered");
      }

      // Insert new account
      const { data, error } = await supabase
        .from("account")
        .insert([{ email, password, name }])
        .select()
        .single();

      if (error) throw error;
      
      setMessage("Sign up successful! You can now sign in.");
      setIsSignUp(false);
    } catch (err: any) {
      setError(err.message || "Error signing up");
    }
  };

  return (
    <div className="account-container">
      <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>

      <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="auth-form">
        {isSignUp && (
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <button type="submit" className="submit-btn">
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>

      <p className="toggle-auth">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button 
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError("");
            setMessage("");
          }}
          className="toggle-btn"
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </p>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
