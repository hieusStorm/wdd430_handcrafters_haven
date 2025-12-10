"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<string[]>([]);

  // Load reviews from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("reviews");
    if (stored) setReviews(JSON.parse(stored));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Reviews</h1>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}

      <Link href="/">
        <button style={{ marginTop: "20px" }}>Back to Home</button>
      </Link>
    </div>
  );
}
