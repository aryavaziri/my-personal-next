"use client";
import { useContext } from "react";
import { Context } from "@app/Provider";
import { TProduct } from "./Product";
import { addToCard } from "@actions/shopServerActions";
import { HydratedDocument } from "mongoose";

const AddToCard = ({ product }: { product: HydratedDocument<TProduct> }) => {
  const myContext = useContext(Context);
  return myContext?.isAuth ? (
    <button
      onClick={async () => await addToCard(product)}
      className="border rounded border-current enabled:hover:bg-light enabled:hover:text-dark disabled:opacity-75 "
      disabled={product.quantity_in_stock == 0}
    >
      ADD TO CARD
    </button>
  ) : (
    <button
      className="border rounded border-current enabled:hover:bg-light enabled:hover:text-dark disabled:opacity-75 "
      onClick={() => {
        myContext.setLoginModal(true);
      }}
    >
      ADD TO CARD
    </button>
  );
};

export default AddToCard;
