"use client";

import Image from "next/image";
import "./globals.css";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import { useState, useEffect } from "react";

// Fetch items from Supabase
async function getItems() {
  const { data, error } = await supabase.from("items").select("*");
  if (error) {
    console.log("Supabase error:", error.message);
    return [];
  }
  return data ?? [];
}

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [reviews, setReviews] = useState<string[]>([]);
  const [newReview, setNewReview] = useState("");

  // Load items and reviews on mount
  useEffect(() => {
    getItems().then((data) => setItems(data));

    const stored = localStorage.getItem("reviews");
    if (stored) setReviews(JSON.parse(stored));
  }, []);

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.trim() === "") return;

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem("reviews", JSON.stringify(updated));
    setNewReview("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to Handcrafter's Haven!</h1>
      <p>Your one-stop shop for all things handmade and artisanal.</p>

      <h2>Featured Products</h2>
      <p>Check out our selection of handmade goods, crafted with care by artisans from around the world.</p>

      <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
        {items.length > 0 ? (
          items.map((item: any) => (
            <div key={item.id} className="product_card" style={{ border: "1px solid #ccc", padding: "10px", width: "220px" }}>
              <h3>{item.name}</h3>
              {item.image ? (
                <Image src={item.image} alt={item.name} width={200} height={150} />
              ) : (
                <Image src="/placeholder.png" alt="Placeholder" width={200} height={150} />
              )}
              <p>Price: ${item.price}</p>
              <Link href="/products">
                <button className="shop-button" style={{ marginTop: "10px" }}>Shop Now</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No products available right now.</p>
        )}
      </div>

      {/* Review Section */}
      <h2>Reviews</h2>
      <p>See what our customers are saying about us!</p>
      <form onSubmit={submitReview} style={{ marginBottom: "20px" }}>
        <label><input
          type="text"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write a review..."
          style={{ width: "300px", marginRight: "10px" }}
        /></label>
        <button type="submit" className="shop-button">Submit Review</button>
      </form>

      {reviews.length > 0 ? (
        <ul>
          {reviews.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}

      <Link href="/reviews">
        <button style={{ marginTop: "20px" }}>See All Reviews</button>
      </Link>
    </div>
  );
}
