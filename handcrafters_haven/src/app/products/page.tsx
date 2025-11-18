import Image from "next/image";

export default function Products() {
    return (
        <main>
            <h1>Artisian Name</h1>
            <div className="product_card">
                <h2>Product Name</h2>
                <Image src={""} alt={"Product picture"}/>
                <h3>description</h3>
                <p>...</p>
                <p>Price: $</p>
            </div>
        </main>
    );
}