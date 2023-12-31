// "use client";
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  RefObject,
} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Context } from "@app/Provider";
import Icon from "@components/Icon";
import {
  BiChevronRight,
  BiDotsVerticalRounded,
  BiEditAlt,
  BiX,
  BiInfoCircle,
} from "react-icons/bi";
import Image from "next/image";
import Yesno from "@components/modals/Yesno";
import { useMutation } from "@apollo/client";
import { gql } from "@__generated__";
import { Suspense } from "react";
import OK from "./modals/OK";

const MUTATION = gql(`
mutation DelProject($projectId: ID!) {
  delProject(id:$projectId)
}`);
import type { Project } from "@../src/__generated__/graphql";

type Props = {
  item: Project;
  // setHoveredItem: React.Dispatch<React.SetStateAction<Project>>;
  setHoveredItem: (item: Project) => void;
  // setHoveredItem: any;
  edit: () => void;
};

export const ProjectItem: React.FC<Props> = ({
  item,
  setHoveredItem,
  edit,
}) => {
  const myContext = useContext(Context);
  const [isHover, setIsHover] = useState(false);
  const [details, setDetails] = useState(false);
  const [errMode, setErrMode] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const handleMouseEnter = () => {
    setHoveredItem(item! as Project);
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setHoveredItem({} as Project);
    setIsHover(false);
    setDetails(false);
  };
  const [delProject, { data, loading, error: delErr, reset }] =
    useMutation(MUTATION);

  const [deleteActive, setDeleteActive] = useState(false);
  const [infoActive, setInfoActive] = useState(false);

  // if (loading) return 'Deleting...';
  if (data?.delProject === "Deleted Successfully") {
    setDeleted(true);
    reset();
  }

  const onDeleteAnswer = async (answer: boolean) => {
    if (answer) {
      try {
        await delProject({ variables: { projectId: item._id } });
      } catch (err) {
        console.log(err);
        setErrMode(true);
      }
    }
  };

  const onEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("To edit", item._id);
    edit();
  };
  // useEffect(() => {
  //   console.log(myContext?.user?._id && myContext?.user?._id == item.creator);
  //   console.log(process.env.NODE_ENV)
  //   console.log(item?.creator)
  // }, [myContext]);

  return (
    // (deleted) ? <p className={`duration-[3000] text-rose-400 `}>Deleted successfully</p> :
    deleted ? (
      <p className={`duration-[3000] text-rose-400 fade-out`}>
        Deleted successfully
      </p>
    ) : loading ? (
      <p>Deleting...</p>
    ) : (
      <>
        <OK
          active={errMode}
          setActive={setErrMode}
          message={delErr?.message}
        />
        <Yesno
          active={deleteActive}
          setActive={setDeleteActive}
          onAnswer={onDeleteAnswer}
          placeholder={`Are you sure you want to delete this Project?`}
        />
        <Link
          href={`/static/projects/${item._id}${item.extention}`}
          className={`hidden`}
        />

        <Link
          href={`${item.link}`}
          target="_blank"
          className={`flex flex-col relative justify-between ${
            myContext.isMobile
              ? `max-sm:py-0 project-item-mobile`
              : `hover:pl-8 py-2`
          } project-item content-start`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {myContext.isMobile && <ProjectMedia item={item} />}
          <div
            className={`flex flex-row relative h-18 justify-between w-full project-item content-start border-b-2 border-current ${
              myContext.isMobile
                ? `rounded-b-[30px] p-4 border-b project-item-mobile`
                : ``
            }`}
          >
            <div className="text-3xl flex left h-12 ">
              <div className="w-10 overflow-hidden flex items-center max-sm:hidden">
                <BiChevronRight className="" />
              </div>
              <div className={`max-sm:text-4xl`}>{item.title}</div>
            </div>
            {!myContext.isMobile && (
              <div className="absolute ic right-[250%] py-3 h-12 flex flex-row-reverse gap-1">
                {item.tech?.map((tech) => {
                  return (
                    <Icon
                      key={item._id + tech}
                      item={tech ?? ""}
                    />
                  );
                })}
              </div>
            )}

            {((myContext?.user?._id && myContext?.user?._id == item.creator) ||
              myContext?.user?.isAdmin) && (
              <div
                className={`sm:absolute ic2 right-0 top-0 relative max-sm:w-auto sm:right-[-2500px] sm:py-3 h-12 max-sm:flex-1`}
              >
                {!details ? (
                  <button
                    className={`sm:w-4 h-full right-0 md:right-2 absolute top-0`}
                    onClick={(e) => {
                      e.preventDefault();
                      setDetails(true);
                    }}
                  >
                    <BiDotsVerticalRounded className={`text-4xl sm:text-xl`} />
                  </button>
                ) : (
                  <div
                    className={`absolute h-full right-0 md:right-2 grid grid-cols-3 gap-2 place-items-center text-xl`}
                  >
                    <button
                      className={`${
                        myContext.isMobile
                          ? " text-4xl"
                          : "hover:text-2xl hover:text-sky-400"
                      } sm:w-4 `}
                      onClick={(e) => {
                        e.preventDefault();
                        setInfoActive((pre) => !pre);
                      }}
                    >
                      <BiInfoCircle />
                    </button>
                    <button
                      className={`${
                        myContext.isMobile
                          ? " text-4xl"
                          : "hover:text-2xl hover:text-green-400"
                      } sm:w-4 `}
                      onClick={(e) => onEdit(e)}
                    >
                      <BiEditAlt />
                    </button>
                    <button
                      className={`${
                        myContext.isMobile
                          ? " text-4xl"
                          : "hover:text-2xl hover:text-rose-400"
                      } sm:w-4 `}
                      onClick={(e) => {
                        e.preventDefault();
                        setDeleteActive(true);
                      }}
                    >
                      <BiX />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Link>
      </>
    )
  );
};

export const ProjectMedia = ({ item }: { item: Project | null }) => {
  const myContext = useContext(Context);
  const videoRef: RefObject<HTMLVideoElement> = myContext.isMobile
    ? (null as any)
    : useRef<HTMLVideoElement>();
  let src;
  item &&
    (src = `${
      process.env.NODE_ENV == "development" ? "https://aryav.nl" : ""
    }/static/projects/${item?._id}.${item?.extention}`);

  useEffect(() => {
    item?._id && videoRef?.current?.load();
  }, [item]);

  if (!item) {
    return <video className={`w-full object-cover h-full opacity-0`} />;
  }

  return item.extention?.toLowerCase() === "mov" ||
    item.extention?.toLowerCase() === "mp4" ||
    item.extention?.toLowerCase() === "mkv" ? (
    <video
      ref={videoRef}
      className={`object-cover aspect-video w-full ${
        myContext.isMobile ? `rounded-t-[30px]` : ``
      }`}
      autoPlay
      loop
      muted
      playsInline
    >
      <source
        src={src}
        type="video/mp4"
      />
    </video>
  ) : (
    <img
      className={`object-cover aspect-video w-full ${
        myContext.isMobile ? `rounded-t-[30px]` : ``
      }`}
      src={src}
      alt={item.title}
    />
  );
};
