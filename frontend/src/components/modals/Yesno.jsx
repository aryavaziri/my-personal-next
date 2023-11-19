'use client'

import { useContext, useEffect, useState } from 'react'

const Yesno = ({ onAnswer, active, setActive, placeholder }) => {
  // useEffect(() => {
  //   console.log('from yes-no:', data)
  // }, [data])
  return (
    <div className={`fixed z-[80] top-0 left-0 w-screen pt-[40vh] bg-dark/70 h-screen backdrop-blur-[2px] ${!active && "hidden"}`} onClick={() => { setActive(false) }} >
      <div className={`max-w-sm rounded-lg overflow-hidden mx-auto bg-light/90 drop-shadow-lg`}>
        <h1 className={`text-center text-dark text-2xl p-4 py-2`} >
          {placeholder ? placeholder : `Are you Sure??? Are you fucken really sure you want to do that???? If you do it you may won't be able to restore it.`}

        </h1>
        <div className={`flex justify-evenly w-full `}>
          <button onClick={(e) => { e.preventDefault(); onAnswer(true); setActive(false) }} className={`bg-rose-500/80 text-dark hover:bg-rose-600 text-2xl grow p-2`} >Yes,I'm sure</button>
          <button onClick={(e) => { e.preventDefault(); onAnswer(false); setActive(false) }} className={`bg-dark/20 hover:bg-dark/50 text-dark text-2xl grow p-2`} >Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default Yesno