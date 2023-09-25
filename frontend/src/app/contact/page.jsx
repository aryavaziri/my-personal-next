import Input from "@components/form/Input";
import Link from "next/link";

import { BiArrowToBottom } from "react-icons/bi";
import { BiArrowFromBottom } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import { BiChevronRight } from "react-icons/bi";
import { FiInstagram } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import { FiGithub } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";

const page = () => {
  return (
    <div
    className={`border-current relative max-h-screen w-screen font-custom2 px-4 sm:px-24 md:px-40 duration-500 overflow-hidden ${false ? "mt--2 opacity-0" : " delay-300"}`} >
      <div className="pr-4 pl-2 sm:pl-24 backdrop-blur z-[4] w-3/5 sm:w-full font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl fixed pt-6 sm:pt-24 md:pt-32">
        <h1 className="whitespace-nowrap pb-2 border-b-4 border-current w-min mb-4">
        Contact
        </h1>
      </div>
    <div className={`md:grid overflow-auto mt-32 sm:mt-52 py-4 grid-cols-2 gap-4`}>
        <form method='POST' action='/contact' className='flex flex-col md:px-8 gap-2 text-lg max-md:pb-8'>
            <Input
                title='Name'
                // onValueChange={(e) => { console.log(e) }}
            />
            <Input
                title='Email'
                // onValueChange={(e) => { console.log(e) }}
            />
            <Input
                title='Subject'
                // onValueChange={(e) => { console.log(e) }}
            />
            <Input
                title='Message'
                // onValueChange={(e) => { console.log(e) }}
            />
            <button
                target="_blank"
                download
                // onMouseEnter={() => setMyContext({ ...myContext, cursorh: true })}
                // onMouseLeave={() => setMyContext({ ...myContext, cursorh: false })}
                className={`flex justify-center mx-auto relative items-center gap-2 text-2xl border-2 w-fit rounded h-12 max-w-full w-52 min-w-fit px-4 font-medium font-custom2 hover:text-3xl ${(false) ? "border-slate-500" : "border-c1"} `}>
                <span>Submit</span>
                <BiArrowFromBottom className='' />
            </button>
        </form>
        {/* <hr className='my-8 sm:hidden' /> */}
        <div className={`flex flex-col gap-4 h-fit md:shadow-arya rounded-lg mx-auto p-4 w-4/5 md:order-first`}>
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

