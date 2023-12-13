"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import AddressCard from "@components/AddressCard";

type Props = {
  children?: React.ReactNode;
  opt?: number;
  profile?: any;
};

export default function Dialog({}: Props) {
  const [profile, setProfile] = useState<any>(null);
  const searchParams = useSearchParams();
  const showDialog = searchParams.get("showDialog");
  useEffect(() => {
    fetch(`/rh/profile`, { next: { tags: ["address"] } })
      .then((res) => res.json())
      .then(({ profile }) => setProfile(profile))
      .catch((err) => console.log(err));
  }, [showDialog]);

  const router = useRouter();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const isBA = showDialog === "b" ? true : false;
  const isNew = showDialog === "n" ? true : false;
  const address =
    showDialog === "n"
      ? {}
      : showDialog === "b"
      ? profile?.billingAddress
      : profile?.shippingAddress?.[parseInt(showDialog ?? "0")];

  useEffect(() => {
    if (
      showDialog === "b" ||
      showDialog === "n" ||
      (parseInt(showDialog ?? "-1") >= 0 &&
        parseInt(showDialog ?? "-1") < profile?.shippingAddress?.length)
    ) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog, profile]);

  const closeDialog = () => {
    router.push("?");
    dialogRef.current?.close();
  };

  return (
    showDialog && (
      <dialog
        ref={dialogRef}
        className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 bg-dark z-10 rounded-xl backdrop:bg-light/20 backdrop:backdrop-blur shadow-lg shadow-light/50"
      >
        <button
          onClick={closeDialog}
          className="px-2 cursor-pointer rounded h-8 hover:font-bold bg-red-500/80 hover:bg-red-600 text-light/70 hover:text-light absolute top-2 right-4"
        >
          X
        </button>
        <div className={`px-4`}>
          <AddressCard
            address={address}
            isBA={isBA}
            isNew={isNew}
            index={parseInt(showDialog)}
          />
        </div>
      </dialog>
    )
  );
}
