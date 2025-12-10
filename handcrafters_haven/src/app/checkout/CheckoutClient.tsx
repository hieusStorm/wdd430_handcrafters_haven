"use client";

import { useEffect } from "react";

export default function CheckoutClient() {
    function checkout() {
        localStorage.clear();
    }

    useEffect(() => {
        const form = document.querySelector("form");
        if (!form) return;

        form?.addEventListener("submit", (e)=> {
            e.preventDefault();
            checkout();
            window.location.replace("/checkout/checkedOut");
         });
    }, []);

    return (
        <form method="post">
            <label>Card Number: <input type="number" name="cardNumber" placeholder="1111222233334444"/></label>
            <label>Experation date: <input type="number" name="expDate" placeholder="mmyy"/></label>
            <label>CCV: <input type="number" name="code" placeholder="123"/></label>
            <input type="submit" value={"Checkout"} className="shop-button"/>
        </form>
    );
}