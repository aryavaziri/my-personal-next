"use server";
import { cookies } from "next/headers";
import { List } from "@models/List";
import { Item } from "@models/List";
import { type TItem, TList } from "@components/tdl/List";
import { revalidateTag } from "next/cache";
import { HydratedDocument } from "mongoose";

export const getToken = async () => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken");
    return token?.value;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const authenticate = async () => {
  const token = await getToken();
  console.log(token);
  // cookies().set("token", token ?? "");
  const fetchData = await fetch(`https://aryav.nl/api/getuser`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(`${err.message}`));
  console.log(fetchData);
  return { userId: fetchData._id };
};

export const addListAction = async (payload: TList) => {
  const { userId } = await authenticate();
  userId && (await List.create({ creator: userId, title: payload.title }));
  revalidateTag("list");
};

export const addItemAction = async (payload: TItem, listId: string) => {
  const { userId } = await authenticate();
  const list: HydratedDocument<TList> = (await List.findById(listId).populate(
    "items"
  )) as HydratedDocument<TList>;

  if (list?.creator?._id == userId) {
    console.log("YES");
    const temp =
      list?.items?.findIndex((item) => {
        return item.itemName === payload.itemName;
      }) || -1;
    if (temp == -1) {
      const newItem: HydratedDocument<TItem> = await Item.create({
        itemName: payload.itemName,
      });
      list.items?.push(newItem);
      await list.save();
    } else {
      const item: HydratedDocument<TItem> = (await Item.findById(
        list.items?.[temp]?._id
      )) as HydratedDocument<TItem>;
      item.done = false;
      await item.save();
    }
  }
  revalidateTag("list");
};

export const delListAction = async (payload: TList) => {
  const { userId } = await authenticate();
  try {
    const list = await List.findById(payload._id);
    if (list.creator == userId) {
      await List.findByIdAndDelete(payload._id);
      revalidateTag("list");
    }
  } catch (error) {
    console.log(error);
  }
};

export const delItemAction = async (itemId: string, listId: string) => {
  const { userId } = await authenticate();
  try {
    const list: HydratedDocument<TList> = (await List.findById(listId).populate(
      "items"
    )) as HydratedDocument<TList>;
    if (list?.creator == userId) {
      const temp = list.items?.filter((item) => item._id.toString() !== itemId);
      list.items = temp;
      list.save();
      revalidateTag("list");
    }
  } catch (error) {
    console.log(error);
  }
};

export const completeItemAction = async (item: TItem, list: TList) => {
  const { userId } = await authenticate();
  try {
    const fetchedList = await List.findById(list._id).populate("items"); // Populate the items array
    if (fetchedList?.creator == userId) {
      const fetchedItem = await Item.findById(item._id);
      fetchedItem.done = !fetchedItem.done;
      fetchedItem.save();

      revalidateTag("list");
    }
  } catch (error) {
    console.log(error);
  }
};
