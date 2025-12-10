"use client";

import { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import AccountInfo from "../components/AccountInfo";
import AddItem from "../components/AddItem";
import "../globals.css";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is signed in
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) {
    return <div className="account_container">Loading...</div>;
  }

  // Account info component with add item form
  if (user) {
    return (
      <main>
      <div className="account_container">
        <AccountInfo user={user} />
        <AddItem />
      </div>
      </main>
    );
  }

  // continue to show the form if creds are not found
  return <AuthForm onAuthSuccess={(userData) => setUser(userData)} />;
}

