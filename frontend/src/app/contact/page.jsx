'use client'
import Input from "@components/form/Input";
import Link from "next/link";

import { BiArrowToBottom, BiArrowFromBottom, BiChevronRight } from "react-icons/bi";
import { FiInstagram, FiLinkedin, FiGithub } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";

import { useForm, Form } from "react-hook-form";

const page = () => {
    const { register, control, handleSubmit, watch, formState: { errors }, } = useForm()

    const onSubmit = async (payload) => {
        console.log(payload)
        const res = await fetch("/rh/mail", { method: "POST", body: JSON.stringify(payload) })
        const data = await res.json()
        console.log(data)
    }

    return (
        <div
            className={`border-current relative max-h-screen w-screen font-custom2 px-4 sm:px-20 md:px-36 lg:px-56 duration-500 overflow-hidden ${false ? "mt--2 opacity-0" : " delay-300"}`} >
            <div className="pr-2 pl-2 sm:pl-0 backdrop-blur z-[4] w-3/5 sm:w-full font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl fixed pt-6 sm:pt-24 md:pt-32">
                <h1 className="whitespace-nowrap pb-2 pl-2 border-b-4 border-current w-min mb-4">
                    Contact
                </h1>
            </div>
            <div className={`md:grid overflow-auto mt-32 sm:mt-52 grid-cols-2 gap-20 p-2`}>

                <div className={`flex flex-col gap-2 h-fit p-4 md:shadow-arya rounded-lg mx-auto w-full max-md:order-first`}>
                    <div className='pb-2 flex flex-col text-2xl'>
                        <h1
                            className={`text-3xl flex gap-2 items-center`}>
                            <MdOutlineMailOutline />
                            Email
                        </h1>
                        <Link
                            className='text-xl pl-4 flex items-center hover:text-2xl h-10'
                            href={'mailto:arya.vaziri@gmail.com'}>
                            <BiChevronRight />
                            arya.vaziri@gmail.com
                        </Link>
                        <Link
                            className='text-xl pl-4 flex items-center hover:text-2xl h-10'
                            href={'mailto:info@aaryaa.ir'}>
                            <BiChevronRight />
                            iam@aryav.nl
                        </Link>
                    </div>
                    <div className='pb-2 flex flex-col text-2xl'>
                        <h1
                            className={`text-3xl flex gap-2 items-center`}>
                            <BsTelephone />
                            Telephone
                        </h1>
                        <div
                            className='text-xl pl-4 flex items-center hover:text-2xl h-10'>
                            <BiChevronRight />
                            +31 6 87 410328
                        </div>
                    </div>
                    <div className='pb-2 flex flex-col text-2xl'>
                        <h1
                            className={`text-3xl flex gap-2 items-center`}>
                            Follow me
                        </h1>
                        <div className='text-3xl flex justify-evenly w-full p-2'>
                            <Link
                                className='flex h-12 w-12 items-center hover:text-6xl'
                                target="_blank"
                                href={'https://www.instagram.com/aryavaziri'}>
                                <FiInstagram />
                            </Link>
                            <Link
                                className='flex h-12 w-12 items-center hover:text-6xl'
                                target="_blank"
                                href={'https://www.github.com/aryavaziri'}>
                                <FiGithub />
                            </Link>
                            <Link
                                className='flex h-12 w-12 items-center hover:text-6xl'
                                target="_blank"
                                href={'https://www.linkedin.com/in/arya-vaziri-7116ab206/'}>
                                <FiLinkedin />
                            </Link>

                        </div>
                    </div>
                </div>



                <Form control={control} className='flex flex-col gap-2 text-lg max-md:pb-8' onSubmit={handleSubmit(onSubmit)} >
                    <p className={`text-sm font-light text-justify p-2 pt-0`} >Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, consectetur veniam sapiente ab laborum eum iusto asperiores doloribus obcaecati vel reprehenderit.</p>
                    <Input
                        name='Name'
                        label
                        placeholder={`Your Name`}
                        control={control}
                        autoFocus
                        errors={errors}
                    />
                    <Input
                        name='Email'
                        placeholder={`Your Email`}
                        label
                        control={control}
                        errors={errors}
                        type='email'
                        required={"Please enter your email"}
                    />
                    <Input
                        control={control}
                        label
                        name='Subject'
                        errors={errors}
                    />
                    <Input
                        control={control}
                        name='Message'
                        errors={errors}
                        type='textarea'
                        label
                    />
                    <button
                        type="submit"
                        className={`flex justify-center relative items-center gap-2 text-2xl border-2 rounded h-12 px-4 ml-20 font-medium font-custom2 hover:text-3xl ${(false) ? "border-slate-500" : "border-c1"} `}>
                        <span>Submit</span>
                        <BiArrowFromBottom className='' />
                    </button>
                </Form>
            </div>
        </div>
    )
}
export default page;





const Social = ({ type }) => {
    // const [myContext, setMyContext] = useContext(Context);
    // useEffect(() => {
    //     console.log(type)
    // }, [])
    return (
        <div>
            <Link className={`flex gap-2 border items-center px-1 ${false ? "delay-700" : ""} `} href={`/contact`}>
                <BiArrowToBottom className='' />
                <p>{type}</p>
            </Link>
        </div>
    )
}

