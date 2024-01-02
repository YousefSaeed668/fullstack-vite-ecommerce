import { loadStripe } from "@stripe/stripe-js";
import { AiOutlineCheckCircle } from "react-icons/ai";

import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
  CardElement,
} from "@stripe/react-stripe-js";
import styles from "./StripeCheckout.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  selectCartItems,
  selectCartTotal,
} from "../features/cart/cartSlice";
import { useUser } from "../features/authentication/useUser";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAddress } from "../features/checkout/useAddress";
import { useSetNewOrder } from "../features/orders/useSetNewOrder";
const promise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);

function CheckoutForm() {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const { user } = useUser();
  const userEmail = user?.email?.split("@")[0];

  const navigate = useNavigate();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const { userID } = useParams();
  const { isLoading, address } = useAddress(userID);
  const cartItem = useSelector(selectCartItems);
  const { setNewOrder } = useSetNewOrder();
  const elements = useElements();
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  async function createPaymentIntent() {
    try {
      const data = await fetch("/.netlify/functions/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartTotal, cartItems }),
      });

      const clientSecretRes = await data.json();
      setClientSecret(clientSecretRes.clientSecret);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    createPaymentIntent();
  }, []);

  async function handleChange(event) {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  }
  async function handleSubmit(ev) {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setNewOrder({
        cartItem,
        address,
        userID,
        cartTotal,
      });
      dispatch(clearCart());
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }

  return (
    <div className="w-full">
      {succeeded ? (
        <article className=" mb-12 flex items-center justify-between">
          <AiOutlineCheckCircle size={108} color="#0D6EFD" />
          <div>
            <h4>Thank You</h4>
            <h4>Your payment was successful</h4>
            <h4>Redirecting to home page shortly</h4>
          </div>
        </article>
      ) : (
        <article className="mb-12">
          <h4 className="text-2xl font-bold text-pblack mb-2">
            <span className=" text-sky-600"> Hello,</span>{" "}
            {user?.displayName || userEmail}
          </h4>
          <p className="text-xl font-semibold">
            Your Total is: <span className="font-bold">${cartTotal}</span>
          </p>
          <p className="mt-5 text-xs">Test Card Number:4242 4242 4242 4242</p>
        </article>
      )}
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className={`${styles.form} `}
        // className="w-1/3 min-w-[500px] self-center shadow-md rounded-lg p-10 max-sm:w-full"
      >
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          disabled={processing || disabled || succeeded}
          id="submit"
          className={`${styles.button} } mt-5`}
        >
          <span id="button-text">
            {processing ? (
              <div class={`${styles.spinner}`} id="spinner"></div>
            ) : (
              "Pay"
            )}
          </span>
        </button>
        {/* Show Any Error That happens when processing the payment  */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p
          className={
            succeeded
              ? styles["result-message"]
              : `${styles["result-message"]} ${styles["hidden"]}`
          }
        >
          Payment succeeded, see the result in your
          <a href={`https://dashboard.stripe.com/test/payments`}>
            {" "}
            Stripe dashboard.
          </a>{" "}
          Refresh the page to pay again.
        </p>
      </form>
    </div>
  );
}
function StripeCheckout() {
  return (
    <div id="stripe">
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default StripeCheckout;
