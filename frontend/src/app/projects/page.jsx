'use client'
import React, { useState, useContext, useEffect } from "react";
import { Context } from "@app/Provider";
import { isMobile } from "react-device-detect";

import { ProjectItem, ProjectMedia } from "@components/ProjectItem";

function page() {
    const myContext = useContext(Context);
    const [hoveredItem, setHoveredItem] = useState(null);
  useEffect(() => {
    hoveredItem && console.log(hoveredItem.title);
  }, [hoveredItem]);
  return (
    <div
      className={`$ relative h-screen w-screen font-custom2 px-4 sm:px-16 md:px-24 duration-500 overflow-hidden `}
    >
      <h1
        className={`fixed px-4 pt-10 text-4xl sm:text-6xl font-bold border-inherit text-shadow pb-6 w-3/5`}
      >
        Projects
      </h1>
      <div
        className={`${
          isMobile
            ? `top-28 w-[95%] sm:w-[90%] `
            : `max-md:h-[calc(100%-(50vw+130px))] md:aspect-video w-full md:w-[45%]`
        } 
        fixed max-md:inset-x-0 md:left-12 mx-auto bottom-0 overflow-y-scroll  noscroll-bar flex justify-between`}
      >
        <div
          className={`${
            isMobile
              ? `grid gap-16 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-min`
              : `mr-4 w-full`
          } noscroll-bar`}
        >
          <ProjectItem
            setHoveredItem={setHoveredItem}
            item={{
              title: "CASINOA",
              dev: "Django / React",
              link: "/projects",
              src: "/images/poker.MOV",
              video: true,
            }}
          />
          <ProjectItem
            setHoveredItem={setHoveredItem}
            item={{
              title: "REFRAME",
              dev: "Unity / VR",
              link: "/projects",
              src: "/images/ref.MOV",
              video: true,
            }}
          />
          <ProjectItem
            setHoveredItem={setHoveredItem}
            item={{
              title: "TETRIS",
              dev: "p5js",
              link: "/projects",
              video: true,
              src: "/images/tetris.MOV",
            }}
          />
          <ProjectItem
            setHoveredItem={setHoveredItem}
            item={{
              title: "2048",
              dev: "Javascript",
              link: "/projectsr",
              src: "/images/2048.MOV",
              video: true,
            }}
          />
        </div>
      </div>
      {!isMobile && hoveredItem && (
        <div
          className={`max-md:top-32 md:bottom-0 w-[90%] mx-auto md:w-1/2 overflow-hidden aspect-video fixed max-md:inset-0 md:right-0 bottom-0 rounded-tl-[30px] 
          `}
        >
          <ProjectMedia item={hoveredItem ? hoveredItem : null} />
        </div>
      )}
    </div>
  );
}

export default page;