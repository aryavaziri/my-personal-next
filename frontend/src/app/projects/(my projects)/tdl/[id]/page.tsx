import List from "@components/tdl/List";
import { type TList } from "@components/tdl/List";

const page = async ({ params }: { params: { id: string } }) => {
  const list: TList = await fetch(`http://localhost:5000/rh/list/${params.id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(list);

  return (
    <div className={`pt-52 max-w-[350px] mx-auto relative`}>
      <List
        list={list}
        key={list._id}
      />
    </div>
  );
};

export default page;
