import React from "react";
import AddList from "@components/tdl/AddList";
import List from "@components/tdl/List";
import { type TList } from "@components/tdl/List";
import { getToken } from "@actions/TDLserverActions";

// export const dynamic = "force-dynamic";

const page = async () => {
  let data: TList[] = [];
  const token = await getToken();
  // console.log(token);
  await fetch(`${process.env.hostname}/rh/list`, {
    headers: {
      "Content-Type": "application/json",
      token: (token as string) ?? "",
    },
    next: { tags: ["list"] },
  })
    .then((response) => response.ok && response.json())
    .then((result) => {
      !result.error && (data = result);
    })
    .catch((error) => console.log(error));

  return (
    <section className={`grid grid-cols-3 pt-56 gap-4`}>
      {data?.map((list) => {
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
