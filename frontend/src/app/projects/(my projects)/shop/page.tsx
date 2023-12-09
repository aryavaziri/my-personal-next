import Link from "next/link";
import Product from "@components/shop/Product";
import AddProduct from "@components/shop/AddProduct";

const page = () => {
  const product = {
    name: "test",
    price: 100,
    description: "test description",
    image: "/images/test2.jpg",
    _id: "fasdfasfdsa",
    quantity_in_stock: 1,
  };
  return (
    <div
      className={`h-screen pl-8 lg:px-24 overflow-hidden w-full pt-32 gap-4`}
    >
      <div className={`flex-1 flex flex-col`}>
        <h1 className={`text-4xl my-4`}>Shop</h1>
      </div>

      <section className={`grid grid-cols-3 mt-8 gap-4`}>
        <Product product={product} />
        <AddProduct />
        {/* {data?.map((list) => {
                return (
                  );
      })} */}
      </section>
    </div>
  );
};

export default page;
