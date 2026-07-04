import Checkout from "@/components/checkout/page";
import { StripeProvider } from "@/components/checkout/stripe-provider";

const CheckoutPage = () => {
  return (
    <StripeProvider>
      <Checkout />
    </StripeProvider>
  );
};

export default CheckoutPage;
