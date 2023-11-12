'use client'
import React from 'react'
import Yesno from '@components/modals/Yesno'
// import { getClient } from "@lib/client";
import { gql } from "@apollo/client";
import { useState, useEffect } from 'react'
import { Image } from 'next/image'

const page = () => {
    const PROJECTS = gql`query {projects{_id title tech link video extention}}`

    // const { data } = await getClient().query({ query: PROJECTS })
    const [active, setActive] = useState(false)
    const onAnswer = (result) => { console.log(result) }
    return (
        <div>
            <button className={`absolute z-[70]`} onClick={() => setActive(true)} >
                Delete
            </button>
            <div className={`absolute z-[80]`} >
                <Yesno data={"data"} active={active} setActive={setActive} onAnswer={onAnswer} placeholder={`Are you sure you want to delete this Project?`} />
            </div>
        </div>
    )
}

export default page