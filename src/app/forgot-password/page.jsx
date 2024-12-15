import ForgetForm from "@/components/forgot-password/ForgetForm";
import RightSide from "@/components/shared/RightSide";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";

export const metadata = {
  title: 'Şifremi Unuttum | Yorumlar',
  description: 'Yorumlar hesabınızın şifresini sıfırlayın',
  keywords: 'yorumlar, şifremi unuttum, şifre sıfırlama'
};

const Page = () => {
  return (
    <Wrapper>
      <div className="flex gap-8 items-center justify-center min-h-screen">
        {/* Sol Taraf */}
        <div className="flex flex-col gap-4 items-center justify-center flex-1 py-4 lg:mx-4">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <h2 className="text-[30px] text-black-primary dark:text-white font-bold text-center">
                Şifremi Unuttum
              </h2>
              <p className="text-grey dark:text-gray-300 font-medium text-base text-center">
                E-posta adresinizi girin, şifrenizi sıfırlamanız için bir bağlantı göndereceğiz
              </p>
            </div>
          </div>

          {/* Şifre Sıfırlama Formu */}
          <ForgetForm />
        </div>
        {/* Sağ Taraf */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <RightSide className={"min-h-[580px]"} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Page;