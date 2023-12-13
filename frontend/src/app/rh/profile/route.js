import { connectToDB } from "@lib/database";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { UserProfile } from '@models/Shop'

export const GET = async (req) => {
    try {
        const token = cookies().get('accessToken')?.value
        // console.log(`token: ${token}`)
        const fetchData = await fetch(`https://aryav.nl/api/getuser`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())

        const userId = fetchData?._id || ""
        await connectToDB();
        const profile = userId ? await UserProfile.find({ user: userId }) : [{}];
        return NextResponse.json({ profile: profile[0] }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
};
