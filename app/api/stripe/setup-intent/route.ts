import { NextResponse } from "next/server";
import { getStripeServerClient } from "@/lib/stripe";

export async function POST() {
  const setupIntent = await getStripeServerClient().setupIntents.create({
    payment_method_types: ["card"],
  });

  if (!setupIntent.client_secret) {
    throw new Error("Stripe did not return a setup intent client secret.");
  }

  return NextResponse.json({ clientSecret: setupIntent.client_secret });
}
