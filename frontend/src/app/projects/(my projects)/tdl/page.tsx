import React from "react";
import AddList from "@components/tdl/AddList";
import List from "@components/tdl/List";
import { type TList } from "@components/tdl/List";
import { getToken } from "@actions/serverActions";

const page = async () => {
  let data: { lists: TList[] } = { lists: [] };
  try {
    const token = await getToken();
    // console.log(token);
    const response = await fetch(`https://aryav.nl/rh/list`, {
      headers: { "Content-Type": "application/json", token: token ?? "" },
    });
    data = await response.json();
  } catch (error) {
    console.log(error);
  }

  return (
    <section className={`grid grid-cols-3 pt-56 gap-4`}>
      {data?.lists?.map((list) => {
        return (
          <List
            list={list}
            key={list._id}
          />
        );
      })}
      <AddList />
    </section>
  );
};

export default page;
