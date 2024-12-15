"use client";

import RightSide from "@/components/shared/RightSide";
import Button from "@/components/shared/SocialButton";
import Wrapper from "@/components/shared/Wrapper";
import SigninForm from "@/components/signin/SigninForm";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { metadata } from "./helper";

// export const metadata = {
//   title: "Giriş Yap | Yorumlar",
//   description: "Yorumlar hesabınıza giriş yapın",
//   keywords: "yorumlar, giriş yap, login",
// };
// console.log(
//   process.env.NEXT_PUBLIC_API_BASE_URL,
//   "process.env.NEXT_PUBLIC_API_BASE_URL"
// );
// console.log("process.env.NEXT_PUBLIC_API_BASE_URL");
const Page = () => {
  return (
    <Wrapper>
      {/* <div className="absolute top-8 left-8">
        <Link href="/">
          <Image
            src="/assets/main-logo.svg"
            alt="Logo"
            width={152}
            height={40}
            priority
            className="cursor-pointer dark:hidden"
          />
          <Image
            src="/assets/main-logo-dark.svg"
            alt="Logo"
            width={152}
            height={40}
            priority
            className="cursor-pointer hidden dark:block"
          />
        </Link>
      </div> */}
      <div className="flex gap-8 items-center justify-center min-h-screen ">
        {/*  Left Side  */}
        <div className="flex flex-col gap-4 items-center justify-center  flex-1 py-4  lg:mx-4 ">
          <div className="flex flex-col gap-4 w-full ">
            <div className="flex flex-col">
              <h2 className="text-[30px] text-black-primary dark:text-white font-bold">
                Giriş Yap
              </h2>
              <p className="text-grey dark:text-gray-300 font-medium text-base">
                Giriş yapmak için bilgilerinizi girin
              </p>
            </div>
            <div className="flex flex-col gap-6 my-4">
              <div className="flex gap-2 sm:flex-row flex-col">
                <Button>
                  <Image
                    src={"/assets/google.svg"}
                    width={24}
                    height={24}
                    className="w-[18px] h-[18px]"
                    alt="Google"
                  />
                  <span>Google</span>
                </Button>
                <Button>
                  <Image
                    src={"/assets/fb.svg"}
                    width={24}
                    height={24}
                    className="w-[18px] h-[18px]"
                    alt="Facebook"
                  />
                  <span>Facebook</span>
                </Button>
              </div>
              {/*  Line  */}
              <div className="flex items-center justify-center gap-2 ">
                <div className="h-px w-full bg-gradient-to-l from-[#E2E8F0] to-transparent"></div>
                <span className="text-grey dark:text-gray-300 text-sm whitespace-nowrap font-semibold">
                  veya email ile giriş yapın
                </span>
                <div className="h-px w-full bg-gradient-to-r from-[#E2E8F0] to-transparent"></div>
              </div>
            </div>
          </div>

          {/*  Login Form */}
          <SigninForm />
        </div>
        {/*  Right Side  */}
        <div className="hidden lg:flex flex-1 items-center justify-center ">
          <RightSide className={"min-h-[580px]"} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Page;
