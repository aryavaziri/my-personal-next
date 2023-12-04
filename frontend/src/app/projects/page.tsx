import Projects from "@components/Projects";
import { getClient } from "@lib/client";
import { gql } from "@apollo/client";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

const PROJECTS = gql`
  query projects {
    projects {
      _id
      title
      tech
      link
      video
      extention
      creator
    }
  }
`;

export default async function page() {
  const { data } = await getClient().query({ query: PROJECTS });
  console.log(data);
  return (
    <div className={`relative h-screen w-screen overflow-hidden `}>
      <div className="pr-4 pl-6 sm:pl-20 md:pl-36 lg:pl-56 backdrop-blur z-[4] w-3/5 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl fixed pt-6 sm:pt-10 md:pt-32">
        <h1 className="whitespace-nowrap pb-2 border-b-4 border-current w-min ">
          Projects
        </h1>
      </div>
      <Suspense fallback={"Loading..."}>
        <Projects data={data} />
      </Suspense>
    </div>
  );
}