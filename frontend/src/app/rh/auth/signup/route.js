import { NextResponse } from 'next/server'

export const POST = async (req) => {
    try {

        const data = await req.json()
        // console.log(data)
        const res = await fetch('https://aryav.nl/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        const d = await res.text()
        if (d === 'waiting for confirmation') {
            return NextResponse.json({ confirm: d })
        }
        return NextResponse.json({ data: d })

        // console.log(res)
        // console.log(d)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ data: d })
    }
}