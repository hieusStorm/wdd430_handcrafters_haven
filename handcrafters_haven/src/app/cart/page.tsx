import Link from "next/link";
import CartClient from "./CartClient";

export default function CartPage() {
  return (
    <main>
      <CartClient />
      <Link href={"../checkout"} className="shop-button">check out</Link>
    </main>
  );
}