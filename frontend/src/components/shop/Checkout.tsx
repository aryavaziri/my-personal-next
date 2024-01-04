"use client";
import { CreatePaymentIntent } from "@actions/PaymentServerActions";
import { useState, useEffect, useContext } from "react";
import { Context } from "@app/Provider";
import { useRouter } from "next/navigation";

const Checkout = ({ price }: { price: number }) => {
  const [loading, setLoading] = useState(false);
  const myContext = useContext(Context);
  const router = useRouter();

  return (
    <button
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        const Intent: any = await CreatePaymentIntent();
        router.refresh();
        myContext.setClientSecret(Intent.clientSecret);
        // console.log("clientSecret: ", Intent.clientSecret);
      }}
      className="block my-8 px-6 py-4 shadow-md border-2 btn2 text-2xl rounded-full hover:shadow-light/30 max-sm:w-full sm:max-w-[300px] text-center mx-auto"
    >
      <p>{loading ? "LOADING" : `Place Order (Pay € ${price})`}</p>
    </button>
  );
};

export default Checkout;
