import RightSide from "@/components/shared/RightSide";
import Button from "@/components/shared/SocialButton";
import Wrapper from "@/components/shared/Wrapper";
import SignupForm from "@/components/signup/SignupForm";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { ROUTES } from "@/constants";
import ResetForm from "@/components/reset-password/RestForm";

export const metadata = {
  title: "Kayıt Ol | Yorumlar",
  description: "Yorumlar hesabınızı oluşturun",
  keywords: "yorumlar, kayıt ol, üye ol",
};

const Page = () => {
  return (
    <Wrapper>
      <div className="flex gap-8 items-center justify-center min-h-screen">
        {/* Sol Taraf */}
        <div className="flex flex-col gap-4 items-center justify-center flex-1 py-4 lg:mx-4">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col">
              <h2 className="text-[30px] text-black-primary dark:text-white font-bold">
                Şifre Sıfırla
              </h2>
              <p className="text-grey dark:text-gray-300 font-medium text-base">
                Yeni şifrenizi belirlemek için aşağıdaki formu doldurun
              </p>
              {/* <Link
                href={ROUTES.BUSINESS_REGISTER}
                className="text-primary hover:text-primary/80 text-sm mt-2 font-medium"
              >
                İşletme sahibiyim, kurumsal kayıt olmak istiyorum →
              </Link> */}
            </div>
            {/* <div className="flex flex-col gap-6 my-4"> */}
              {/* <div className="flex gap-2 sm:flex-row flex-col">
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
              </div> */}
              {/* Ayırıcı Çizgi
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-full bg-gradient-to-l from-[#E2E8F0] to-transparent"></div>
                <span className="text-grey dark:text-gray-300 text-sm whitespace-nowrap font-semibold">
                  veya e-posta ile kayıt ol
                </span>
                <div className="h-px w-full bg-gradient-to-r from-[#E2E8F0] to-transparent"></div>
              </div> */}
            {/* </div> */}
          </div>
          {/* Kayıt Formu */}
          <ResetForm />
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
