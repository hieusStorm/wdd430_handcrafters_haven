"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AddItem() {
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "", // <-- Added category
  });

  const [message, setMessage] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setMessage("");

    const { data, error } = await supabase.from("items").insert([
      {
        name: item.name,
        description: item.description,
        price: Number(item.price),
        image: item.image,
        category: item.category, // <-- include category in insert
      },
    ]);

    if (error) {
      console.error(error);
      setMessage("Error adding item: " + error.message);
    } else {
      setMessage("Item added successfully!");
      setItem({ name: "", description: "", price: "", image: "", category: "" });
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add New Item</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}
      >
        <input
          type="text"
          placeholder="Item name"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          value={item.description}
          onChange={(e) => setItem({ ...item, description: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={item.price}
          onChange={(e) => setItem({ ...item, price: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Image URL (ex: /earring1.avif)"
          value={item.image}
          onChange={(e) => setItem({ ...item, image: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={item.category}
          onChange={(e) => setItem({ ...item, category: e.target.value })}
          required
        />

        <button type="submit">Add Item</button>
      </form>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
}
