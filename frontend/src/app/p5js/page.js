"use client";
import dynamic from "next/dynamic";
const SketchComponent = dynamic(() => import("@components/Sketch"));

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
    <div className="border border-1 border-slate-800 grow flex flex-col gap-y-4 items-center">
      <h2 className="text-2xl">p5.js Sketch</h2>
      <SketchComponent />
      {/* <button
        onClick={fetchData}
        className={`px-2 hover:bg-slate-300 duration-50 py-0 my-2 border-slate-600 border rounded`}
      >
        TEST
      </button> */}
    </div>
  );
}
