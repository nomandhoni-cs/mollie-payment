"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Thank you for your purchase. Your payment has been processed
            successfully.
          </p>
        </div>

        {paymentId && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Payment ID: <span className="font-mono text-xs">{paymentId}</span>
            </p>
          </div>
        )}

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Shop
        </Link>
      </div>
    </div>
  );
}
