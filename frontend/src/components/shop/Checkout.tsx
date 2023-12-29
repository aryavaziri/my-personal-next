"use client";
import { CreatePaymentIntent } from "@actions/PaymentServerActions";
import { useState, useEffect } from "react";
import { type TProfile } from "./Basket";

const Checkout = () => {
  const [profile, setProfile] = useState<TProfile | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  // const router = useRouter();

  return (
    <button
      disabled={loading}
      onClick={async () => {
        // setLoading(true);
        const Intent: any = await CreatePaymentIntent();
        setClientSecret(Intent.clientSecret);
        console.log("clientSecret: ", clientSecret);
        // router.refresh();
      }}
      className="block my-8 px-6 py-4 shadow-md border-2 btn2 text-2xl rounded-full hover:shadow-light/30 max-sm:w-full sm:max-w-[300px] text-center mx-auto"
    >
      <p>
        {loading
          ? "LOADING"
          : `Place Order (Pay € ${profile?.basket?.totalPrice})`}
      </p>
    </button>
  );
};

export default Checkout;
