import { NextRequest, NextResponse } from "next/server";
import createMollieClient from "@mollie/api-client";

const mollieClient = createMollieClient({
  apiKey: process.env.MOLLIE_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const paymentId = new URLSearchParams(body).get("id");

    if (!paymentId) {
      return NextResponse.json(
        { error: "No payment ID provided" },
        { status: 400 },
      );
    }

    // Fetch the payment from Mollie to get the current status
    const payment = await mollieClient.payments.get(paymentId);

    console.log("Webhook received for payment:", {
      id: payment.id,
      status: payment.status,
      amount: payment.amount,
      description: payment.description,
      metadata: payment.metadata,
    });

    // Handle different payment statuses
    switch (payment.status) {
      case "paid":
        console.log("Payment successful:", payment.id);
        // Here you would typically:
        // - Update your database
        // - Send confirmation email
        // - Fulfill the order
        // - Update inventory
        break;

      case "failed":
      case "canceled":
      case "expired":
        console.log("Payment failed/canceled/expired:", payment.id);
        // Handle failed payments
        break;

      case "pending":
        console.log("Payment pending:", payment.id);
        // Payment is still being processed
        break;

      default:
        console.log("Unknown payment status:", payment.status);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
