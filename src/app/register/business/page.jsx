import RightSide from "@/components/shared/RightSide";
import Button from "@/components/shared/SocialButton";
import Wrapper from "@/components/shared/Wrapper";
import BusinessSignupForm from "@/components/signup/BusinessSignupForm";
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "Kurumsal Kayıt | Yorumlar",
  description: "Yorumlar kurumsal hesabınızı oluşturun",
  keywords: "yorumlar, kurumsal kayıt, işletme kaydı",
};

const Page = () => {
  return (
    <Wrapper>
      <div className="flex gap-8 my-8 items-start justify-center min-h-screen">
        {/* Sol Taraf */}
        <div className="flex flex-col gap-4 items-start justify-center flex-1 py-4 lg:mx-4">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col">
              <h2 className="text-[30px] text-black-primary dark:text-white font-bold">
                Kurumsal Kayıt
              </h2>
              <p className="text-grey dark:text-gray-300 font-medium text-base">
                İşletmenizi kaydetmek için bilgileri doldurun
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
                    alt="Google Business"
                  />
                  <span>Google Business</span>
                </Button>
              </div>
              {/* Ayırıcı Çizgi */}
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-full bg-gradient-to-l from-[#E2E8F0] to-transparent"></div>
                <span className="text-grey dark:text-gray-300 text-sm whitespace-nowrap font-semibold">
                  veya form ile kayıt ol
                </span>
                <div className="h-px w-full bg-gradient-to-r from-[#E2E8F0] to-transparent"></div>
              </div>
            </div>
          </div>
          {/* Kayıt Formu */}
          <BusinessSignupForm />
        </div>
        {/* Sağ Taraf */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <RightSide className={"min-h-[700px]"} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Page;
