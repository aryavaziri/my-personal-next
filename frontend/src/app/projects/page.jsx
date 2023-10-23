import Projects from "@components/Projects";

const fetchData = async () =>{
  const response = await fetch(`localhost:3000/graphql`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      // authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjMzM2VmODg1ZjljNmVkZTM1ODk4YyIsImlhdCI6MTY5Mzg0NTkwNCwiZXhwIjoxNjk0NzA5OTA0fQ.MC7OgffHGeWXH69jPByFO4WovqxaRm970IByyYwk6O0`,
    },
    body: JSON.stringify({
      query: `{ projects { title dev link src } }`,
    }),
  })
  const data = await response.json()
  return data

}

async function page() {

  const data = await fetchData()
  console.log(data.data.projects)

  return (
    <div
      className={`relative h-screen w-screen overflow-hidden `}
    >
      <div className="pr-4 pl-2 sm:pl-20 md:pl-36 lg:pl-56 backdrop-blur z-[4] w-3/5 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl fixed pt-6 sm:pt-24 md:pt-32">
        <h1 className="whitespace-nowrap pb-2 border-b-4 border-current w-min mb-4">
          Projects
        </h1>
      </div>
      <Projects items={data.data.projects} />
    </div>
  );
}

export default page;
