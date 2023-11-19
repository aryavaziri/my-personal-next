"use client";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ProjectItem, ProjectMedia } from "@components/ProjectItem";
import ProjectCard from "./ProjectCard"
import { AiOutlineClose } from "react-icons/ai";
import { Suspense } from 'react'
import { Context } from "@app/Provider";
import { gql, useQuery, useSuspenseQuery } from "@apollo/client";

const PROJECTS = gql`query {projects2{_id title tech link video extention creator}}`



const Projects = ({ data }) => {
  const myContext = useContext(Context)
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [active, setActive] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const { error, data: projects2, refetch } = useSuspenseQuery(PROJECTS, { fetchPolicy: 'network-only' });


  useEffect(() => {
    data?.projects.forEach(item => {
      router.prefetch(`/static/projects/${item._id}.${item.extention}`);
    });
  }, [data]);

  return (
    <>
      <div
        className={`${myContext.isMobile
          ? `top-20 sm:top-24 w-[92%] sm:w-[90%] max-md:inset-x-0 h-[calc(100%-80px)] sm:h-[calc(100%-96px)] pt-2`
          : `top-[32vh] max-h-[60vh]  md:w-2/5 pl-2 sm:pl-20 md:pl-36 lg:pl-56`
          } 
        fixed z-30 mx-auto overflow-y-scroll overflow-x-clip flex noscroll-bar`}
      >
        <div
          className={`${myContext.isMobile
            ? `grid gap-12 sm:gap-8 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
            : `w-full`
            }  min-h-content noscroll-bar `}
        >
          {data?.projects && data.projects.map(item => (
            <ProjectItem
              setHoveredItem={setHoveredItem}
              item={item}
              key={item._id}
              edit={() => { setActive(true); setSelectedItem(item) }}
            />
          ))}
          {myContext.isAuth && projects2?.projects2?.map(item => (
            <ProjectItem
              setHoveredItem={setHoveredItem}
              item={item}
              key={item._id}
              edit={() => { setActive(true); setSelectedItem(item) }}
            />
          ))}


          <div className={`z-[5] pb-6`}>
            {active ?
              <div className={`grid place-items-center fixed top-0 backdrop-blur-md bg-light/80 dark:bg-dark/70 left-0 h-screen w-screen justify-center`}>
                <div className={`relative`} >
                  <ProjectCard close={() => { refetch(); setActive(false) }} item={selectedItem} />
                </div>
              </div>
              : myContext.isAuth ? <div className={`text-center cursor-pointer text-2xl`} onClick={() => { setSelectedItem(null); setActive(true) }} >+ Add your own</div> : <p>Login to add your project here.</p>
            }
          </div>
          {/* <button onClick={() => refetch()} >refetch</button> */}
        </div>
      </div>
      {!myContext.isMobile && hoveredItem && (
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
