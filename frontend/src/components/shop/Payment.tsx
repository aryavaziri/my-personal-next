"use client";
import { CreatePaymentIntent } from "@actions/PaymentServerActions";
import { PaymentIntent, loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useState, useContext, useEffect } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Context } from "@app/Provider";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PKEY as string);

const Payment = () => {
  const myContext = useContext(Context);

  return (
    <div
      className={`border-current overflow-hidden w-0 rounded ${
        myContext?.clientSecret && `w-80 border`
      }`}
    >
      <div className="px-8 py-4 my-6 shadow-md rounded hover:shadow-light/30 max-sm:w-full sm:max-w-[600px] mx-auto">
        <h1 className={`pb-1 text-secondaryDark light:text-secondaryLight`}>
          PAYMENT
        </h1>

        {stripePromise && myContext?.clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret: myContext.clientSecret }}
          >
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Payment;

const CheckoutForm = () => {
  const searchParams = useSearchParams();
  const isConfirmed = searchParams.get("confirmed");
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // useEffect(() => {
  //   elements && stripe && setLoading(false);
  // }, [elements, stripe]);

  useEffect(() => {
    console.log(isConfirmed);
  }, [isConfirmed]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    try {
      const { error, ...rest } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Return URL where the customer should be redirected after the PaymentIntent is confirmed.
          return_url: `?confirmed=true`,
        },
        redirect: "always",
      });
      console.log(rest);

      if (error?.type === "card_error" || error?.type === "validation_error") {
        setMessage(error.message!);
      } else {
        error ? setMessage("An unexpected error occured.") : setMessage("");
      }
      setIsProcessing(false);
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <>
      <form
        id="payment-form"
        onSubmit={handleSubmit}
      >
        <PaymentElement />
        {isConfirmed ? (
          <p>"Your payment is Confirmed"</p>
        ) : (
          <div>
            <button
              className={`border p-1 rounded`}
              disabled={isProcessing || !stripe || !elements}
              id="submit"
            >
              <span>{isProcessing ? "Processing ... " : "Pay now"}</span>
            </button>
          </div>
        )}
        {message && <div className="text-red-400">{message}</div>}
      </form>
    </>
  );
};
