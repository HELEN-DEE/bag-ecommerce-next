'use client'

import { useParams } from 'next/navigation';
import { products } from "@/data/products";
import Image from "next/image";
import { useCart } from "@/components/context/cartContext";

export default function ProductPage() {
    const params = useParams();
  const productId = String(params.id); // ✅ Convert param to string

    const product = products.find(p => String(p.id) === productId);
    const { toggleCart, cartItems } = useCart();

if (!product) {
    return (
        <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-red-500">Product Not Found</h1>
        </div>
    );
}

return (
    <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={500}
                className="object-contain rounded-xl"
            />
            
            <div>
                <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                <p className="text-xl font-semibold mb-2">{product.price}</p>
                <p>{product.description}</p>
                <p className="text-gray-600 mb-6">Category: {product.category}</p>

                <button
                    className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
                    onClick={() => toggleCart(String(product.id))}
                >
                {cartItems.includes(String(product.id))
                    ? "Remove from Cart"
                    : "Add to Cart"}
                </button>
            </div>
        </div>
    </div>
);
}
