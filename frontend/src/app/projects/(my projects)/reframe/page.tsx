import Link from "next/link";
import Image from "next/image";

import { BsForward } from "react-icons/bs";
import { BsSkipStart } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { ImNewTab } from "react-icons/im";

const page = () => {
    return (
        <div
            // style={{backgroundImage: `url(${Noise}`, opacity: "40%"}}
            className={`pb-8`}
        >
            <div className="rounded-b-[50px] relative w-full overflow-hidden h-[50vh]" >
                <div className={`w-full h-full`} >
                    <Image
                        className="object-cover "
                        src='/images/ReframePost.png'
                        alt="Reframe"
                        fill
                    />
                </div>
            </div>
            <div className={`pt-10 sticky top-0 backdrop-blur-md`} >
                <h1 className={`mx-20 text-center pb-4 text-4xl sm:text-5xl font-bold border-b-2 border-dark dark:border-light sticky top-0 backdrop-blur-md`} >
                    Reframe, A Travelling Art Piece
                </h1>
            </div>
            <div className="md:mx-20">

                <div className="max-md:flex-col flex justify-between my-6">
                    <div className="md:basis-2/5 flex flex-col gap-2 p-2">
                        <div className="flex gap-2">
                            <div
                                className={`w-32 font-bold text-right text-2xl`}
                            >
                                Client:
                            </div>
                            <div className="text-lg">Civic Interaction Design</div>
                        </div>
                        <div className="flex gap-2">
                            <div
                                className={` w-32 font-bold text-right text-2xl`}
                            >
                                Technologies:
                            </div>
                            <div className="text-lg">C#/UNITY, 3D, VR</div>
                        </div>
                        <div className="flex gap-2">
                            <div
                                className={`w-32 font-bold text-right text-2xl`}
                            >
                                Date:
                            </div>
                            <div className="text-lg">Nov - Dec 2022</div>
                        </div>
                    </div>
                    <div className="md:basis-2/3 p-2 text-justify text-xl"> Reframe is a VR experience that focuses on the Dutch occupation of Brazil (1630-1654). It's a poly-narrative that sheds light on those hidden voices and untold stories. But it does more; it makes us aware of our biases and blind spots by raising an interesting question: Might the same institutional biases we 'accuse' museums of still be present in some unforeseen way, neatly hidden in the systems, frameworks, and technology we use – and if so, can Reframe address that problem too?
                    </div>
                </div>
                <div>
                    <div
                        className={`text-3xl font-bold p-2`}
                    >
                        Design Proposal
                    </div>
                    <p className="text-justify"> In the VR experience, users will find themselves in front of View of Itamaracá Island, Brazil (1637) by Frans Post, where they will be able to interact with some elements of the painting. They hear a different story than the idyllic one created by the Dutch painter. A lot is not being told by him. Reframe fills this hiatus. <br /> It confronts users with a different narrative. While interacting with the painting, users hear voice recordings of Brazilians with different backgrounds who describe what they see when they look at the painting. These personal stories are added to engage the user, unlock multiple perspectives, and to get across how colonization is still affecting many lives nowadays. It does so in a 'strange loop' kind of way as well. <br /> In the same room, nine AI-generated paintings show how deeply rooted colonialism and racism still are in today's society and system. This new technology that's being developed is built on existing frameworks. It learns from the data we've fed the system. History forms its own datasets. To tell different stories, we need different data. <br /> <br /> At the end of the experience, users will be asked to share their experiences related to colonialism and racism. By collecting these stories, new data is being gathered. This way, the experience will grow over time. With the current explosion of generative AI-design tools in mind, this might prove to be the most important part of the experience. For it's one thing to prompt AI to 'create a painting in the style of Frans Post', but another to unlock these hidden stories.<br /> <br />
                    </p>
                </div>
                <div>
                    <div
                        className={`text-3xl font-bold p-2`}
                    >
                        Unity
                    </div>
                    <p className="text-justify"> As a developer in the Reframe VR project, my primary role was to create the immersive experience using Unity. I faced various challenges throughout the development process, such as implementing locomotion techniques suitable for VR and ensuring the experience was user-friendly for our target audience, who were not necessarily familiar with gaming or technology. <br /> Using my expertise in C#, I integrated a feedback recording system to allow users to share their experiences related to colonialism and racism. This functionality enabled us to collect valuable user data, which would contribute to the growth and evolution of the experience over time. <br /> To enhance the immersive nature of the VR experience, I utilized 3D audio techniques and incorporated an audio player with a playlist for each section of the project. This allowed users to engage with the narrative and personal stories from different perspectives, creating a more impactful and meaningful experience. <br /> <br />{" "}
                    </p>
                </div>

                <div className="my-8">
                    <div
                        className={`text-3xl font-bold p-2 my-2`}
                    >
                        Experience Demo
                    </div>
                    <video
                        className="w-full "
                        src='/images/reframe.mp4'
                        controls
                    />
                </div>

                <div className="sm:flex-row flex-col flex w-full sm:w-1/2 gap-4 mx-auto text-3xl justify-evenly">
                    <Link
                        className="btn-primary bg-vr1"
                        href={"/projects"}
                    >
                        <BsSkipStart className="w-6" />
                        <div>Visit</div>
                    </Link>
                    <Link
                        className="btn-primary bg-vr1"
                        href={`/projects/tetris`}
                    >
                        <div className="whitespace-nowrap">Source Code</div>
                        <BsForward className="" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default page;