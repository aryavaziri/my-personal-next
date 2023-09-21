import P5Sketch from "@components/P5Sketch";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
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
      });
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={`gap-y-4 flex flex-col h-screen `}>
        <h1 className="text-6xl text-center mt-48 font-extrabold">
          Hello! My name is Arya.
        </h1>
        <h3 className="text-4xl text-center h-12">
          I am a
          <span
            className={`font-extrabold px-3 inline-block hover:scale-x-105 text-arya4 skills`}
          >
            <div
              className={`border-b-2 border-transparent hover:border-current mb-2`}
            >
              front-end
            </div>
            <div className="absolute gap-1 hidden skills-icon">
              <Image
                alt="react"
                src="/logo/react.svg"
                width={20}
                height={20}
              />
              <Image
                alt="tailwind"
                src="/logo/tailwind.svg"
                width={20}
                height={20}
              />
              <Image
                alt="p5js"
                src="/logo/p5js.svg"
                width={20}
                height={20}
              />
              <Image
                alt="ts"
                src="/logo/ts.svg"
                width={20}
                height={20}
              />
              <Image
                alt="js"
                src="/logo/js.svg"
                width={20}
                height={20}
              />
              <Image
                alt="next"
                src="/logo/next.svg"
                width={20}
                height={20}
              />
            </div>
          </span>
          |
          <span
            className={`font-extraspan px-3 inline-block hover:scale-x-105 text-arya4 skills`}
          >
            <div
              className={`border-b-2 border-transparent hover:border-current mb-2`}
            >
              back-end
            </div>
            <div className="absolute gap-1 hidden skills-icon">
              <Image
                alt="python"
                src="/logo/python.svg"
                width={20}
                height={20}
              />
              <Image
                alt="django"
                src="/logo/django.svg"
                width={20}
                height={20}
              />
              <Image
                alt="nodejs"
                src="/logo/nodejs.svg"
                width={20}
                height={20}
              />
              <Image
                alt="mongodb"
                src="/logo/mongodb.svg"
                width={20}
                height={20}
              />
              <Image
                alt="firebase"
                src="/logo/firebase.svg"
                width={20}
                height={20}
              />
              <Image
                alt="jwt"
                src="/logo/jwt.svg"
                width={20}
                height={20}
              />
            </div>
          </span>
          |
          <span
            className={`font-extraspan px-3 inline-block hover:scale-x-105 text-arya4 skills`}
          >
            <div
              className={`border-b-2 border-transparent hover:border-current mb-2`}
            >
              cloud
            </div>
            <div className="absolute gap-1 hidden skills-icon">
              <Image
                alt="nginx"
                src="/logo/nginx.svg"
                width={20}
                height={20}
              />
              <Image
                alt="docker"
                src="/logo/docker.svg"
                width={20}
                height={20}
              />
              <Image
                alt="git"
                src="/logo/git.svg"
                width={20}
                height={20}
              />
              <Image
                alt="kubernetes"
                src="/logo/kubernetes.svg"
                width={20}
                height={20}
              />
            </div>
          </span>
          developer.
        </h3>
        <div className="flex justify-between mx-auto w-1/2 text-lg mt-12">
          <Link
            className="border border-current rounded font-bold px-4 py-1 hover:shadow-lg dark:hover:text-arya2"
            href={`/projects`}
          >
            See my projects
          </Link>
          <Link
            className="border border-current rounded font-bold px-4 py-1 hover:shadow-lg dark:hover:text-arya2"
            href={`/about`}
          >
            More about me
          </Link>
        </div>
      </div>
      <div className="absolute left-0 top-0 w-screen h-screen z-[-1]">
        <P5Sketch />
      </div>
    </>
  );
}
