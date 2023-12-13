import { List } from "@models/List";
import { connectToDB } from "@lib/database";
import { NextResponse } from "next/server";
import { headers } from 'next/headers'

export const GET = async (req, res) => {
  const token = headers().get("token");
  // console.log(token);
  const fetchData = await fetch(`https://aryav.nl/api/getuser`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .catch((err) => console.log(err.message));

  const userId = fetchData?._id || ""
  try {
    await connectToDB();
    const lists = userId ? await List.find({ creator: userId })?.populate("items")?.populate("creator") : [];
    return NextResponse.json(lists, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
};
