'use client'

import { useContext, useEffect, useState } from 'react'

const Yesno = ({ onAnswer, active, setActive, placeholder }) => {
  // useEffect(() => {
  //   console.log('from yes-no:', data)
  // }, [data])
  return (
    <div className={`fixed z-[80] top-0 left-0 w-screen pt-[40vh] bg-slate-100/50 dark:bg-dark/50 h-screen backdrop-blur-[2px] ${!active && "hidden"}`} onClick={() => { setActive(false) }} >
      <div className={`max-w-sm rounded-lg overflow-hidden mx-auto bg-arya3`}>
        <h1 className={`text-center text-2xl p-4 py-2`} >
          {placeholder ? placeholder : `Are you Sure??? Are you fucken really sure you want to do that???? If you do it you may won't be able to restore it.`}

        </h1>
        <div className={`flex justify-evenly w-full `}>
          <button onClick={() => { onAnswer(true); setActive(false) }} className={`dark:bg-pink-800/60 bg-pink-300/80 hover:text-dark hover:bg-pink-600 hover:dark:bg-pink-600 text-2xl grow p-2`} >Yes,I'm sure</button>
          <button onClick={() => { onAnswer(false); setActive(false) }} className={`hover:bg-light/80 text-2xl grow p-2`} >Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default Yesno