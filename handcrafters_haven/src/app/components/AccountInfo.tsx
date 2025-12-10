"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import Image from "next/image";
import ProductFilters from "../components/ProductFilters";
import AddCartButton from "../components/AddCartButton";


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
          .eq("account", user.id);
          
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
  // Delete an item
  const deleteItem = async (id: number) => {
    const { error } = await supabase.from("items").delete().eq("id", id);
    if (error) {
      console.error("Error deleting item:", error.message);
    } else {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="account_container">
      <h1>Account Page</h1>
      
      <div className="account_info">
        <h2>Account Information</h2>
        <p><strong>Name:</strong> {user.name || "N/A"}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button onClick={handleSignOut} className="shop-button">
          Sign Out
        </button>
      </div>

      <div className="account_orders">
        <h2>My Items</h2>
        {loading ? (
          <p>Loading items...</p>
          
        ) : items.length > 0 ? (
          <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
          >
            {items.map((item) => (<div key={item.id} className="product_card">
                            <h2>{item.name}</h2>
                            {item.image ? (
                              <Image src={item.image} alt={item.name} width={300} height={200} />
                            ) : (
                              <Image src="/placeholder.png" alt="Placeholder" width={300} height={200} />
                            )}
                            <h3>{item.description}</h3>
                            <p>Price: ${item.price}</p>
                            <AddCartButton value={item.name} />
                            <button
                              style={{
                                marginTop: "10px",
                                backgroundColor: "red",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                cursor: "pointer",
                              }}
                              onClick={() => deleteItem(item.id)}
                            >
                              Delete
                            </button>
                          </div>))}
          </div>
        ) : (
          <p>No items yet</p>
        )}
      </div>

      {message && <p className="success_message">{message}</p>}
      {error && <p className="error_message">{error}</p>}
    </div>
  );
}
