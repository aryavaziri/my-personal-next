import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div className="h-auto min-h-screen flex flex-col">
      <div className="pr-4 pl-2 sm:pl-12 md:pl-24 lg:pl-48 backdrop-blur z-[3] w-[65vw] font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl fixed pt-6 sm:pt-10">
        <h1 className="whitespace-nowrap pb-2 border-b-4 border-current w-min">
          About me
        </h1>
      </div>
      <div className="flex pb-24">
        <div className="z-[2] pt-20 sm:pt-24 md:pt-32 lg:pt-36  pl-2 sm:pl-12 md:pl-24 pr-8 lg:pl-48 w-[60vw] sm:w-[70vw] text-justify md:w-2/3 text-md sm:text-lg md:text-2xl">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic
            deserunt esse vero exercitationem, aspernatur odio porro
            perferendis? Unde animi porro quibusdam quod facilis? Eum quis animi
            iusto ipsum praesentium, sapiente, aut, tenetur recusandae similique
            dolorum maxime consequatur illo. Quasi quos, tempora similique, a
            ullam totam consequuntur vitae obcaecati nobis mollitia dolores
            aliquid itaque iste exercitationem dicta molestias repudiandae nisi
            minus saepe. Vel maxime dolorem assumenda nobis consequuntur eius
            ipsam debitis recusandae sapiente nesciunt, sunt at sed laborum
            itaque est numquam, impedit odit a neque? Atque eos tempore, autem
            qui in at sequi repellendus placeat neque necessitatibus magni
            nesciunt dolorem ratione!
          </p>
          <br />
          <div className="flex justify-between w-full px-2 sm:px-4 md:px-12 my-6">
            <button className="border border-current rounded-lg px-4 sm:px-6 py-2 hover:shadow-lg hover:shadow-arya2">
              Button1
            </button>
            <button className="border border-current rounded-lg px-4 sm:px-6 py-2 hover:shadow-lg hover:shadow-arya2">
              Button2
            </button>
          </div>
          <p className="my-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            commodi reiciendis, et perferendis ipsum fuga! Sit consectetur velit
            veritatis voluptates. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Aperiam tempore dolores, error aut nobis molestiae
            et dolorum nihil doloribus soluta corrupti reiciendis voluptates
            iure, nisi neque, cumque sed maiores exercitationem.
          </p>
        </div>
        <div className="fixed sm:self-end z-[1] bg-right bottom-0 right-0 h-screen w-screen sm:w-1/2 md:w-1/3 md:shadow-xl md:shadow-white ">
          <Image
            className={`md:object-cover object-contain object-right-bottom lg:object-right-top`}
            src="/images/about-rm.png"
            fill
            alt="Profile picture"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
