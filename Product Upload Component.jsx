"use client";
import { useState } from "react";

export default function ProductUpload() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    images: [],
    tags: {
      skinType: [],
      ingredients: []
    }
  });

  const handleSubmit = async () => {
    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "Content-Type": "application/json" }
    });

    alert("Product Added ✅");
  };

  return (
    <div className="p-6 border rounded">
      <h2 className="text-lg font-bold mb-4">Upload Product</h2>

      <input
        placeholder="Product Name"
        className="border p-2 w-full mb-2"
        onChange={(e) => setProduct({...product, name: e.target.value})}
      />

      <input
        placeholder="Price"
        type="number"
        className="border p-2 w-full mb-2"
        onChange={(e) => setProduct({...product, price: e.target.value})}
      />

      <input
        type="file"
        multiple
        className="mb-2"
        onChange={(e) =>
          setProduct({...product, images: [...e.target.files]})
        }
      />

      {/* AI Tags */}
      <input
        placeholder="Skin Type (Oily, Dry)"
        className="border p-2 w-full mb-2"
        onChange={(e) =>
          setProduct({...product, tags: {...product.tags, skinType: e.target.value.split(",")}})
        }
      />

      <input
        placeholder="Ingredients (Niacinamide, Retinol)"
        className="border p-2 w-full mb-2"
        onChange={(e) =>
          setProduct({...product, tags: {...product.tags, ingredients: e.target.value.split(",")}})
        }
      />

      <button onClick={handleSubmit} className="bg-black text-white px-4 py-2">
        Upload
      </button>
    </div>
  );
}
