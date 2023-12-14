import { connectToDB } from "@lib/database";
import { Product } from "@models/Shop";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    console.log("SHOP REQUEST");
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
};
