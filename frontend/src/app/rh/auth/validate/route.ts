import { List, Item } from "@models/list";
import { NextResponse } from "next/server";
import { connectToDB } from "@lib/database";
import { cookies } from "next/headers";
import { getToken } from "@actions/serverActions";
// import { getServerSession } from "next-auth/next";

export const GET = async (req: Request, res: Response) => {
  const validate = await fetch(
    `https://aryav.nl/api/validate?token=${req.headers.get("token")}`
  );
  const data = await validate.json();
  // console.log(data._id);
  return NextResponse.json({ userId: data._id });
};
