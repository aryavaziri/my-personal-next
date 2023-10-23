// "use client";
import Link from "next/link";
import Image from "next/image";
// import ProjectCard from "@components/ProjectCard";

const fetchData = async () => {
  const response = await fetch(`http://localhost:3000/graphql`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      // authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjMzM2VmODg1ZjljNmVkZTM1ODk4YyIsImlhdCI6MTY5Mzg0NTkwNCwiZXhwIjoxNjk0NzA5OTA0fQ.MC7OgffHGeWXH69jPByFO4WovqxaRm970IByyYwk6O0`,
    },
    body: JSON.stringify({
      query: `{ projects { title dev link src } }`,
    }),
  });
  // console.log(response)
  const data = await response.json();
  return data;
};

const page = async () => {
  // const data = await fetchData()
  // console.log(data.data.projects)
  return (
    <div className="min-h-screen flex flex-col ">
      <div className="pr-4 pl-2 sm:pl-20 md:pl-36 lg:pl-56 backdrop-blur z-[4] w-3/5 sm:w-full font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl pt-6 sm:pt-24 md:pt-32">
        <h1 className="whitespace-nowrap pb-2 border-b-4 border-current w-min mb-4">
          Admin
        </h1>
        {}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 ld:grid-cols-3 gap-4 mt-2 text-xl px-36">
        {/* <ProjectCard /> */}
      </div>
    </div>
  );
};

export default page;
