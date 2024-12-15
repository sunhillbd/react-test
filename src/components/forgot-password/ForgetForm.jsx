"use client";

import { useState } from "react";
import Link from "next/link";
import PrimaryButton from "../shared/PrimaryButton";
import { useToast } from "@/components/ui/use-toast";
import apiService from "@/services/apiService";

const ForgetForm = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiService.post("/api/v1/auth/forgot-password", {
        email,
      });

      if (response?.success) {
        toast({
          title: "Başarılı!",
          description:
            "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.",
          variant: "success",
        });
        setEmail("");
      } else {
        toast({
          title: "Hata",
          description:
            response?.message || "Bir sorun oluştu. Lütfen tekrar deneyin.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Hata",
        description: "Bir şeyler yanlış gitti. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-black-primary dark:text-white font-medium text-base"
        >
          E-posta<span className="text-primary">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          className="w-full py-[9px] px-[12px] rounded-[50px] text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none"
          placeholder="ornek@email.com"
          required
        />
      </div>

      <PrimaryButton isLoading={isLoading}>
        {isLoading ? "Gönderiliyor..." : "Gönder"}
      </PrimaryButton>

      <p className="text-grey dark:text-gray-300 font-normal text-center my-2">
        <Link
          href={"/login"}
          className="text-black-primary dark:text-white font-bold underline hover:text-primary transition-colors"
        >
          Giriş Yap
        </Link>{" "} 
        <br />
        sayfasına geri dön
      </p>
    </form>
  );
};

export default ForgetForm;
