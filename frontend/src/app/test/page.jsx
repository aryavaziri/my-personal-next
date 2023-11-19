'use client'
import React from 'react'
import Yesno from '@components/modals/Yesno'
import Login from '@components/modals/Login';
// import { getClient } from "@lib/client";
import { gql } from "@apollo/client";
import { useState, useEffect } from 'react'
import { Image } from 'next/image'

const page = () => {
    const [active, setActive] = useState(true)
    const onAnswer = (result) => { console.log(result) }

    return (
        <div>
            <button className={`absolute mt-40 text-2xl`} onClick={() => setActive(true)} >
                LOGIN
            </button>
            <div className={`absolute `} >
                <Login data={"data"} active={active} setActive={setActive} onAnswer={onAnswer} />
            </div>
        </div>
    )
}

export default page