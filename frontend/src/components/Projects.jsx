"use client";
import dynamic from "next/dynamic";
import { useState, useContext, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { ProjectItem, ProjectMedia } from "@components/ProjectItem";


const Projects = () => {
  const items = dynamic(async () => {

    const response = await fetch(`http://localhost:3000/graphql`, {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          // authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjMzM2VmODg1ZjljNmVkZTM1ODk4YyIsImlhdCI6MTY5Mzg0NTkwNCwiZXhwIjoxNjk0NzA5OTA0fQ.MC7OgffHGeWXH69jPByFO4WovqxaRm970IByyYwk6O0`,
        },
        body: JSON.stringify({
          query: `{ projects { title dev link src } }`,
        }),
      })
      const data = await response.json()
      return data
    })

  console.log(items);
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <>
      <div
        className={`${
          isMobile
            ? `top-28 w-[95%] sm:w-[90%] max-md:inset-x-0 `
            : `top-[30vh] h-[70vh]  md:w-2/5 pl-2 sm:pl-20 md:pl-36 lg:pl-56`
        } 
        fixed mx-auto overflow-y-scroll noscroll-bar flex`}
      >
        <div
          className={`${
            isMobile
              ? `grid gap-16 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
              : `w-full`
          } noscroll-bar`}
        >
          {/* <button onClick={() => fetchData()}>FETCH</button> */}
          <ProjectItem
            setHoveredItem={setHoveredItem}
            item={{
              title: "CASINOA",
              dev: ["django", "react", "redux", "postgres"],
              link: "/projects",
              src: "/images/poker.MOV",
              video: true,
            }}
          />
          <ProjectItem
            setHoveredItem={setHoveredItem}
            item={{
              title: "REFRAME",
              dev: ["unity", "csharp"],
              link: "/projects",
              src: "/images/ref.MOV",
              video: true,
            }}
          />
          <ProjectItem
            setHoveredItem={setHoveredItem}
            item={{
              title: "TETRIS",
              dev: ["p5js"],
              link: "/projects",
              video: true,
              src: "/images/tetris.MOV",
            }}
          />
          <ProjectItem
            setHoveredItem={setHoveredItem}
            item={{
              title: "ToDoList",
              dev: ["next", "nodejs", "graphql"],
              link: "/projects",
              src: "/images/2048.MOV",
              video: true,
            }}
          />
          <ProjectItem
            setHoveredItem={setHoveredItem}
            item={{
              title: "2048",
              dev: ["js"],
              link: "/projects",
              src: "/images/2048.MOV",
              video: true,
            }}
          />
          <ProjectItem
            setHoveredItem={setHoveredItem}
            item={{
              title: "2048",
              dev: ["js"],
              link: "/projects",
              src: "/images/2048.MOV",
              video: true,
            }}
          />
          <ProjectItem
            setHoveredItem={setHoveredItem}
            item={{
              title: "2048",
              dev: ["js"],
              link: "/projects",
              src: "/images/2048.MOV",
              video: true,
            }}
          />
          <ProjectItem
            setHoveredItem={setHoveredItem}
            item={{
              title: "2048",
              dev: ["js"],
              link: "/projects",
              src: "/images/2048.MOV",
              video: true,
            }}
          />
          <ProjectItem
            setHoveredItem={setHoveredItem}
            item={{
              title: "2048",
              dev: ["js"],
              link: "/projects",
              src: "/images/2048.MOV",
              video: true,
            }}
          />
        </div>
      </div>
      {!isMobile && hoveredItem && (
        <div
          className={`max-md:top-32 md:bottom-0 w-[90%] mx-auto md:w-3/5 overflow-hidden aspect-video z-[5] fixed max-md:inset-0 md:right-0 bottom-0 rounded-tl-[30px] 
          `}
        >
          <ProjectMedia item={hoveredItem} />
        </div>
      )}
    </>
  );
};

export default Projects;
