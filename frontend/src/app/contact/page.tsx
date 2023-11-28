"use client";
import Input from "@components/form/Input3";
import Link from "next/link";

import { BiArrowFromBottom, BiChevronRight } from "react-icons/bi";
import { FiInstagram, FiLinkedin, FiGithub } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useForm, Form } from "react-hook-form";
import { useEffect, useState } from "react";
import OK from "@components/modals/OK";

const schema = z.object({
  name: z
    .string()
    .min(1, "This field is required.")
    .max(12, "This field must be 12 characters or less."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "This field is Required")
    .email("Invalid Email"),
  subject: z.string().optional(),
  message: z
    .string()
    .min(20, "Please enter a message that is at least 20 characters long.")
    .max(200, "This field must be 200 characters or less."),
});

type UserInputs = z.infer<typeof schema>;

const page = () => {
  const [emailModal, setEmailModal] = useState<String>("");
  const { register, control, handleSubmit, watch, formState } =
    useForm<UserInputs>({
      defaultValues: {
        name: "",
        email: "",
        message: "",
        subject: "",
      },
      resolver: zodResolver(schema),
    });
  useEffect(() => {
    console.log(formState.errors);
  }, [formState]);

  const onSubmit = async (payload: UserInputs) => {
    console.log(payload);
    const res = await fetch("/rh/mail", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const { data } = await res.json();
    console.log(data);
    setEmailModal(data.message);
  };

  return (
    <div
      className={`border-current relative w-screen font-custom2 px-4 sm:px-20 md:px-36 lg:px-56 duration-500 overflow-hidden ${
        false ? "mt--2 opacity-0" : " delay-300"
      }`}
    >
      <div className="pr-2 pl-2 sm:pl-0 backdrop-blur z-[4] w-3/5 sm:w-full font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl fixed pt-6 sm:pt-24 md:pt-28">
        <h1 className="whitespace-nowrap pb-2 pl-2 border-b-4 border-current w-min mb-4">
          Contact
        </h1>
      </div>
      <div
        className={`grid grid-cols-1 mt-20 h-auto overflow-y-scroll noscroll-bar sm:mt-48 md:grid-cols-2 gap-8 sm:gap-16 p-2`}
      >
        <div
          className={`flex flex-col gap-2 h-fit p-4 md:shadow-arya bg-gradient-to-b to-arya1/50 from-arya1/10 dark:from-dark/60 dark:to-gradientDark/40 rounded-lg mx-auto w-full max-md:order-first`}
        >
          <div className="pb-2 flex flex-col text-2xl">
            <h1 className={`text-3xl flex gap-2 items-center`}>
              <MdOutlineMailOutline />
              Email
            </h1>
            <Link
              className="text-xl pl-4 flex items-center hover:text-2xl h-10"
              href={"mailto:arya.vaziri@gmail.com"}
            >
              <BiChevronRight />
              arya.vaziri@gmail.com
            </Link>
            <Link
              className="text-xl pl-4 flex items-center hover:text-2xl h-10"
              href={"mailto:info@aaryaa.ir"}
            >
              <BiChevronRight />
              iam@aryav.nl
            </Link>
          </div>
          <div className="pb-2 flex flex-col text-2xl">
            <h1 className={`text-3xl flex gap-2 items-center`}>
              <BsTelephone />
              Telephone
            </h1>
            <div className="text-xl pl-4 flex items-center hover:text-2xl h-10">
              <BiChevronRight />
              +31 6 87 410328
            </div>
          </div>
          <div className="pb-2 flex flex-col text-2xl">
            <h1 className={`text-3xl flex gap-2 items-center`}>Follow me</h1>
            <div className="text-3xl flex justify-evenly w-full p-2">
              <Link
                className="flex h-12 w-12 items-center hover:text-6xl"
                target="_blank"
                href={"https://www.instagram.com/aryavaziri"}
              >
                <FiInstagram />
              </Link>
              <Link
                className="flex h-12 w-12 items-center hover:text-6xl"
                target="_blank"
                href={"https://www.github.com/aryavaziri"}
              >
                <FiGithub />
              </Link>
              <Link
                className="flex h-12 w-12 items-center hover:text-6xl"
                target="_blank"
                href={"https://www.linkedin.com/in/arya-vaziri-7116ab206/"}
              >
                <FiLinkedin />
              </Link>
            </div>
          </div>
        </div>

        <Form
          control={control}
          className="flex flex-col gap-2 text-lg max-md:pb-8"
        >
          <OK
            active={emailModal}
            setActive={setEmailModal}
            message={emailModal}
          />
          <Input
            name="name"
            label
            placeholder={`Your Name`}
            control={control}
            autoFocus
          />
          <Input
            name="email"
            placeholder={`Your Email`}
            label
            control={control}
            type="email"
          />
          <Input
            control={control}
            label
            name="subject"
          />
          <Input
            control={control}
            name="message"
            type="textarea"
            label
          />
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className={`flex justify-center relative items-center gap-2 text-2xl border-2 rounded h-12 px-4 ml-20 font-medium font-custom2 hover:text-3xl dark:border-light`}
          >
            <span>Submit</span>
            <BiArrowFromBottom className="" />
          </button>
        </Form>
      </div>
    </div>
  );
};
export default page;
