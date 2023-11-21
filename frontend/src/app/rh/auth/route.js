import { NextResponse } from 'next/server'

export const POST = async (req) => {
    try {
        let d
        const data = await req.json()
        // console.log(data)
        if (!data.password) {
            const res = await fetch('https://aryav.nl/api/email_check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            d = await res.text()
            // console.log(res)
            // console.log(d)
            return NextResponse.json({ data: d })
        } else {
            const res = await fetch('https://aryav.nl/api/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            d = await res.text();
            console.log(d)
            if (res.ok) {
                return NextResponse.json({ data: d })
            }
            return NextResponse.json({ data: d })
            // return NextResponse.redirect(`https://aryav.nl/?token=${d}`);
            // const response = NextResponse.redirect(`https://www.aryav.nl/`);
            // response.headers.set('Access-Control-Allow-Origin', "*")
            // response.headers.set('Access-Control-Allow-Credentials', "true")
            // response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            // return response
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ data: error })
    }
}