import Link from "next/link";
import Image from "next/image";

import { BsForward } from "react-icons/bs";
import { BsSkipStart } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { ImNewTab } from "react-icons/im";

const page = () => {
    return (
        <div className={`h-screen pl-8 lg:px-24 overflow-hidden w-full flex pt-32 gap-4`} >
            <div className={`flex-1 flex flex-col`}>
                <h1 className={`text-4xl my-4`} >Tetris Game Recreation</h1>
                <p className="my-2 text-2xl relative" >
                    <span className={`text-pink-700/20 dark:text-pink-400/80 text-4xl animate-ping absolute left-4`}>Try it!!!</span>
                    <span className={`text-pink-600 dark:text-pink-400 text-4xl absolute left-4`}>Try it!!!</span>
                    <span className={`ml-32 top-1 absolute`}>Use keyboard arrows to move the shapes...</span>
                </p>
                <p className="text-lg mt-16" >Venturing into the realm of classic gaming, I recreated the timeless Tetris using p5.js. This project is a testament to my skills in JavaScript and game development. Manipulate falling blocks, clear lines strategically, and aim for high scores in a Tetris experience that is both nostalgic and user-friendly. Although, the UI still needs improvements.</p>
                <Link href={`https://github.com/aryavaziri/Tetris_p5JS/`} target="_blank" className={`rounded text-2xl shadow-lg px-5 py-2 hover:bg-dark/20 hover:dark:bg-light/40 border mt-4 border-current mx-auto`} >Source Code</Link>
            </div>
            <div className={`flex-1 max-lg:max-w-[350px] lg:max-w-[450px] overflow-hidden px-2`}>
                <iframe
                    autoFocus
                    src="/tetris/index.html"
                    scrolling='no'
                    className="w-full h-[500px] overflow-hidden px-2"
                >
                </iframe>
            </div>
        </div>

    );
}

export default page;