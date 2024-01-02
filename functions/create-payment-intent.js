//domainc
require("dotenv").config();
const stripe = require("stripe")(process.env.VITE_APP_STRIPE_SECRET_KEY);
exports.handler = async function (event, context) {
  if (event.body) {
    const { cartTotal, cartItems } = JSON.parse(event.body);
    const calculateOrderAmount = () => {
      return cartTotal * 100;
    };
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
      });
      console.log(paymentIntent);
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: error.statusCode,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  }
  return {
    statusCode: 200,
    body: "Create Payment Intent",
  };
};
