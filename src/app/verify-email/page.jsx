"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import RightSide from "@/components/shared/RightSide";
import Wrapper from "@/components/shared/Wrapper";
import { verifyEmail } from "@/services/integrations/userService";
import Button from "@/components/shared/SocialButton";
import Image from "next/image";
import { ROUTES } from "@/constants";

const Page = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const handleEmailVerification = async () => {
      const id = searchParams.get('id');
      const hash = searchParams.get('hash');
      const expires = searchParams.get('expires');
      const signature = searchParams.get('signature');

      if (!id || !hash || !expires || !signature) {
        setStatus('error');
        setMessage('Geçersiz doğrulama bağlantısı');
        return;
      }

      const result = await verifyEmail(id, hash, expires, signature);
      if (result.success) {
        setStatus('success');
        setMessage(result.message);

        // Start countdown
        const timer = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(timer);
          window.location.href = ROUTES.LOGIN;
        }, 5000);
      } else {
        setStatus('error');
        setMessage(result.message);
      }
    };

    handleEmailVerification();
  }, [searchParams]);

  return (
    <Wrapper>
      <div className="flex gap-8 items-center justify-center min-h-screen">
        {/* Sol Taraf */}
        <div className="flex flex-col gap-4 items-center justify-center flex-1 py-4 lg:mx-4">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <h2 className="text-[30px] text-black-primary dark:text-white font-bold text-center">
                E-posta Doğrulama
              </h2>
              
              {status === 'verifying' && (
                <p className="text-grey dark:text-gray-300 font-medium text-base text-center">
                  E-posta adresiniz doğrulanıyor, lütfen bekleyin...
                </p>
              )}

              {status === 'success' && (
                <div className="flex flex-col gap-2">
                  <p className="text-green-600 dark:text-green-400 font-medium text-base text-center">
                    {message}
                  </p>
                  <p className="text-grey dark:text-gray-300 text-sm text-center">
                    {countdown} saniye içinde giriş sayfasına yönlendirileceksiniz...
                  </p>
                </div>
              )}

              {status === 'error' && (
                <p className="text-red-600 dark:text-red-400 font-medium text-base text-center">
                  {message}
                </p>
              )}
            </div>
          </div>
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