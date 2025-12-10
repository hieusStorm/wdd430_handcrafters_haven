"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

interface AccountInfoProps {
  user: any;
}

export default function AccountInfo({ user }: AccountInfoProps) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch items created by this user
    const fetchUserItems = async () => {
      try {
        const { data, error } = await supabase
          .from("items")
          .select("*")
          .eq("account", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setItems(data || []);
      } catch (err: any) {
        setError(err.message || "Error loading items");
      } finally {
        setLoading(false);
      }
    };

    fetchUserItems();
  }, [user.id]);

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
        <button onClick={handleSignOut} className="sign_button">
          Sign Out
        </button>
      </div>

      <div className="account_orders">
        <h2>My Items</h2>
        {loading ? (
          <p>Loading items...</p>
        ) : items.length > 0 ? (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong> - ${item.price}
                <br />
                <small>{item.description}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items yet</p>
        )}
      </div>

      {message && <p className="success_message">{message}</p>}
      {error && <p className="error_message">{error}</p>}
    </div>
  );
}
