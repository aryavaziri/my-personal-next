'use client'
import React, { useState, useContext, useEffect, useRef } from "react";
import Link from "next/link";
import { Context } from "@app/Provider";
import { BiChevronRight } from "react-icons/bi";
import { isMobile } from "react-device-detect";

export const ProjectItem = ({ item, setHoveredItem }) => {
  const myContext = useContext(Context);
  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => {
    setHoveredItem(item);
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
    setIsHover(false);
  };

  return (
    <Link href={item.link} 
        className={`flex flex-col relative justify-between ${
          isMobile ? `max-sm:py-0 project-item-mobile` : `max-md:border-b py-2 `
        } hover:pl-10 project-item content-start`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isMobile && <ProjectMedia item={item} />}
        <div
          className={`flex flex-row relative h-18 justify-between ${
            isMobile
              ? `rounded-b-[30px] p-4 border-b project-item-mobile`
              : ` hover:pl-8`
          } project-item content-start border-b-2
      ${myContext.theme ? `border-slate-800 drop-shadow-2xl` : `border-c1`}`}
        >
          <div className="text-4xl flex left h-12 ">
            <div className="w-10 overflow-hidden flex items-center max-sm:hidden">
              <BiChevronRight className="" />
            </div>
            <div>{item.title}</div>
          </div>
          <div className="text-2xl right h-8 self-end justify-self-end">
            {item.dev}
          </div>
        </div>{" "}
     </Link>
  );
};

export const ProjectMedia = ({ item }) => {
  const videoRef = useRef();
  useEffect(() => {
    console.log(item);
    videoRef.current?.load();
  }, [item]);
  if (!item) {
    return <video className={`w-full object-cover h-full opacity-0`}></video>;
  }

  return item.video ? (
    <video
      ref={videoRef}
      className={` object-cover aspect-video ${
        isMobile ? `rounded-tr-[30px] w-full` : `w-full`
      } rounded-tl-[30px] max-md:rounded-tr-[30px]`}
      autoPlay
      loop
      muted
      playsInline
    >
      <source src={item.src} alt={item.title} type="video/mp4" />
    </video>
  ) : (
    <img
      className={` object-cover aspect-video ${
        isMobile ? `rounded-tr-[30px] w-full` : `w-full`
      } rounded-tl-[30px] `}
      src={item.src}
      alt={item.title}
    />
  );
};
