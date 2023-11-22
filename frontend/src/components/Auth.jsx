"use client";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Context } from "@app/Provider";
import Image from "next/image";

const Auth = () => {

  const [toggle, setToggle] = useState(false);
  const newToken = useSearchParams().get("token");
  const router = useRouter();
  const myContext = useContext(Context);

  useEffect(() => {
    console.log("newToken: ", newToken)
    if (newToken) {
      localStorage.setItem("accessToken", newToken);
    }
    const token = localStorage.getItem("accessToken");
    if (token) {
      validate(token);
      // router.refresh();
    }
  }, []);

  const validate = async (token) => {
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
        // console.log(res);
        if (res.user) {
          myContext.setUser(res.user);
        };
      })
      .catch((err) => {
        console.log("Server connection error bla bla bla!!!");
      });
  };

  const login = () => {
    window.open("https://aryav.nl/auth/login/google", "_self");
  };
  const logout = () => {
    localStorage.removeItem("accessToken");
    myContext.setIsAuth(false);
    myContext.setUser(null)
    myContext.toggleMenu()

    // router.refresh();
  };
  if (!myContext?.menu) return null
  return (
    <>

      {!myContext?.isAuth ? (
        <button
          // onClick={() => login()}
          onClick={() => myContext.setLoginModal(true)}
          className="h-auto px-2 my-1 flex duration-300 justify-center items-center border-current duration-100 rounded border font-bold"
        >
          LOGIN
        </button>
      ) : (
        myContext.user?.profileImg && (
          <div
            className="h-auto my-1 aspect-square cursor-pointer"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setToggle((prev) => !prev); }}
          >
            <Image
              className="h-full w-full rounded-full"
              src={myContext.user?.profileImg}
              alt="IMG"
              width={30}
              height={30}
            />
            {toggle && (
              <button
                onClick={() => logout()}
                className="z-20 bg-slate-200 absolute h-auto px-2 my-1 flex duration-300 justify-center items-center rounded border"
              >
                Logout
              </button>
            )}
          </div>
        )
      )}
    </>
  );
};

export default Auth;
