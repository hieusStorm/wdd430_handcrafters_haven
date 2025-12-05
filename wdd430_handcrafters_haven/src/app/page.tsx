import Image from "next/image";
import "./globals.css";
import Link from "next/link";

import { supabase } from '../lib/supabaseClient';
// Fetch products from Supabase
async function getProducts() {
  const { data, error } = await supabase.from("items").select("*");

  if (error) {
    console.log("Supabase error:", error.message);
    return []; // avoid crashing the page
  }

  return data ?? [];
}


 export default async function Home() {
  const products = await getProducts();
  return (
    /*<div className="page">
      <main className="main">
        <Image
          className="logo"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="intro">
          <h1>To get started, edit the page.tsx file.</h1>
          <p>
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="ctas">
          <a
            className="primary"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="logo"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="secondary"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
    */
   
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
      {p.image && (
        <Image src={p.image} alt={p.name} width={200} height={150} />
      )}
      <p>Price: ${p.price}</p>
      <Link href="/products" className="shop-button">
        Shop Now
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
 