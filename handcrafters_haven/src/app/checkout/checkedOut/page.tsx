import Link from "next/link";

export default function Checkedout() {
    return (
        <main>
            <p>Thank you for shopping with us!</p>
            <Link href={"../../products"} className="shop-button">Continue Shopping</Link>
        </main>
    );
}