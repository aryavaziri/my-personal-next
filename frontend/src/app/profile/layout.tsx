import Link from "next/link";
import Provider from "./Provider";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className={`relative min-h-screen w-screen overflow-hidden`}>
      <div className="pr-4 pl-6 sm:pl-20 md:pl-56 lg:pl-72 backdrop-blur z-[4] w-full font-bold text-3xl sm:text-4xl md:text-5xl fixed pt-6 sm:pt-10 pb-3">
        <Link
          href={`/profile`}
          className="whitespace-nowrap pb-0 w-min"
        >
          USER PROFILE
        </Link>
      </div>
      <div
        className={`px-6 sm:px-20 md:px-36 lg:px-56 text-lg sm:text-lg md:text-xl lg:text-xl sm:pt-12`}
      >
        <Provider>{children}</Provider>
      </div>
    </div>
  );
};

export default Layout;
