import Product, { TProduct } from "@components/shop/Product";
import AddProduct from "@components/shop/AddProduct";
export const dynamic = "force-dynamic";

const page = async () => {
  const products: TProduct[] = await fetch(`${process.env.hostname}/rh/shop`, {
    next: { tags: ["shop"] },
  })
    .then((response) => response.ok && response.json())
    .then((result) => {
      if (!result.error) {
        return result;
      }
    })
    .catch((error) => console.log(error));

  return (
    <div className={`pl-8 lg:px-24 pb-12 w-full pt-20 gap-4`}>
      <div className={`flex-1 flex flex-col`}>
        <h1 className={`text-4xl my-4`}>Shop</h1>
      </div>

      <section className={`grid grid-cols-4 gap-x-4 gap-y-4`}>
        {products.map((product) => (
          <Product
            product={product}
            key={product._id}
          />
        ))}
        <AddProduct />
      </section>
    </div>
  );
};

export default page;
