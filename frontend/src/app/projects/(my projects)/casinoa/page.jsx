import Link from "next/link";
import Image from "next/image";

import { BsForward } from "react-icons/bs";
import { BsSkipStart } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { ImNewTab } from "react-icons/im";

const page = () => {
    return (
        <div className={`pb-8`} >
            <div className="rounded-b-[50px] relative w-full overflow-hidden h-[50vh]" >
                <div className={`w-full h-full`} >
                    <Image
                        className="object-cover "
                        src='/images/Casinoa.jpg'
                        alt="CASINOA"
                        fill
                    />
                </div>
            </div>

            <div className={`pt-10 sticky top-0 backdrop-blur-md`} >
                <h1 className={`mx-20 text-center pb-4 text-4xl sm:text-5xl font-bold border-b-2 border-dark dark:border-light sticky top-0 backdrop-blur-md`} >
                    CASINOA, Online poker
                </h1>
            </div>
            <div className={`md:px-20`} >
                <div className="flex sm:justify-between max-md:flex-col my-6">
                    <div className="basis-2/5 flex flex-col gap-2 p-2">
                        <div className="flex gap-2 items-baseline">
                            <div className={`flex-none w-32 font-bold text-right text-xl`} >
                                Techsnologies:
                            </div>
                            <div className="px-2">
                                Django / Python / React / Postgresql / NGINX / Redis / Redux / Docker
                            </div>
                        </div>
                        <div className="flex gap-2 items-baseline">
                            <div className={`flex-none w-32 font-bold text-right text-xl`} >
                                Date:
                            </div>
                            <div className="px-2">Nov 2022 - Jun 2023</div>
                        </div>
                    </div>
                    <div className="basis-3/5 p-2 font-medium text-2xl">
                        Casinoa, is a dynamic and interactive platform built using Django and React. The project leverages the Django framework on the server-side, handling the game logic, database management, and user authentication. React, on the other hand, powers the dynamic frontend, delivering a seamless and responsive user interface.
                    </div>
                </div>
                <div className="my-12">
                    <div
                        className={` border-b-2 border-dark dark:border-light text-3xl p-2 font-bold mb-6`}
                    >
                        Concept
                    </div>
                    <p className="text-2xl">
                        The backend of the application is powered by Django, a Python-based framework known for its robustness and versatility. Django offers a convenient solution for implementing AI bots and managing the underlying database, making it an ideal choice for creating a platform that can support the development of an AI player.
                        <br /> While the AI player development is still in progress, the current iteration of the Poker Web Application offers an exciting multiplayer experience with virtual currency. Users can create personalized accounts, participate in multiplayer games, and compete against friends or other players online.
                        <br /> By providing a platform for multiplayer gameplay, this project allows players to engage in exciting poker matches using virtual money. This multiplayer functionality serves as a foundation for gathering valuable data, which will be instrumental in refining the AI player's strategy and improving its performance over time.
                    </p>
                </div>
                <div className="my-8">
                    <div
                        className={` border-b-2 border-dark dark:border-light text-3xl p-2 font-bold `}
                    >
                        Key Features
                    </div>
                    <ul className="mt-4 sm:pt-6 gap-4 flex flex-col">
                        <li className="w-full flex flex-col sm:flex-row items-baseline">
                            <div
                                className={`w-full sm:w-1/4 sm:text-end px-4 text-2xl font-semibold `}
                            >
                                JSON Web Token
                            </div>
                            <div className="w-full sm:w-3/4 justify">
                                provide a secure and password-free authentication method for apps.
                                With JWT, sensitive user credentials are never stored, reducing
                                the risk of data breaches. Tokens contain encrypted authentication
                                data, eliminating the need for frequent database queries. JWT
                                ensures secure access to protected resources and improves app
                                scalability.
                            </div>
                        </li>
                        <li className="w-full flex flex-col sm:flex-row items-baseline">
                            <div
                                className={`w-full sm:w-1/4 sm:text-end px-4 text-2xl font-semibold `}
                            >
                                Docker
                            </div>
                            <div className="w-full sm:w-3/4 justify">
                                Using Docker to containerize your app has numerous advantages. It
                                enables easy and quick installation on servers, making deployment
                                faster. With one line of code, anyone can install the open-source
                                application on their server. Docker ensures consistent
                                environments, promotes development conventions, and simplifies
                                scaling.
                            </div>
                        </li>
                        <li className="w-full flex flex-col sm:flex-row items-baseline">
                            <div
                                className={`w-full sm:w-1/4 sm:text-end px-4 text-2xl font-semibold `}
                            >
                                Redux
                            </div>
                            <div className="w-full sm:w-3/4 justify">
                                By combining Redux with React, you have achieved a scalable, fast,
                                and well-structured application. Redux reduces server pressure,
                                optimizes resource usage, and provides a predictable state
                                management approach. This combination enhances performance,
                                facilitates code organization, and promotes code reusability.
                            </div>
                        </li>
                        <li className="w-full flex flex-col sm:flex-row items-baseline">
                            <div
                                className={`w-full sm:w-1/4 sm:text-end px-4 text-2xl font-semibold `}
                            >
                                Web-Sockets
                            </div>
                            <div className="w-full sm:w-3/4 justify">
                                By using Django Channels and Redis, your multiplayer game
                                application benefits from real-time communication through
                                websockets. Players can engage in a live chatroom and receive
                                updates from the PostgreSQL database.
                            </div>
                        </li>
                    </ul>
                </div>
                <hr
                    className={`border my-8`}
                />

                <div className="flex-wrap flex-row flex w-full sm:w-fit gap-4 mx-auto text-3xl justify-evenly">
                    <Link
                        target="_blank"
                        href={`http://www.casinoa.nl/`}
                        className={`btn-primary  max-sm:text-lg max-sm:w-2/5 `}
                    >
                        <ImNewTab className="w-8" />
                        <div>Visit</div>
                    </Link>
                    <Link
                        target="_blank"
                        href={`https://www.github.com/aryavaziri/casinoa`}
                        className={`btn-primary  max-sm:text-lg max-sm:w-2/5 `}
                    >
                        <BsGithub className="w-8" />
                        <div>Source</div>
                    </Link>
                </div>
            </div>
        </div>

    );
}

export default page;