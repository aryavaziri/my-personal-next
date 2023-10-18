import Link from "next/link";
import Image from "next/image";

export default function Home() {
  // const fetchData = async () => {
  //   try {
  //     await fetch(`http://localhost:3000/api/lists`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjMzM2VmODg1ZjljNmVkZTM1ODk4YyIsImlhdCI6MTY5Mzg0NTkwNCwiZXhwIjoxNjk0NzA5OTA0fQ.MC7OgffHGeWXH69jPByFO4WovqxaRm970IByyYwk6O0`,
  //       },
  //       body: JSON.stringify({ title: "ARYA" }),
  //     })
  //       .then((res) => {
  //         if (!res.ok) {
  //           throw new Error("Not OK");
  //         }
  //         return res.json();
  //       })
  //       .then((data) => {
  //         console.log(data);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <>
      <div
        className={`gap-y-4 flex flex-col px-4 pb-8 h-max-screen overflow-hidden`}
      >
        <h1 className="text-4xl md:text-6xl text-center pt-24 sm:pt-48 font-extrabold">
          Hello! My name is Arya.
        </h1>

        <h3 className="text-3xl pt-8 md:text-4xl text-center sm:min-h-12">
          I am a
          <br className="sm:hidden" />
          <span
            className={`sm:font-extrabold max-sm:text-3xl px-3 inline-block hover:scale-x-105 text-secondaryLight dark:text-secondaryDark skills`}
          >
            <div
              className={`border-b-2 border-transparent hover:border-current mb-2`}
            >
              front-end
            </div>
            <div className="absolute gap-1 hidden skills-icon">
              <Image
                alt="react"
                src="logo/react.svg"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "20px", height: "auto" }}
              />
              <Image
                alt="tailwind"
                src="logo/tailwind.svg"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "20px", height: "auto" }}
              />
              <Image
                alt="p5js"
                src="logo/p5js.svg"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "20px", height: "auto" }}
              />
              <Image
                alt="ts"
                src="logo/ts.svg"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "20px", height: "auto" }}
              />
              <Image
                alt="js"
                src="logo/js.svg"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "20px", height: "auto" }}
              />
              <Image
                alt="next"
                src="logo/next.svg"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "20px", height: "auto" }}
              />
            </div>
          </span>
          |
          <span
            className={`sm:font-extrabold max-sm:text-3xl px-3 inline-block hover:scale-x-105 text-secondaryLight dark:text-secondaryDark skills`}
          >
            <div
              className={`border-b-2 border-transparent hover:border-current mb-2`}
            >
              back-end
            </div>
            <div className="absolute gap-1 hidden skills-icon">
              <Image
                alt="python"
                src="logo/python.svg"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "20px", height: "auto" }}
              />
              <Image
                alt="django"
                src="logo/django.svg"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "20px", height: "auto" }}
              />
              <Image
                alt="nodejs"
                src="logo/nodejs.svg"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "20px", height: "auto" }}
              />
              <Image
                alt="mongodb"
                src="logo/mongodb.svg"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "20px", height: "auto" }}
              />
              <Image
                alt="firebase"
                src="logo/firebase.svg"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "20px", height: "auto" }}
              />
              <Image
                alt="jwt"
                src="logo/jwt.svg"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "20px", height: "auto" }}
              />
            </div>
          </span>
          |
          <span
            className={`sm:font-extrabold max-sm:text-3xl px-3 inline-block hover:scale-x-105 text-secondaryLight dark:text-secondaryDark skills`}
          >
            <div
              className={`border-b-2 border-transparent hover:border-current mb-2`}
            >
              cloud
            </div>
            <div className="absolute gap-1 hidden skills-icon">
              <Image
                alt="nginx"
                src="logo/nginx.svg"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "20px", height: "auto" }}
              />
              <Image
                alt="docker"
                src="logo/docker.svg"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "20px", height: "auto" }}
              />
              <Image
                alt="git"
                src="logo/git.svg"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "20px", height: "auto" }}
              />
              <Image
                alt="kubernetes"
                src="logo/kubernetes.svg"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "20px", height: "auto" }}
              />
            </div>
          </span>
          <br className="sm:hidden" />
          developer.
        </h3>
        <div className="flex justify-center mx-auto  text-lg my-6 gap-4">
          <Link
            className="bg-black/10 dark:bg-light/20 backdrop-blur rounded px-4 py-1 shadow-lg"
            href={`/projects`}
          >
            See my projects
          </Link>
          <Link
            className="bg-black/10 dark:bg-light/20 backdrop-blur rounded px-4 py-1 shadow-lg"
            href={`/about`}
          >
            <span>More about me</span>
          </Link>
        </div>
      </div>
    </>
  );
}
