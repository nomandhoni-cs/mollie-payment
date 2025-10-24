"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const paymentId = searchParams.get("payment_id");

    if (!paymentId) {
        return null;
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-300">
                Payment ID: <span className="font-mono text-xs">{paymentId}</span>
            </p>
        </div>
    );
}