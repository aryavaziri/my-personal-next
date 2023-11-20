'use client'
import React, { useState, useEffect } from 'react'
import Login from '@components/modals/Login';

const page = () => {
    const [active, setActive] = useState(true)
    const onAnswer = (result) => { console.log(result) }

    return (
        <div>
            <button className={`absolute mt-40 text-2xl`} onClick={() => setActive(true)} >
                LOGIN
            </button>
            <div className={`absolute `} >
                <Login placeholder={''} active={active} setActive={setActive} onAnswer={onAnswer} />
            </div>
        </div>
    )
}

export default page