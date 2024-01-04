// import { BasketProvider } from "@components/shop/BasketUI";
import Basket from "@components/shop/Basket";

const page = async () => {
  return (
    <div className={`flex gap-4 `}>
      <div className="w-full">
        <p className="text-xl max-sm:pt-7 sm:text-2xl md:text-4xl ml-48 sm:ml-60 md:ml-96 z-[20] fixed">
          &gt; Basket
        </p>
        <div className={`mt-20 pb-12 w-full`}>
          <Basket />
        </div>
      </div>
    </div>
  );
};

export default page;
