"use client";
import { useState, useContext, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Context } from "@app/Provider";
import Image from "next/image";
import type { User } from "@app/Provider";
import Link from "next/link";

const Auth = () => {
  const [toggle, setToggle] = useState(false);
  const newToken = useSearchParams().get("token");
  const myContext = useContext(Context);

  useEffect(() => {
    if (newToken) {
      localStorage.setItem("accessToken", newToken);
    }
    const token = localStorage.getItem("accessToken");
    if (token) {
      validate(token);
    }
  }, []);

  const validate = async (token: String) => {
    await fetch("https://aryav.nl/auth/", {
      headers: { Authorization: `bearer ${token}` },
    })
      .then((res) => {
        if (res.ok) {
          myContext.setIsAuth(true);
          return res.json();
        }
        myContext.setIsAuth(false);
        localStorage.removeItem("accessToken");
        return res.text();
      })
      .then((res) => {
        if (res.user) {
          // console.log(res);
          myContext.setUser(res.user);
          document.cookie = `accessToken=${token};path=/`;
        }
      })
      .catch((err) => {
        console.log("Server connection error bla bla bla!!!");
      });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    myContext.setIsAuth(false);
    myContext.setUser({} as User);
    myContext.toggleMenu();
    document.cookie = `accessToken=`;
  };
  if (!myContext?.menu) {
    toggle && setToggle(false);
    return null;
  }
  return (
    <>
      {!myContext?.isAuth ? (
        <button
          onClick={() => myContext.setLoginModal(true)}
          className="h-auto px-2 my-1 flex duration-300 justify-center items-center border-current duration-100 rounded border font-bold"
        >
          LOGIN
        </button>
      ) : (
        myContext.user?.profileImg && (
          <div
            className="h-auto my-1 aspect-square cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setToggle((prev) => !prev);
            }}
          >
            <Image
              className="h-full w-full rounded-full"
              src={myContext.user?.profileImg}
              alt="IMG"
              width={30}
              height={30}
            />
            {toggle && (
              <div className="z-20 mt-2 bg-light text-dark absolute h-auto flex flex-col duration-300 justify-center items-center rounded">
                <Link
                  href={`/profile/basket`}
                  className={`hover:bg-dark/20 px-4 py-1 border-b border-dark/50`}
                  onClick={() => myContext.toggleMenu()}
                >
                  Basket
                </Link>
                <Link
                  href={`/profile`}
                  className={`hover:bg-dark/20 px-4 py-1 border-b border-dark/50`}
                  onClick={() => myContext.toggleMenu()}
                >
                  Profile
                </Link>
                <button
                  onClick={() => logout()}
                  className="z-20 hover:bg-dark/20 text-dark px-4 py-1 flex "
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )
      )}
    </>
  );
};

export default Auth;
