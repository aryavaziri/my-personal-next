import "@/../public/css/menu.css";
import React from "react";
import { Context } from "@app/Provider";
import { useState, useContext } from "react";

function Menu() {
  const myContext = useContext(Context);

  return (
    <button
      className=""
      onClick={() => {
        if (!myContext?.menu) {
          myContext.toggleMenu();
        }
      }}
    >
      <div
        className={`grid grid-cols-3 menu relative ${
          myContext.menu ? "menu-open" : ""
        }`}
      >
        <div className="bg-current"></div>
        <div className="bg-current"></div>
        <div className="bg-current"></div>
        <div className="bg-current"></div>
        <div className="bg-current"></div>
        <div className="bg-current"></div>
        <div className="bg-current"></div>
        <div className="bg-current"></div>
        <div className="bg-current"></div>
        <div className={`menu-hover absolute rounded-sm bg-current`}></div>
        <div className={`menu-hover absolute rounded-md bg-current`}></div>
      </div>
    </button>
  );
}

export default Menu;
