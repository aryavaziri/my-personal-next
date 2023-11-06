'use client'
import React, { useState, useContext, useEffect, useRef } from "react";
import Link from "next/link";
import { Context } from "@app/Provider";
import Icon from "@components/Icon";
import { BiChevronRight, BiDotsVerticalRounded, BiEditAlt, BiX, BiInfoCircle } from "react-icons/bi";
import { isMobile } from "react-device-detect";
import Image from "next/image";
import Popup from "@components/Popup";

export const ProjectItem = ({ item, setHoveredItem }) => {
  const myContext = useContext(Context);
  const [isHover, setIsHover] = useState(false);
  const [details, setDetails] = useState(false);
  const handleMouseEnter = () => {
    setHoveredItem(item);
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
    setIsHover(false);
    setDetails(false)
  };

  return (
    <Link href={`${item.link}`}
      className={`flex flex-col relative justify-between ${isMobile ? `max-sm:py-0 project-item-mobile` : `max-md:border-b py-2 `
        } hover:pl-8 project-item content-start`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isMobile && <ProjectMedia item={item} />}
      <div
        className={`flex flex-row relative h-18 justify-between w-full ${isMobile
          ? `rounded-b-[30px] p-4 border-b project-item-mobile`
          : ` `
          } project-item content-start border-b-2 border-current `}
      >
        <div className="text-3xl flex left h-12 ">
          <div className="w-10 overflow-hidden flex items-center max-sm:hidden">
            <BiChevronRight className="" />
          </div>
          <div className={``} >{item.title}</div>
        </div>
        <div className="absolute ic right-[250%] py-3 h-12 flex flex-row-reverse gap-1" >
          {!isMobile && item.tech?.map(tech => {
            return <Icon key={tech} item={tech} />
          })}
        </div>

        <div className={`absolute ic2 right-[-2500px] py-3 h-12 flex`}  onClick={(e) => { e.preventDefault()}} >
          {!details ?
            <button className={`h-full right-0 absolute top-0`} onClick={(e) => { e.preventDefault(); setDetails((prev) => { return !prev }) }} >
              <BiDotsVerticalRounded className={`text-xl`} />
            </button>
            :
            <div className={`absolute h-full right-2 grid grid-cols-3 gap-2 place-items-center text-xl`} >
              <button className={`hover:text-2xl w-4 hover:text-sky-400`}><BiInfoCircle /></button>
              <button className={`hover:text-2xl w-4 hover:text-green-400`}><BiEditAlt /></button>
              <button className={`hover:text-2xl w-4 hover:text-rose-400`}>
                <Popup placeholder={<BiX />} className={`z-[5]`} >
                  <div onClick={()=>{close}}>cancel or close</div>
                </Popup>
              </button>
            </div>
          }
        </div>
      </div>
    </Link>
  );
};

export const ProjectMedia = ({ item }) => {
  const videoRef = useRef();
  useEffect(() => {
    videoRef.current?.load();
  }, [item]);
  if (!item) {
    return <video className={`w-full object-cover h-full opacity-0`}></video>;
  }

  return item.video ? (
    <video
      ref={videoRef}
      className={` object-cover aspect-video ${isMobile ? `rounded-tr-[30px] w-full` : `w-full`
        } rounded-tl-[30px] max-md:rounded-tr-[30px]`}
      autoPlay
      loop
      muted
      playsInline
    >
      <source src={`http://localhost:3000/static/${item._id}${item.extention}`} alt={item.title} type="video/mp4" />
    </video>
  ) : (
    <img
      className={` object-cover aspect-video ${isMobile ? `rounded-tr-[30px] w-full` : `w-full`
        } rounded-tl-[30px] `}
      src={`http://localhost:3000/static/${item._id}${item.extention}`}
      alt={item.title}
    />
  );
};
