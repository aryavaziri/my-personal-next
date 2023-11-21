import Link from "next/link";
import Image from "next/image";

import { BsForward } from "react-icons/bs";
import { BsSkipStart } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { ImNewTab } from "react-icons/im";

const page = () => {
    return (
        <div className={`h-screen pl-8 overflow-hidden w-full flex pt-32 gap-4`} >
            <div className={`flex-1 flex flex-col`}>
                <h1 className={`text-3xl my-4`} >2048 Game Recreation</h1>
                <p>I took on the challenge of recreating the iconic puzzle game, 2048, entirely from scratch using HTML, CSS, and JavaScript. In this project, I leveraged my skills in front-end development to design and implement the game's 4x4 grid, numerical tiles, and swipe-based movements. The objective is simple yet challenging: combine tiles strategically to reach the coveted 2048 tile. This project not only demonstrates my proficiency in web development but also showcases my ability to tackle game design concepts.</p>
                <Link href={`view-source:https://aryav.nl/2048.html`} target="_blank" className={`rounded-lg px-4 py-1 border mt-4 border-current mx-auto`} >Check the Source Code</Link>
            </div>
            <div className={`flex-1 max-lg:max-w-[300px] px-2`}>
                <iframe
                    src="/2048.html"
                    className="w-full h-[1200px] px-2"
                >
                </iframe>
            </div>
        </div>

    );
}

export default page;