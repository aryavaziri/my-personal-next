import Link from "next/link";
import Image from "next/image";
import { MdDownload } from "react-icons/md";
import { HiOutlineExternalLink } from "react-icons/hi";

const page = () => {
  return (
    <div className="min-h-screen h-full flex flex-col ">
      <div className="pr-4 pl-2 sm:pl-20 md:pl-36 lg:pl-56 backdrop-blur z-[4] w-3/5 sm:w-full font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl fixed pt-6 sm:pt-24 md:pt-32">
        <h1 className="whitespace-nowrap pb-2 border-b-4 border-current w-min mb-4">
          About me
        </h1>
      </div>
      <div className="flex pb-8 sm:pb-20">
        <div className="z-[3] pt-24 sm:pt-40 md:pt-56 lg:pt-60 pl-2 sm:pl-20 md:pl-36 lg:pl-56 w-[60vw] sm:w-[62vw] md:w-[65vw] lg:w-[65vw] text-justify md:w-2/3 text-md sm:text-lg md:text-2xl">
          <p>Hey there! I'm just a regular guy who took the road less traveled. Formerly an industrial automation engineer, PLC programmer, and all-around maker, I decided to embrace the digital world as a developer. But don't worry, I didn't leave my old skills behind; instead, I fused them with the magic of digitalization to help designers bring their wildest ideas to life! When I'm not coding up a storm, you'll find me exploring every nook and cranny of this beautiful planet. I'm a total travel junkie and a nature enthusiast. If you want a glimpse into my personal life, hop on over to my Instagram account. So, whether you need a helping hand in the digital realm or want some travel inspiration, I've got you covered. Let's build, explore, and create some amazing things together!</p>
          <div className="text-xl sm:text2xl max-sm:flex-col max-sm:gap-2 flex justify-evenly w-full sm:px-4 md:px-12 my-3 sm:my-6">
            <Link className="rounded-md px-2 sm:px-6 py-1 sm:py-2 text-light dark:text-dark dark:bg-light/80 dark:hover:bg-light bg-dark/80 hover:bg-dark backdrop-blur shadow-lg flex gap-2 justify-center mx-6" href={`/CV.pdf`} rel="noopener noreferrer" target="_blank" >
              <MdDownload className={`mt-1 text-2xl animate-bounce`} />
              <p>Download CV</p>
            </Link>
            <Link className="rounded-md px-2 sm:px-6 py-1 sm:py-2 text-light dark:text-dark dark:bg-light/80 dark:hover:bg-light bg-dark/80 hover:bg-dark backdrop-blur shadow-lg flex gap-2 justify-center mx-6" href={`/projects`} >
              <p>Projects</p>
            </Link>
          </div>
          {/* <br /> */}
          <p className="my-2">
            If you're curious to learn more about my background, including my
            previous experiences, feel free to explore my earlier website by
            clicking the link below:
          </p>
          <div className="flex justify-center mt-6">
            <Link className="text-xl rounded-md px-2 sm:px-6 py-2 text-light dark:text-dark dark:bg-light/80 dark:hover:bg-light bg-dark/80 hover:bg-dark backdrop-blur shadow-lg flex gap-3" href={`https://v1.aryav.nl`} >
              <p>My Previous Website</p>
              <HiOutlineExternalLink className={`mt-[6px]`} />
            </Link>
          </div>
        </div>
        <div className="fixed sm:self-end z-[2] sm:z-[4] bg-right bottom-0 right-0 h-screen w-screen sm:w-1/2 md:w-1/4 lg:w-1/5 max-h-[100vh]">
          <Image
            className={`md:object-cover object-contain object-right-bottom imgLight dark:hidden`}
            src="/images/light.png"
            fill
            alt="Profile picture"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Image
            className={`md:object-cover object-contain object-right-bottom hidden dark:block`}
            src="/images/dark.png"
            fill
            alt="Profile picture"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
