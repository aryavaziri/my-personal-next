import { NextResponse } from 'next/server'

export const POST = async (req) => {
    const data = await req.json()
    console.log(data)
    const res = await fetch('https://aryav.nl/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    const d = await res.json()
    console.log(d)
    return NextResponse.json({ data: d })
}