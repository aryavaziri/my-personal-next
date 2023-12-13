import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  const validate = await fetch(
    `https://aryav.nl/api/validate?token=${req.headers.get("token")}`
  );
  const data = await validate.json();
  // console.log(data._id);
  return NextResponse.json({ userId: data._id });
};
