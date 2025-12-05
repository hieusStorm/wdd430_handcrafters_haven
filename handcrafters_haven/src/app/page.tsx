import Image from "next/image";
import "./globals.css";
import Link from "next/link";

import { supabase } from '../lib/supabaseClient';
// Fetch products from Supabase
async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.log("Supabase error:", error.message);
    return []; // avoid crashing the page
  }

  return data ?? [];
}


 export default async function Home() {
  const products = await getProducts();
  return ( 
   < div>
<h1>Welcome to Handcrafter's Haven!</h1>
    <p>Your one-stop shop for all things handmade and artisanal.</p>
    <h2>Featured Products</h2>
    <p>Check out our selection of handmade goods, crafted with care by artisans from around the world.</p>
    <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
        {products.length > 0 ? (
          products.map((p: any) => (
            <div key={p.id} className="product_card">
              <h3>{p.name}</h3>
              {p.image_url && (
                <Image src={p.image_url} alt={p.name} width={200} height={150} />
              )}
              <p>Price: ${p.price}</p>
              <Link href="/products">
                <a className="shop-button">Shop Now</a>
              </Link>
            </div>
          ))
        ) : (
          <p>No products available right now.</p>
        )}
      </div>
    <h2>Reviews</h2>
    <p>See what our customers are saying about us!</p>
    <p>"Wow I love all of this cool stuff!"</p>
    <p>"Great quality and fast shipping!"</p>
   </div>
   
  );
  
};
 