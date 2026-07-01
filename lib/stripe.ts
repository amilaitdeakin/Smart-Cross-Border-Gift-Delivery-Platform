import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripeServerClient() {
  if (stripeClient) {
    return stripeClient;
  }

  const secretKey =
    process.env.STRIPE_SECRET_KEY || process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      "Stripe secret key is missing. Set STRIPE_SECRET_KEY (preferred) or NEXT_PUBLIC_STRIPE_SECRET_KEY in .env.local.",
    );
  }

  stripeClient = new Stripe(secretKey);
  return stripeClient;
}
