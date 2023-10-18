"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { Context } from "@app/Provider";

const Input = ({ title }) => {
    const myContext = useContext(Context);
    const [isFocused, setIsFocused] = useState(false)
    const [value, setValue] = useState()
    const [inputType, setInputType] = useState('text')

    useEffect(() => {
        switch (title) {
            case 'email':
                setInputType('email');
                break;
            case 'price':
                setInputType('number');
                break;
            case 'age':
                setInputType('date');
                break;
            case 'password':
                setInputType('password');
                break;
            default:
                setInputType('text')
        }
        // onValueChange(value)
    }, [value])


    return (
        <div className={`overflow-hidden font-medium text-inherit bg-inherit p-2 relative`}>
            <div className={`${(!myContext.theme) ? "bg-slate-700" : "bg-c1"} h-6 left-4 top-[-8px] z-10 absolute duration-1000 ease-out overflow-hidden ${isFocused || value ? 'w-auto px-2' : 'w-0'}`}>{title}</div>
            {title === 'Message'
                ? <textarea
                    name='Name'
                    type={inputType}
                    placeholder={isFocused ? "" : title}
                    className={`w-full px-4 rounded ${(isFocused || !value) ? '' : ''} h-32 text-2xl drop-shadow-lg bg-inherit border-2 ${(myContext.theme) ? "border-slate-500" : "border-c1"} `}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => { setValue(e.target.value) }}
                />
                : <input
                    name='Name'
                    type={inputType}
                    placeholder={isFocused ? "" : title}
                    className={`w-full px-4 rounded ${(isFocused || !value) ? '' : ''} h-12 text-3xl drop-shadow-lg bg-inherit border-2 ${(myContext.theme) ? "border-slate-500" : "border-c1"} `}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => { setValue(e.target.value) }}
                />}
        </div>
    )
}
export default Input