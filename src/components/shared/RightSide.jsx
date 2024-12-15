import Image from "next/image";
import React from "react";
import Link from "next/link";

const RightSide = ({ className }) => {
  return (
    <div
      className={`relative w-full h-full  bg-[#F1F5F9] rounded-[20px] ${className} `}
    >
      {/* Logo */}
      <div className="absolute top-8 right-8 flex items-center gap-2 z-[2000]">
        <Link href="/" className="relative w-[133px] h-[30px] cursor-pointer">
          <div className="w-[133px] h-[30px] relative">
            <Image
              src={"/assets/logo.svg"}
              fill
              alt="Logo"
              className="w-full h-full absolute object-fill"
            />
          </div>
        </Link>
      </div>
      <div className="absolute top-0 right-0 z-[1000]">
        <div className="relative w-[600px] max-w-full h-[290px] ">
          <Image
            src={"/assets/vector.png"}
            fill
            alt="Vector"
            className="w-full h-full absolute object-fill"
          />
        </div>
      </div>

      {/* Main Illustration */}
      <div className="absolute inset-0    flex items-end justify-center">
        <div className="relative w-[400px]  h-[330px] ">
          <Image
            src={"/assets/hand.png"}
            fill
            alt="Illustration"
            className="w-full h-full absolute object-fill"
          />
        </div>
      </div>
    </div>
  );
};

export default RightSide;
