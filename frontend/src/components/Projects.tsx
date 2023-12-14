"use client";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProjectItem, ProjectMedia } from "@components/ProjectItem";
import ProjectCard from "./ProjectCard";
import { Context } from "@app/Provider";
import { useQuery, useSuspenseQuery } from "@apollo/client";
import { gql } from "@../src/__generated__/gql";

const PROJECTS = gql(/* GraphQL */ `
  query projects2 {
    projects2 {
      _id
      title
      tech
      link
      video
      extention
      creator
    }
  }
`);

import type { Project } from "@../src/__generated__/graphql";

type data = {
  projects: Project[];
};

const Projects = ({ data }: { data: data }) => {
  const myContext = useContext(Context);
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<Project | null>(null);
  const [active, setActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Project | null>(null);
  const {
    error,
    data: projects2,
    refetch,
  } = useQuery(PROJECTS, { fetchPolicy: "network-only" });

  useEffect(() => {
    data?.projects.forEach((item) => {
      router.prefetch(`/static/projects/${item._id}.${item.extention}`);
    });
  }, [data]);

  return (
    <>
      {" "}
      <div
        className={`pr-4 pl-6 sm:pl-20 md:pl-36 lg:pl-56 backdrop-blur z-[4] w-3/5 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl fixed pt-6 sm:pt-10 ${
          myContext.isMobile ? `md:pl-48` : `md:bottom-[70vh]`
        }`}
      >
        <h1 className="whitespace-nowrap pb-2 border-b-4 border-current w-min ">
          Projects
        </h1>
      </div>
      <div
        className={`${
          myContext.isMobile
            ? `top-20 sm:top-24 w-[92%] sm:w-[90%] inset-x-0 h-[calc(100%-80px)] sm:h-[calc(100%-96px)] pt-2`
            : `top-[32vh] max-h-[60vh]  md:w-2/5 pl-2 sm:pl-20 md:pl-36 lg:pl-56`
        }
        fixed z-30 mx-auto overflow-y-scroll overflow-x-clip flex noscroll-bar`}
      >
        <div
          className={`${
            myContext.isMobile
              ? `grid gap-12 sm:gap-8 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-20`
              : `w-full`
          }  min-h-content noscroll-bar `}
        >
          {data?.projects &&
            data.projects.map((item) => (
              <ProjectItem
                setHoveredItem={setHoveredItem}
                item={item}
                key={item._id as React.Key}
                edit={() => {
                  setActive(true);
                  setSelectedItem(item);
                }}
              />
            ))}
          {myContext.isAuth &&
            projects2?.projects2?.map((item) => (
              <ProjectItem
                setHoveredItem={setHoveredItem}
                item={item as Project}
                key={item?._id}
                edit={() => {
                  setActive(true);
                  setSelectedItem(item! as Project);
                }}
              />
            ))}

          <div className={`z-[5] pb-6`}>
            {active ? (
              <div
                className={`grid place-items-center fixed top-0 backdrop-blur-md bg-light/80 dark:bg-dark/70 left-0 h-screen w-screen justify-center`}
              >
                <div className={`relative`}>
                  <ProjectCard
                    close={() => {
                      // refetch();
                      setActive(false);
                    }}
                    item={selectedItem}
                  />
                </div>
              </div>
            ) : myContext.isAuth ? (
              <div
                className={`text-center cursor-pointer text-2xl`}
                onClick={() => {
                  setSelectedItem(null);
                  setActive(true);
                }}
              >
                + Add your own
              </div>
            ) : (
              <button
                onClick={() => {
                  myContext.setLoginModal(true);
                }}
              >
                Login to add your project here.
              </button>
            )}
          </div>
          {/* <button onClick={() => refetch()} >refetch</button> */}
          {myContext.isMobile && <div className="h-20" />}
        </div>
      </div>
      {!myContext.isMobile && hoveredItem && hoveredItem._id && (
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
