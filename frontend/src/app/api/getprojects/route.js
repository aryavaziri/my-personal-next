import { NextResponse } from 'next/server'

export const GET = async (req) => {
    console.log(req)
    return NextResponse.json({ data: "LILIBI" })
}