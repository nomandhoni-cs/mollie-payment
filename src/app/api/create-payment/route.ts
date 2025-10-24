import { NextRequest, NextResponse } from "next/server";
import createMollieClient from "@mollie/api-client";

const mollieClient = createMollieClient({
  apiKey: process.env.MOLLIE_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, description, metadata } = body;

    const payment = await mollieClient.payments.create({
      amount: {
        value: amount.value,
        currency: amount.currency,
      },
      description: description,
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/payment/success`,
      webhookUrl: "https://purple-crabs-sit.loca.lt/api/v1/payments/webhook",
      metadata: metadata,
    });

    return NextResponse.json({
      paymentId: payment.id,
      checkoutUrl: payment.getCheckoutUrl(),
      status: payment.status,
    });
  } catch (error) {
    console.error("Mollie payment creation error:", error);
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 },
    );
  }
}
