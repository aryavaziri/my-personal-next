"use client";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useState, useContext } from "react";
import { Context } from "@app/Provider";
import { delProductAction } from "@actions/shopServerActions";
import { TProduct } from "./Product";

const DeleteProduct = async ({ product }: { product: TProduct }) => {
  const myContext = useContext(Context);
  return (
    myContext.isAuth && (
      <button
        onClick={async (e) => {
          e.preventDefault();
          await delProductAction(product);
        }}
        className="aspect-square rounded-full bg-black/30 text-rose-400 hover:bg-slate-300/80 hover:text-rose-600 p-1"
      >
        <MdDeleteOutline />
      </button>
    )
  );
};

export default DeleteProduct;
