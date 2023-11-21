"use client";
import React, { useState, useEffect } from "react";
import Login from "@components/modals/Login";

const page = () => {
  return (
    <div>
      {/* <button
        className={`absolute mt-40 text-2xl`}
        onClick={() => {
          return;
          setActive(true);
        }}
      >
        LOGIN
      </button> */}
      <div className={`absolute `}>
        <Login active={true} />
      </div>
    </div>
  );
};

export default page;
