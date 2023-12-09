import Link from "next/link";
import data from "./data.json";

const page = () => {
  return (
    <div
      className={`h-screen pl-8 lg:px-24 overflow-hidden w-full flex pt-32 gap-4`}
    >
      <div className={`flex-1 flex flex-col`}>
        <h1 className={`text-4xl my-4`}>Trading bot</h1>
      </div>
    </div>
  );
};

export default page;
