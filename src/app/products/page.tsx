"use client";

import Image from "next/image";
import { supabase } from "../../lib/supabaseClient";
import ProductFilters from "../components/ProductFilters";
import AddCartButton from "../components/AddCartButton";
import { useEffect, useState } from "react";

export default function Products() {
  const [items, setItems] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch items with filters
  const getItems = async () => {
    setLoading(true);
    let query = supabase.from("items").select("*");

    if (filters.search.trim() !== "") {
      query = query.ilike("name", `%${filters.search}%`);
    }

    if (filters.minPrice !== "") {
      query = query.gte("price", Number(filters.minPrice));
    }

    if (filters.maxPrice !== "") {
      query = query.lte("price", Number(filters.maxPrice));
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching items:", error.message);
      setItems([]);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  // Fetch items whenever filters change
  useEffect(() => {
    getItems();
  }, [filters]);

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
    <main style={{ padding: "20px" }}>
      
      {/* Filters */}
      <h2>Filter Products</h2>
      <ProductFilters filters={filters} setFilters={setFilters} />

      {/* Display filtered items */}
      <h2>All Products</h2>
      {loading ? (
        <p>Loading items...</p>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="product_card">
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
              </div>
            ))
          ) : (
            <p>No items found.</p>
          )}
        </div>
      )}
    </main>
  );
}
