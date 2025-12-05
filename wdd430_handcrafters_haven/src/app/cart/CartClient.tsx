"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartClient() {
  const [cartItems, setCartItems] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart_items");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  if (cartItems.length === 0) {
    return (
      <>
        <h1>Your cart is empty</h1>
        <Link href="/products" className="shop-button">
          Continue looking
        </Link>
      </>
    );
  }

  return (
    <ul>
      {cartItems.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
