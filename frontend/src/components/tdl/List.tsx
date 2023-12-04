// "use client";
import AddItem from "@components/tdl/AddItem";
import DelList from "@components/tdl/DelList";
import DelItem from "@components/tdl/DelItem";
import ShareList from "@components/tdl/ShareList";
import CompleteItem from "@components/tdl/CompleteItem";

import { z } from "zod";

export const ItemSchema = z.object({
  _id: z.string(),
  itemName: z.string(),
  done: z.boolean(),
  quantity: z.number(),
  source: z.string().optional(),
  priority: z.number().optional(),
});

export const UserSchema = z.object({
  _id: z.string(),
  name: z.string().optional(),
  email: z.string(),
});

export const ListSchema = z.object({
  _id: z.string(),
  title: z.string(),
  items: z.array(ItemSchema).optional(),
  collaborators: z.array(z.string()).optional(),
  creator: UserSchema,
});
export type TList = z.infer<typeof ListSchema>;
export type TItem = z.infer<typeof ItemSchema>;

const List = ({ list }: { list: TList }) => {
  return (
    <section className="shadow duration-100 rounded p-4 bg-gradient-to-b from-sky-700/80 to-cyan-400/50 relative">
      <h1 className="text-2xl my-2 text-center">
        {list?.title?.toUpperCase()}
      </h1>

      <div className={`flex justify-between`}>
        <p> {`by ${list.creator.name ?? list.creator.email}`}</p>
        <div className={`flex gap-2`}>
          <ShareList list={list} />
          <DelList list={list} />
        </div>
      </div>
      {list?.items?.length ? (
        <ul className="py-2">
          {list.items?.map((item) => {
            return (
              <li
                className="border rounded my-1 overflow-hidden"
                key={item._id}
              >
                <div className="text-md py-1 flex items-center gap-2 ml-[-40px] hover:ml-2">
                  <DelItem
                    item={item}
                    list={list}
                  />
                  <CompleteItem
                    item={item}
                    list={list}
                  />

                  <span
                    className={`${
                      item?.done && "line-through"
                    } decoration-orange-600 decoration-2`}
                  >
                    {item?.itemName}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>No items in the list</div>
      )}
      <AddItem list={list} />
      {/* <div
        className={`rounded bg-slate-300 flex  gap-2 justify-between items-center duration-300 px-2 mb-2 overflow-hidden`}
        >
        <button
        className="rounded shadow py-1 px-2 bg-slate-200 hover:bg-rose-200 duration-300"
        // onClick={(e) => {
          //   e.preventDefault();
          //   setToggle(false);
          //   delItem("ALL");
          // }}
          >
          delete all
          </button>
          <button
          className="rounded shadow py-1 px-2 bg-slate-200 hover:bg-emerald-200 duration-300"
          // onClick={(e) => {
          //   e.preventDefault();
          //   setToggle(false);
          //   checkItem("ALL");
          // }}
        >
          unmark all
        </button>
      </div> */}
    </section>
  );
};

export default List;
