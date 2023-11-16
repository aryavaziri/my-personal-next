'use client'
import React, { useState, useContext, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { Context } from "@app/Provider";
import Icon from "@components/Icon";
import { BiChevronRight, BiDotsVerticalRounded, BiEditAlt, BiX, BiInfoCircle } from "react-icons/bi";
import { isMobile } from "react-device-detect";
import Image from "next/image";
import Popup from "@components/Popup";
import Yesno from '@components/modals/Yesno'
import { gql, useMutation } from "@apollo/client";
import { Suspense } from 'react'

///heeree is the problem///
const MUTATION = gql`
mutation DelProject($projectId: ID!) {
  delProject(id:$projectId)
}`;



export const ProjectItem = ({ item, setHoveredItem, edit }) => {
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
  const [delProject, { data, loading, error }] = useMutation(MUTATION);

  const [deleteActive, setDeleteActive] = useState(false)
  const [infoActive, setInfoActive] = useState(false)

  if (loading) return 'Deleting...';
  if (data?.delProject === "Deleted Successfully") {
    return (
      <p className={`duration-[3000] text-rose-400 fade-out`}>Deleted successfully</p>
    )
  };
  if (error) return `Submission error! ${error.message}`;

  const onDeleteAnswer = async (answer) => {
    if (answer) {
      await delProject({ variables: { projectId: item._id } })
    }
  }
  const onEdit = (e) => {
    e.preventDefault()
    console.log("To edit", item._id)
    edit()
  }

  return (
    <>
      <Yesno active={deleteActive} setActive={setDeleteActive} onAnswer={onDeleteAnswer} placeholder={`Are you sure you want to delete this Project?`} />
      <Link href={`/static/projects/${item._id}${item.extention}`} className={`hidden`} />

      {/* <p className={`duration-[3000] text-rose-400 ${(data?.delProject === "Deleted Successfully") ? 'h-0' : 'h-16 hidden'}`}>{data?.delProject}</p> */}
      <Link href={`${item.link}`} target="_blank"
        className={`flex flex-col relative justify-between ${isMobile ? `max-sm:py-0 project-item-mobile` : ` py-2 `
          } hover:pl-8 project-item content-start`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >

        {isMobile && <ProjectMedia item={item} />}
        {/* <ProjectMedia item={item} /> */}
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
              return <Suspense key={item._id + tech} fallback={tech}>
                <Icon key={item._id + tech} item={tech} />
              </Suspense>
            })}
          </div>

          {myContext && <div className={`absolute ic2 right-[-2500px] py-3 h-12 flex`} >
            {/* {myContext?.user?.isAdmin && <div className={`absolute ic2 right-[-2500px] py-3 h-12 flex`} > */}
            {!details ?
              <button className={`h-full right-0 absolute top-0`} onClick={(e) => { e.preventDefault(); setDetails(true) }} >
                <BiDotsVerticalRounded className={`text-xl`} />
              </button>
              :
              <div className={`absolute h-full right-2 grid grid-cols-3 gap-2 place-items-center text-xl`} >
                <button className={`hover:text-2xl w-4 hover:text-sky-400`} onClick={(e) => { e.preventDefault(); setInfoActive(pre => !pre) }} ><BiInfoCircle /></button>
                <button className={`hover:text-2xl w-4 hover:text-green-400`} onClick={(e) => onEdit(e)} ><BiEditAlt /></button>
                <button className={`hover:text-2xl w-4 hover:text-rose-400`} onClick={(e) => { e.preventDefault(); setDeleteActive(true) }} ><BiX /></button>
              </div>
            }
          </div>}
        </div>
      </Link>
    </>
  );
};

export const ProjectMedia = ({ item }) => {
  const videoRef = useRef();
  useEffect(() => {
    videoRef.current?.load();
    // videoRef.src = `/static/projects/${item._id}${item.extention}`
  }, [item]);

  if (!item) {
    return <video className={`w-full object-cover h-full opacity-0`} />;
  }

  return (item.extention.toLowerCase() === "mov" || item.extention.toLowerCase() === "mp4" || item.extention.toLowerCase() === "mkv")
    ? (
      <video
        ref={videoRef}
        className={` object-cover aspect-video w-full ${isMobile ? `rounded-t-[30px]` : ``} `}
        autoPlay
        loop
        muted
        playsInline
      >
        {/* <source src={``} alt={item.title} type="video/mp4" /> */}
        <source src={`/static/projects/${item._id}.${item.extention}`} alt={item.title} type="video/mp4" />
      </video>
    ) : (
      <img
        className={` object-cover aspect-video ${isMobile ? `rounded-t-[30px] w-full` : `w-full`
          } `}
        src={`/static/projects/${item._id}.${item.extention}`}
        alt={item.title}
      />
    );
};
