"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { Context } from "@app/Provider";
import Menu from "@components/Menu";
import Auth from "@components/Auth";
import ThemeButton from "@components/ThemeButton";
import Logo from "@/../public/LOGO.svg";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();
  const [toggle, setToggle] = useState(false);
  const myContext = useContext(Context);
  console.log(myContext);
  return (
    <div
      onClick={() => {
        if (myContext?.menu) {
          myContext.toggleMenu();
        }
      }}
      className={`fixed w-screen px-2 sm:px-12 md:px-24 pt-6 sm:pt-12 z-20 text-arya3 dark:text-arya1  ${
        myContext.menu
          ? " h-screen backdrop-blur-md dark:bg-[#023e8a90] bg-[#caf0f870]"
          : "backdrop-blur-[0px]"
      }`}
    >
      <div className="flex justify-between h-[40px]">
        <Link href={`/`}>
          <Image
            className={`${
              !myContext?.menu && pathname !== "/" && "opacity-0"
            } h-full py-1 w-min object-fill`}
            alt="LOGO"
            src={Logo}
          />
        </Link>

        <div className="flex gap-4 h-full">
          {myContext?.menu && <Auth />}
          {myContext?.menu && <ThemeButton />}
          <Menu />
        </div>
      </div>
      <div
        className={`w-full px-12 md:px-32 lg:px-52 menu-list duration-500 overflow-hidden`}
      >
        {/* <div className="border-l-4 border-[#6930c3]">
          <div className="border-l-4 border-[#5390d9]">
            <div className="border-l-4 border-[#56cfe1]"> */}
        {/* <div className="border-8"></div> */}
        <ul className="w-full border-l-4 pl-8 border-current">
          <li
            // onClick={() => menuHandler()}
            className={`text-5xl md:text-6xl ${
              myContext.menu ? "menu-item-show my-6 mt-8" : "my-0"
            } ${
              myContext.title === "Welcome" ? "text-orange-400" : ""
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
            // onClick={() => menuHandler()}
            className={`text-5xl md:text-6xl ${
              myContext.menu ? "menu-item-show my-6" : "my-0"
            } ${
              myContext.title === "Projects" ? "text-orange-400" : ""
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
            // onClick={() => menuHandler()}
            className={`text-5xl md:text-6xl ${
              myContext.menu ? "menu-item-show my-6" : "my-0"
            } ${
              myContext.title === "About" ? "text-orange-400" : ""
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
            // onClick={() => menuHandler()}
            className={`text-5xl md:text-6xl ${
              myContext.menu ? "menu-item-show my-6 " : "my-0"
            } ${
              myContext.title === "Contact" ? "text-orange-400" : ""
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
        {/* </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Nav;
