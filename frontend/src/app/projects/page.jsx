import Projects from "@components/Projects";
export const dynamic = "force-dynamic";

async function page() {

  return (
    <div className={`relative h-screen w-screen overflow-hidden `}>
      <div className="pr-4 pl-2 sm:pl-20 md:pl-36 lg:pl-56 backdrop-blur z-[4] w-3/5 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl fixed pt-6 sm:pt-24 md:pt-32">
        <h1 className="whitespace-nowrap pb-2 border-b-4 border-current w-min mb-4">
          Projects
        </h1>
      </div>
      <Projects />
    </div>
  );
}

export default page;
