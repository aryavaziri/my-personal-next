import Link from "next/link";
import Modal from "@components/modals/Modal";
const page = () => {
  return (
    <>
      <div className={`flex gap-4 `}>
        <Modal />
        <div className="w-full">
          <p className="text-xl max-sm:pt-7 sm:text-2xl md:text-4xl ml-48 sm:ml-60 md:ml-96 z-[20] fixed">
            {" "}
            &gt; Your Payments
          </p>
          <div
            className={`mt-20 pb-12 max-sm:justify-items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full`}
          >
            ADD PAYMENT METHOD
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
