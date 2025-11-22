import Image from "next/image";
import "./globals.css";

export default function AccountPage() {
  return (
    <div>
      <h1>Account Page</h1>

      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <button type="submit">Update Account</button>
      </form>

      <div className="account-orders">
        <h2>Order History</h2>
        <ul>
          {}
        </ul>
      </div>

      
    </div>
  );
}