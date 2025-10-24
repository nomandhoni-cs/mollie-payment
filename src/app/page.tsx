"use client";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

// Dummy products data
const products = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 99.99,
    currency: "EUR",
    image: "/next.svg",
    description: "High-quality wireless headphones with noise cancellation",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 249.99,
    currency: "EUR",
    image: "/vercel.svg",
    description: "Advanced fitness tracking and smart notifications",
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 45.5,
    currency: "EUR",
    image: "/globe.svg",
    description: "Ergonomic aluminum laptop stand for better posture",
  },
  {
    id: 4,
    name: "Wireless Mouse",
    price: 29.99,
    currency: "EUR",
    image: "/window.svg",
    description: "Precision wireless mouse with long battery life",
  },
];

export default function Home() {
  const handlePurchase = async (product: (typeof products)[0]) => {
    try {
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: {
            value: product.price.toFixed(2),
            currency: product.currency,
          },
          description: `Purchase: ${product.name}`,
          metadata: {
            productId: product.id.toString(),
            productName: product.name,
            customerEmail: "test@example.com", // You can make this dynamic later
          },
        }),
      });

      const payment = await response.json();

      if (payment.checkoutUrl) {
        // Redirect to Mollie checkout
        window.location.href = payment.checkoutUrl;
      } else {
        alert("Error creating payment");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Error processing payment");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 text-gray-900 dark:text-white">
            Amar Sonar Bangla
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Test Mollie Payment Integration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    €{product.price.toFixed(2)}
                  </span>

                  <button
                    onClick={() => handlePurchase(product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <ShoppingCart size={16} />
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is a test environment. Payments will be processed through
            Mollie's test API.
          </p>
        </div>
      </main>
    </div>
  );
}
