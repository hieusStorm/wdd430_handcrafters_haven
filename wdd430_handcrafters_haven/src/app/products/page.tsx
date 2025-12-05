"use client";
import Image from "next/image";
import { supabase } from "../../lib/supabaseClient";
import ProductFilters from "../components/ProductFilters";
import { useEffect, useState } from "react";

export default  function Products() {
    const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
  });
    const [loading, setLoading] = useState(true);
  
    // Fetch products with filters
  const getProducts = async () => {
    setLoading(true);

    let query = supabase.from("items").select("*");

    // Search filter
    if (filters.search.trim() !== "") {
      query = query.ilike("name", `%${filters.search}%`);
    }

    // Min price
    if (filters.minPrice !== "") {
      query = query.gte("price", Number(filters.minPrice));
    }
// Max price
    if (filters.maxPrice !== "") {
      query = query.lte("price", Number(filters.maxPrice));
    }

    const { data, error } = await query;

    if (!error) setProducts(data || []);
    setLoading(false);
  };

  // Fetch products whenever filters change
  useEffect(() => {
    getProducts();
  }, [filters]);

    return (
        <main>
            <h1>Artisian Name</h1>
            <div className="product_card">
                <h2>Product Name</h2>
                <Image src="/placeholder.png" alt={"Product picture"} width={300}
  height={200}/>
                <h3>description</h3>
                <p>...</p>
                <p>Price: $</p>
            </div>

            {/* Filters */}
      <h2>Filter Products</h2>
      <ProductFilters filters={filters} setFilters={setFilters} />

      {/* Display filtered products */}
      <h2>All Products</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {products.length > 0 ? (
            products.map((p: any) => (
              <div key={p.id} className="product_card">
                <h2>{p.name}</h2>

                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={300}
                    height={200}
                  />
                ) : (
                  <p>No image available</p>
                )}

                <h3>{p.description}</h3>
                <p>Price: ${p.price}</p>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
        </main>
    );
}