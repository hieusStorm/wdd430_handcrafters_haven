"use client";
import Image from "next/image";
import { supabase } from "../../lib/supabaseClient";
import ProductFilters from "../components/ProductFilters";
import AddCartButton from "../components/addCartButton";
// Fetch products from Supabase
async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    console.error(error);
    return [];
  }
  return data;
}
export default async function Products() {
    const products = await getProducts();
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
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        {products.length > 0 ? (
          products.map((p: any) => (
            <div key={p.id} className="product_card">
              <h2>{p.name}</h2>
              {p.image_url ? (
                <Image src={p.image_url} alt={p.name} width={300} height={200} />
              ) : (
                <p>No image available</p>
              )}
              <h3>{p.description}</h3>
              <p>Price: ${p.price}</p>
              <AddCartButton value={p.name}/>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
        </main>
    );
}