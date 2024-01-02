import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "./cartSlice";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

function CartCheckout({ user }) {
  const [promoCode, setPromoCode] = useState("");
  const navigate = useNavigate();
  const cartTotal = useSelector(selectCartTotal);
  return (
    <div className="flex-1 min-w-[300px]  max-w-sm">
      <div className="relative h-12 border border-pblack mb-4">
        <input
          type="text"
          placeholder="Enter Promo Code"
          onChange={(e) => setPromoCode(e.target.value)}
          value={promoCode}
          className="w-full h-full border-none pl-2 outline-none"
        />
        <button className="absolute right-0 top-0 bg-pblack h-full text-white px-10">
          Apply
        </button>
      </div>
      <p className="flex items-center justify-between font-medium text-lg">
        <span>SubTotal</span>
        <span>${cartTotal}</span>
      </p>
      <p className="flex items-center justify-between font-medium text-lg my-3">
        <span>Shipping Cost</span>
        <span>Free</span>
      </p>
      <p className="flex items-center justify-between font-medium text-lg">
        <span>Estimated Total</span>
        <span>${cartTotal}</span>
      </p>
      <Button
        buttonType="client"
        disabled={user === null}
        buttonStyle="w-full mt-12"
        onClick={() => navigate(`/check-out/${user.uid}`)}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}

export default CartCheckout;
