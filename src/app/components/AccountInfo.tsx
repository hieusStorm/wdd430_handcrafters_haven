"use client";

import { useState } from "react";

interface AccountInfoProps {
  user: any;
}

export default function AccountInfo({ user }: AccountInfoProps) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setMessage("Signed out successfully");
    // Reloads the page
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="account_container">
      <h1>Account Page</h1>
      
      <div className="account_info">
        <h2>Account Information</h2>
        <p><strong>Name:</strong> {user.name || "N/A"}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button onClick={handleSignOut} className="sign_out_button">
          Sign Out
        </button>
      </div>

      <div className="account_orders">
        <h2>Order History</h2>
        <ul>
          <li>No orders yet</li>
        </ul>
      </div>

      {message && <p className="success_message">{message}</p>}
      {error && <p className="error_message">{error}</p>}
    </div>
  );
}
