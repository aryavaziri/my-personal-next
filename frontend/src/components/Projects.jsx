"use client";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isMobile } from "react-device-detect";
import { ProjectItem, ProjectMedia } from "@components/ProjectItem";
import ProjectCard from "./ProjectCard"
import { AiOutlineClose } from "react-icons/ai";
import { Suspense } from 'react'

const Projects = ({ data }) => {
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [active, setActive] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  // const edit = ()=>{setActive(true)}
  useEffect(() => {
    data?.projects.forEach(item => {
      router.prefetch(`/static/projects/${item._id}.${item.extention}`);
    });
  }, [data]);

  return (
    <>
      <div
        className={`${isMobile
          ? `top-28 w-[95%] sm:w-[90%] max-md:inset-x-0 `
          : `top-[32vh] max-h-[60vh]  md:w-2/5 pl-2 sm:pl-20 md:pl-36 lg:pl-56`
          } 
        fixed z-30 mx-auto overflow-y-scroll overflow-x-clip flex noscroll-bar`}
      >
        <div
          className={`${isMobile
            ? `grid gap-16 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
            : `w-full`
            }  min-h-content noscroll-bar `}
        >
          <Suspense fallback={"LOADING"}>
            {data?.projects && data.projects.map(item => (
              <ProjectItem
                setHoveredItem={setHoveredItem}
                item={item}
                key={item._id}
                edit={() => { setActive(true); setSelectedItem(item) }}
              />
            ))}
          </Suspense>

          <div className={`z-[5]`}>
            {active ?
              <div className={`grid place-items-center fixed top-0 backdrop-blur-md left-0 h-screen w-screen justify-center`}>
                <div className={`relative`} >
                  <ProjectCard close={() => setActive(false)} item={selectedItem} />
                  <div className={`absolute top-4 right-4 text-sm text-slate-300/60 cursor-pointer`} onClick={() => setActive(false)} ><AiOutlineClose /></div>
                </div>
              </div>
              : <div className={`text-center cursor-pointer`} onClick={() => { setSelectedItem(null); setActive(true) }} >+ Add your own</div>
            }
          </div>
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
