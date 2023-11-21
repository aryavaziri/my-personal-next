"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { Context } from "@app/Provider";
import Menu from "@components/Menu";
import Auth from "@components/Auth";
import ThemeButton from "@components/ThemeButton";
import Logo from "/public/LOGO.svg";
import { usePathname } from "next/navigation";
import Login from "./modals/Login";
const Nav = () => {

  const [active, setActive] = useState(false);
  const pathname = usePathname();
  const [toggle, setToggle] = useState(false);
  const myContext = useContext(Context);
  // console.log(myContext);
  return (
    <>
      <Login active={active} setActive={setActive} />

      <div
        onClick={() => {
          if (myContext?.menu) {
            myContext.toggleMenu();
          }
        }}
        className={`fixed w-screen px-4 sm:px-20 md:px-36 lg:px-56 pt-6 sm:pt-12 z-40 text-dark dark:text-light ${myContext.menu ? " h-screen backdrop-blur-md dark:bg-black/60 bg-white/40 " : "backdrop-blur-[0px]"}`} >
        <div className="flex justify-between h-[40px]">
          <Link href={`/`}>
            <Image
              className={`max-md:opacity-0 ${(pathname === "/" || myContext?.menu) && "max-sm:opacity-100 "
                } h-full py-1 w-min object-fill`}
              alt="LOGO"
              src={Logo}
            />
          </Link>

          <div className="flex gap-4 h-full" >
            <Auth setActive={setActive} />
            {/* {myContext?.menu && <Auth />} */}
            {myContext?.menu && <ThemeButton />}
            <Menu />
          </div>
        </div>
        <div
          className={`w-full flex max-sm:px-2 gap-[0px] menu-list duration-500 overflow-hidden`}
        >
          <div className={`bg-aryaBorder4/80 w-[5px] ${myContext?.menu ? `my-8` : `my-0`}`} />
          <div className={`bg-aryaBorder3/80 w-[5px] ${myContext?.menu ? `my-8` : `my-0`}`} />
          <div className={`bg-aryaBorder2/80 w-[5px] ${myContext?.menu ? `my-8` : `my-0`}`} />
          <div className={`bg-aryaBorder1/80 w-[5px] ${myContext?.menu ? `my-8` : `my-0`}`} />
          <ul className="flex-1 pl-8">
            <li
              className={`text-5xl md:text-6xl ${myContext.menu ? "menu-item-show my-8 mt-8" : "my-0"
                } ${myContext.title === "Welcome" ? "text-orange-400" : ""
                }  font-extrabold`}
            >
              <Link
                className={`${myContext.menu ? "delay-100" : "delay-300"} `}
                href={`/`}
              >
                HOME
              </Link>
            </li>
            <li
              className={`text-5xl md:text-6xl ${myContext.menu ? "menu-item-show my-8" : "my-0"
                } ${myContext.title === "Projects" ? "text-orange-400" : ""
                }  font-extrabold`}
            >
              <Link
                className={`${myContext.menu ? "delay-200" : "delay-200"} `}
                href={`/projects`}
              >
                PROJECTS
              </Link>
            </li>
            <li
              className={`text-5xl md:text-6xl ${myContext.menu ? "menu-item-show my-8" : "my-0"
                } ${myContext.title === "About" ? "text-orange-400" : ""
                }  font-extrabold`}
            >
              <Link
                className={`${myContext.menu ? "delay-300" : "delay-100"} `}
                href={`/about`}
              >
                ABOUT
              </Link>
            </li>
            <li
              className={`text-5xl md:text-6xl ${myContext.menu ? "menu-item-show my-8 " : "my-0"
                } ${myContext.title === "Contact" ? "text-orange-400" : ""
                }  font-extrabold`}
            >
              <Link
                className={`${myContext.menu ? "delay-400" : ""} `}
                href={`/contact`}
              >
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Nav;
