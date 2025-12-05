"use client";
export default function AddCartButton(props: { value: string }) {
    const {value} = props;
    
    // add event listener for the button and add item to carts
    function addItem() {
        const currentCart = localStorage.getItem("cart_items");
        const currentCartArray = (currentCart) ? JSON.parse(currentCart) : [];
        currentCartArray.push(value);
        localStorage.setItem("cart_items", JSON.stringify(currentCartArray));
    }
    document.getElementById(value)?.addEventListener("click", addItem);

    return (
        <button className="shop-button" id={value}>🛒</button>
    )
}