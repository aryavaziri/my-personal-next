import Link from "next/link";
import Image from "next/image";

import { BsForward } from "react-icons/bs";
import { BsSkipStart } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { ImNewTab } from "react-icons/im";

const page = () => {
    return (
        <div className={`pb-12`} >
            <div className="rounded-b-[50px] relative mb-12 w-full overflow-hidden h-[50vh]" >
                <div className={`w-full h-full`} >
                    <Image
                        className="object-cover "
                        src='/images/test3.jpg'
                        alt="CASINOA"
                        fill
                    />
                </div>
            </div>

            <div className={`pt-10 sticky top-0 backdrop-blur-md`} >
                <h1 className={`mx-20 text-center pb-4 text-4xl sm:text-5xl font-bold border-b-2 border-dark dark:border-light sticky top-0 backdrop-blur-md`} >
                    ARYAV.NL, Project shawcasing
                </h1>
            </div>
            <div className={`md:px-20 text-xl`} >
                <div className="flex sm:justify-between max-md:flex-col my-6">
                    <div className="basis-1/3 lg:basis-1/4 flex flex-col gap-4 p-2">
                        <div className="gap-2 items-baseline">
                            <div className={`w-32 font-bold text-right text-xl`} >
                                Techsnologies:
                            </div>
                            <div className="px-2 my-2">
                                Nextjs / React / ExpressJS / MongoDB / TailwindCSS / GraphQL / NGINX / Docker / Git
                            </div>
                        </div>
                    </div>
                    <div className="basis-2/3 lg:basis-3/4 p-2 font-medium text-2xl">
                        Welcome to my personal portfolio website! Built using Next.js 13 and Express.js, this platform showcases my full-stack development skills. What sets it apart is the ability for everyone to contribute their own projects, fostering collaboration. Powered by GraphQL with Apollo Server, the site ensures seamless data communication for a modern user experience. Explore and stay tuned for more project details!
                    </div>
                </div>
                <div className="my-12">
                    <div
                        className={` border-b-2 border-dark dark:border-light text-3xl p-2 font-bold `}
                    >
                        Key Features
                    </div>
                    <ul className="mt-4 sm:pt-6 gap-4 flex flex-col">
                        <li className="w-full flex flex-col sm:flex-row">
                            <div className={`w-full sm:w-1/3 lg:w-1/4 sm:text-end px-4 text-2xl font-semibold `} >
                                Open-Authentication
                            </div>
                            <div className="w-full sm:w-2/3 lg:w-3/4 justify">
                                Effortlessly sign up using your Google account for a seamless and secure authentication process. For users who prefer email registration, our platform ensures inclusivity with a straightforward sign-up option. Join the community easily, embracing both convenience and inclusiveness.
                            </div>
                        </li>
                        <li className="w-full flex flex-col sm:flex-row">
                            <div className={`w-full sm:w-1/3 lg:w-1/4 sm:text-end px-4 text-2xl font-semibold `} >
                                NGINX (SSL encryption)
                            </div>
                            <div className="w-full sm:w-2/3 lg:w-3/4 justify">
                                Nginx, a high-performance web server, ensures efficient handling of incoming requests. SSL encryption, facilitated by an SSL certificate, adds an extra layer of protection by encrypting data exchanged between users and the server. This not only boosts security but also establishes trust. Rest easy knowing that your interactions on this platform are safeguarded by cutting-edge encryption technology.
                            </div>
                        </li>
                        <li className="w-full flex flex-col sm:flex-row">
                            <div className={`w-full sm:w-1/3 lg:w-1/4 sm:text-end px-4 text-2xl font-semibold `} >
                                GraphQL
                            </div>
                            <div className="w-full sm:w-2/3 lg:w-3/4 justify">
                                Powering our platform's data management is GraphQL, a query language for APIs. This innovative technology excels in efficiency, enabling clients to request precisely the data they need. Both server and client sides leverage GraphQL with Apollo, ensuring seamless communication and optimal performance. The result? A faster, more flexible, and resource-efficient user experience.
                            </div>
                        </li>
                        <li className="w-full flex flex-col sm:flex-row" >
                            <div className={`w-full sm:w-1/3 lg:w-1/4 sm:text-end px-4 text-2xl font-semibold `} >
                                React-hook-form
                            </div>
                            <div className="w-full sm:w-2/3 lg:w-3/4 justify" >
                                Elevating our frontend proficiency and delivering a superior user experience, our project leverages React Hook Form. This library streamlines form development, making implementation a breeze and ensuring clean, maintainable code. With React Hook Form, intricate forms become more manageable, enhancing overall efficiency. Experience the benefits of smoother implementation, improved user interaction, and a codebase that's both robust and elegant.
                            </div>
                        </li>
                    </ul>
                </div>

                <hr className={`border my-8`} />

                <div className="flex-wrap flex-row flex w-full sm:w-fit gap-8 mx-auto text-3xl justify-evenly" >
                    <Link
                        target="_blank"
                        href={`http://www.aryav.nl/`}
                        className={`rounded text-2xl shadow-lg px-5 py-2 hover:bg-dark/20 hover:dark:bg-light/40 border mt-4 border-current mx-auto flex gap-2`} >
                        <ImNewTab className="w-8 mt-1" />
                        <div>Visit</div>
                    </Link>

                    <Link
                        target="_blank"
                        href={`https://www.github.com/aryavaziri/my-personal-next`}
                        className={`rounded text-2xl shadow-lg px-5 py-2 hover:bg-dark/20 hover:dark:bg-light/40 border mt-4 border-current mx-auto flex gap-2`} >
                        <BsGithub className="w-8 mt-1" />
                        <div>Source</div>
                    </Link>
                </div>
            </div>
        </div>

    );
}

export default page;