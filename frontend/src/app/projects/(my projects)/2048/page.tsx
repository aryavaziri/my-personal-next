import Link from "next/link";
import Image from "next/image";

import { BsForward } from "react-icons/bs";
import { BsSkipStart } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { ImNewTab } from "react-icons/im";

const page = () => {
  return (
    <div
      className={`h-screen pl-8 lg:px-24 overflow-hidden w-full flex pt-32 gap-4`}
    >
      <div className={`flex-1 flex flex-col`}>
        <h1 className={`text-4xl my-4`}>2048 Game Recreation</h1>
        <p className="my-2 text-2xl relative">
          <span
            className={`text-pink-700/20 dark:text-pink-400/80 text-4xl animate-ping absolute left-4`}
          >
            Try it!!!
          </span>
          <span
            className={`text-pink-600 dark:text-pink-400 text-4xl absolute left-4`}
          >
            Try it!!!
          </span>
          <span className={`ml-32 top-1 absolute`}>
            Use keyboard arrows to make bigger numbers.
          </span>
        </p>
        <p className="text-lg mt-16">
          I took on the challenge of recreating the iconic puzzle game, 2048,
          entirely from scratch using HTML, CSS, and JavaScript. In this
          project, I leveraged my skills in front-end development to design and
          implement the game's 4x4 grid, numerical tiles, and swipe-based
          movements. The objective is simple yet challenging: combine tiles
          strategically to reach the coveted 2048 tile. This project not only
          demonstrates my proficiency in web development but also showcases my
          ability to tackle game design concepts.
        </p>
        <Link
          href={`/2048.html`}
          target="_blank"
          className="bg-black/10 dark:bg-light/20 hover:bg-black/20 dark:hover:bg-light/40 backdrop-blur rounded px-4 py-2 shadow-lg flex w-min whitespace-nowrap mx-auto "
        >
          Source Code
        </Link>
      </div>
      <div
        className={`flex-1 max-lg:max-w-[300px] lg:max-w-[450px] overflow-hidden px-2`}
      >
        <iframe
          autoFocus
          scrolling="no"
          src="/2048.html"
          className="w-full h-full px-2"
        ></iframe>
      </div>
    </div>
  );
};

export default page;
