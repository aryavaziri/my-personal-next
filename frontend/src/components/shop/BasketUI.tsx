"use client";
import {
  ItemIncrementAction,
  ItemDecrementAction,
  ItemDeleteFromCardAction,
} from "@actions/shopServerActions";
import React from "react";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

export const CheckOrder = ({ clientSecret }: { clientSecret: string }) => {
  console.log(clientSecret);
};

export const ItemIncrement = ({ productId }: { productId: string }) => {
  return (
    <button
      onClick={async () => await ItemIncrementAction(productId)}
      className={` h-full opacity-80 hover:opacity-100 hover:scale-105`}
    >
      <FiPlusCircle className="h-full" />
    </button>
  );
};

export const ItemDecrement = ({ productId }: { productId: string }) => {
  return (
    <button
      onClick={async () => await ItemDecrementAction(productId)}
      className={` h-full opacity-80 hover:opacity-100 hover:scale-105`}
    >
      <FiMinusCircle className="h-full" />
    </button>
  );
};

export const ItemRemove = ({ productId }: { productId: string }) => {
  return (
    <button
      onClick={async () => await ItemDeleteFromCardAction(productId)}
      className={`ml-8 h-full opacity-80 text-red-500 hover:opacity-100 hover:scale-105`}
    >
      <MdDeleteForever className="h-full" />
    </button>
  );
};
