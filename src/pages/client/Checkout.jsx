import StripeCheckout from "../../ui/StripeCheckout";

function Checkout() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F9FAFB]">
      <StripeCheckout />
    </div>
  );
}

export default Checkout;
