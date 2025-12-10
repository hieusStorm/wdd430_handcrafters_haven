"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AddItem() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      // Get the current user from localStorage
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        throw new Error("You must be logged in to add items");
      }
      const user = JSON.parse(storedUser);

      // Validate price is a number
      const priceNum = parseFloat(price);
      if (isNaN(priceNum) || priceNum < 0) {
        throw new Error("Please enter a valid price");
      }

      // Insert new item into the items table WITH account id
      const { data, error } = await supabase
        .from("items")
        .insert([
          {
            name: name.trim(),
            description: description.trim(),
            price: priceNum,
            image: imageUrl.trim() || null,
            account: user.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setMessage("Item added successfully!");
      // Clear form
      setName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
    } catch (err: any) {
      setError(err.message || "Error adding item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-item-container">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit} className="add-item-form">
        <div className="form-group">
          <label htmlFor="name">Item Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter item name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter item description"
            rows={4}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($):</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            step="0.01"
            min="0"
            placeholder="0.00"
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL (optional):</label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Adding..." : "Add Item"}
        </button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}