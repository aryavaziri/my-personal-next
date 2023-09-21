"use client";
import dynamic from "next/dynamic";
// const SketchComponent = dynamic(() => import("@components/Sketch4"));
const SketchComponent2 = dynamic(() => import("@components/Sketch4"));
const SketchComponent3 = dynamic(() => import("@components/Sketch7"));

export default function Page() {
  const fetchData = async () => {
    await fetch(`http://localhost:3000/api/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjMzM2VmODg1ZjljNmVkZTM1ODk4YyIsImlhdCI6MTY5Mzg0NTkwNCwiZXhwIjoxNjk0NzA5OTA0fQ.MC7OgffHGeWXH69jPByFO4WovqxaRm970IByyYwk6O0`,
      },
      body: JSON.stringify({ title: "ARYA" }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not OK");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className=" gap-y-4 flex flex-col">
        {/* <h5 className="text-2xl">p5.js Sketch</h5> */}
        <h1 className="text-6xl text-center mt-20 font-bold">
          Hello! My name is Arya.
        </h1>
        <h3 className="text-4xl text-center">
          I am a front-end and back-end developer.
        </h3>
      </div>
      {/* <SketchComponent2 className="" /> */}
      {/* <SketchComponent3 /> */}
      <div className="absolute left-0 top-0 w-screen h-screen blur-[1px] z-[-99] ">
        <SketchComponent2 />
        {/* <SketchComponent className="" /> */}
      </div>
    </>
  );
}
