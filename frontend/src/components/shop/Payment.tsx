"use client";
import { CreatePaymentIntent } from "@actions/PaymentServerActions";
import { PaymentIntent, loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import React, { useEffect } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PKEY as string);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div
      className={`border-current overflow-hidden group-hover:border w-0 group-hover:w-80 rounded`}
    >
      <div className="px-8 py-4 my-6 shadow-md rounded hover:shadow-light/30 max-sm:w-full sm:max-w-[600px] mx-auto">
        <h1 className={`pb-1 text-secondaryDark light:text-secondaryLight`}>
          PAYMENT
        </h1>

        {stripePromise && clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret }}
          >
            <CheckoutForm
              setLoading={setLoading}
              // clientSecret={clientSecret}
            />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Payment;

const CheckoutForm = ({ setLoading }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    elements && stripe && setLoading(false);
  }, [elements, stripe]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error?.type === "card_error" || error?.type === "validation_error") {
        setMessage(error.message!);
      } else {
        error && setMessage("An unexpected error occured.");
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
        {/* <button
          onClick={async (e) => {
            e.preventDefault();
            const PI = await stripe?.retrievePaymentIntent(clientSecret);
            console.log(PI?.paymentIntent);
            console.log(PI);
          }}
          className="block my-8 px-6 py-4 shadow-md border-2 btn2 text-2xl rounded-full hover:shadow-light/30 max-sm:w-full sm:max-w-[300px] text-center mx-auto"
        >
          <p>CHECK</p>
        </button> */}
        <PaymentElement id="payment-element" />
        <button
          disabled={isProcessing || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Pay now"}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
};
