"use client"
import { useState } from 'react'

function Popup({ children, placeholder }) {
    const [active, setActive] = useState(false)
    const close = () => { setActive(false) }

    return (
        <div>
            {active ?
                <div className={`grid place-items-center fixed top-0 backdrop-blur-md w-[400px] h-[100px] bg-green-300 left-0 h-screen w-screen justify-center`}>
                    <div className={`relative`} >
                        {children}
                    </div>
                </div>
                : <div className={`text-center`} onClick={() => setActive(true)} >{placeholder}</div>
            }
        </div>
    )
}

export default Popup