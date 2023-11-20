'use client'

import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useForm, Form } from "react-hook-form";
import { FaArrowCircleRight } from "react-icons/fa";
import { RiLoaderFill } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
// import { DevTool } from "@hookform/devtools";

import { Context } from '@app/Provider';
import { CiEdit } from "react-icons/ci";

const Login = ({ onAnswer, active, setActive, placeholder }) => {
  // useEffect(() => {
  //   active ? myContext.setBgb(true) : myContext.setBgb(false)
  // }, [active])
  const myContext = useContext(Context)
  const [editable, setEditable] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [exists, setExists] = useState(false)
  const [loadinggggggg, setLoadinggggggg] = useState(false)

  const { register, control, handleSubmit, watch, formState, setFocus } = useForm();

  // const { errors } = formState
  useEffect(() => { console.log(formState.errors) }, [formState])



  const signIn = async (payload) => {
    console.log("SignIn: ", payload)
  }

  const signUp = async (payload) => {
    console.log("SignUp: ", payload)
  }


  const mailCheck1 = async (payload) => {
    console.log(payload)
    await setLoadinggggggg(true)
    try {
      const res = await fetch("/rh/auth", { method: "POST", body: JSON.stringify(payload) })
      const { data } = await res.json()
      console.log(data)
      if (data == 'exists') {
        console.log('exists')
        setExists(true)
      }
      if (data == 'not exists') {
        console.log('not exists')
      }
    } catch (error) {
      console.log(error.message)
    }
    setLoadinggggggg(false)
    setEmail(payload.email)
    setEditable(false)
  }


  return (
    <>
      {/* <DevTool control={control} /> */}
      <div className={`fixed z-[20] top-0 left-0 w-screen font-normal pt-[15vh] text-xl h-screen backdrop-blur-[2px] ${!active && "hidden"}`} onClick={() => { return; setActive(false) }} >
        <div className={`w-4/5 max-w-md px-4 pb-4 rounded-lg overflow-hidden mx-auto bg-gradient-to-b from-purple-400/60 to-light/90 drop-shadow-lg`}>
          <h1 className={`text-center text-dark text-4xl p-4 py-2`} >
            Sign In
          </h1>
          <div className={`w-full flex flex-col text-dark gap-4`} >
            <Link
              href="https://aryav.nl/auth/login/google"
              className={`drop-shadow text-light mx-auto px-4 flex justify-center gap-4 w-full rounded  py-2 text-center bg-dark/70 hover:bg-dark`} >
              <Image
                src="/logo/google.svg"
                alt='google'
                width={24}
                height={24}
              />
              <p>
                Sign in with Google
              </p>
            </Link>
            <Link
              href=""
              className={`drop-shadow text-light mx-auto px-4 flex justify-center gap-4 w-full rounded  py-2 text-center bg-dark/90 cursor-not-allowed hover:bg-dark opacity-20`} >
              <Image
                src="/logo/facebook.svg"
                alt='facebook'
                width={24}
                height={24}
              />
              <p>
                Sign in with Facebook
              </p>
            </Link>
            <Link
              href=""
              className={`drop-shadow text-light mx-auto px-4 flex justify-center gap-4 w-full rounded  py-2 text-center bg-dark/90 cursor-not-allowed hover:bg-dark opacity-20`} >
              <Image
                src="/logo/git.svg"
                alt='git'
                width={24}
                height={24}
              />
              <p>
                Sign in with Git
              </p>
            </Link>

            <p className={`text-4xl my-4 w-full text-center`}>Or</p>
          </div>


          {!email
            ? <p className={`font-normal mt-2 px-4 text-xl text-dark text-center`}>Sign in with your email</p>
            : <div className={`w-full overflow-hidden ${email ? 'h-12' : 'h-0'} flex`}>
              <div
                onClick={() => setExists(true)}
                className={`flex-1 text-center text-md shadow ${exists ? ' border-b-none bold text-2xl bg-purple-700/20 text-light' : 'hover:bg-dark/20'} flex flex-col justify-center cursor-pointer rounded-t-lg`} >
                <p>Sign In With Email</p>
              </div>
              <div
                onClick={() => setExists(false)}
                className={`flex-1 text-center text-md shadow ${!exists ? ' border-b-none bold text-2xl bg-purple-700/20 text-light' : 'hover:bg-dark/20'} flex flex-col justify-center cursor-pointer rounded-t-lg`} >
                Sign up
              </div>
            </div>
          }
          <Form className={`flex gap-2 flex-col p-4 rounded-lg ${exists ? 'rounded-tl-none' : 'rounded-tr-none'} ${email && 'shadow bg-purple-700/20'}`} control={control} >
            {/* {email && errors.name && (errors.name.type === "required" && (
            <span>This is required</span>
          ))} */}
            {/* {email && formState?.errors && (Object.keys(formState.errors).map(item => <span> error: {formState.errors[item]} </span>))} */}
            {/* {formState?.errors && Object.keys(errors).map(item => { (errors[item]) })} */}
            <div className={`relative`} >
              <input
                {...register("email", { required: true, minLength: 6, maxLength: 24 })}
                placeholder='your email'
                control={control}
                className={`bg-light text-dark w-full rounded my-0 px-2 py-2`}
                autoFocus
                disabled={!editable}
                type="email" />


              <button
                onClick={handleSubmit(mailCheck1)}
                className={`absolute right-2 h-full inset-y-0 text-dark text-2xl`}
                type='submit' >
                {loadinggggggg
                  ? <RiLoaderFill className={`motion-safe:animate-spin`} />
                  : editable
                    ? !email && <FaArrowCircleRight />
                    : <CiEdit onClick={() => { setFocus('email'); setEditable(true) }} className={``} />
                }
              </button>
            </div>
            <div className={`text-rose-700 mb-0 overflow-hidden ${formState?.errors?.email ? 'h-8' : 'h-0'}`} >{formState?.errors?.email?.type} </div>
            {email && <>
              {exists ?
                <>
                  <div className={`relative`}>
                    <input
                      {...register("password", { required: email || signUp })}
                      placeholder='your passworddd'
                      autoFocus={!editable}
                      control={control}
                      className={`bg-light text-dark w-full rounded my-0 px-2 py-2`}
                      type="password" />
                    <button
                      onClick={handleSubmit(signIn)}
                      className={`absolute right-2 h-full inset-y-0 text-dark text-2xl`} >
                      {loadinggggggg
                        ? <RiLoaderFill className={`animate-spin`} />
                        : <FaArrowCircleRight />}
                    </button>
                  </div>
                  <div className={`text-rose-700 mb-0 overflow-hidden ${formState?.errors?.password ? 'h-8' : 'h-0'}`} >{formState?.errors?.password?.type} </div>


                  <div className={`flex justify-between text-light`}>
                    <p>
                      <input
                        type="checkbox"
                        id="subscribeNews"
                        name="subscribe"
                        className={`mr-2 h-6 w-6 align-bottom`}
                        value="newsletter" />
                      Remember me
                    </p>
                    <a
                      href='/test'
                      className={`mx-2 font-light text-md text-light/70 hover:text-light`}>
                      reset password
                    </a>
                  </div>

                </>
                : <>
                  <input
                    placeholder='your passwordddddddd'
                    autoFocus={!editable}
                    control={control}
                    className={`bg-light text-dark w-full rounded my-0 px-2 py-2`}
                    {...register("password", { required: email || signIn })}
                    type="password" />
                  <div className={`text-rose-700 mb-0 overflow-hidden ${formState?.errors?.password ? 'h-8' : 'h-0'}`} >{formState?.errors?.password?.type} </div>
                  <input
                    {...register("password2", { required: email || signIn })}
                    placeholder='Confirm passworddd'
                    control={control}
                    className={`bg-light text-dark w-full rounded my-0 px-2 py-2`}
                    type="password" />
                  <div className={`text-rose-700 mb-0 overflow-hidden ${formState?.errors?.password2 ? 'h-8' : 'h-0'}`} >{formState?.errors?.password2?.type} </div>
                  <button
                    onClick={handleSubmit(signUp)}
                    className={`my-4 h-12 w-full bg-dark/30 hover:bg-dark/40 bg-gradient-to-b from-light/60 hover:from-secondaryLight to-light/60 hover:to-secondaryLight/80 hover:text-[22px] `}
                    type='submit' >
                    {loadinggggggg
                      ? <RiLoaderFill className={`animate-spin`} />
                      : <p>Create account</p>}
                  </button>
                </>}
            </>}
          </Form>
        </div>
      </div>
    </>
  )
}

export default Login