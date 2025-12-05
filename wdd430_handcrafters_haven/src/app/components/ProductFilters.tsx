"use client";

import { useState } from "react";

export default function ProductFilters({ filters, setFilters }: any) {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      {/* Search by product name */}
      <input
        type="text"
        placeholder="Search..."
        value={filters.search}
        onChange={(e) =>
          setFilters({ ...filters, search: e.target.value })
        }
        className="border p-2 rounded"
      />

      {/* Min price */}
      <input
        type="number"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={(e) =>
          setFilters({ ...filters, minPrice: e.target.value })
        }
        className="border p-2 rounded"
      />

      {/* Max price */}
      <input
        type="number"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={(e) =>
          setFilters({ ...filters, maxPrice: e.target.value })
        }
        className="border p-2 rounded"
      />
    </div>
  );
}
