import Projects from "@components/Projects";
import { getClient } from "@lib/client";
import { gql } from "@apollo/client";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
import { isMobile } from "react-device-detect";

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
  // console.log(data);

  return (
    <div className={`relative h-screen w-screen overflow-hidden `}>
      <Suspense fallback={"Loading..."}>
        <Projects data={data} />
      </Suspense>
    </div>
  );
}
