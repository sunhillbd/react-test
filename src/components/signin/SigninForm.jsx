"use client";

import React, { useState } from "react";
import apiService from "@/services/apiService";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import PrimaryButton from "../shared/PrimaryButton";
import Link from "next/link";
import useUserStore from "@/stores/userStore";

export default function SigninForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Get login and loading state from userStore
  const { login, loading: isLoading } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await login({ email, password });

      if (result?.user) {
        toast({
          title: "Başarıyla giriş yapıldı",
          description: "Hoş geldiniz!",
          variant: "success",
        });

        console.log(result);
        if (result.user?.type === "brand") {
          router.push("/business");
        } else {
          router.push("/account");
        }
      } else {
        setError("Giriş bilgileri hatalı");
        toast({
          title: "Giriş Başarısız",
          description: "E-posta veya şifre yanlış.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      toast({
        title: "Hata",
        description: "Bir şeyler yanlış gitti, lütfen tekrar deneyin.",
        variant: "destructive",
      });
    }
  };

  return (
    <form className="flex flex-col w-full space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label className="text-black-primary dark:text-white font-medium text-base mb-2">
          E-posta<span className="text-primary">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-[9px] px-[12px] rounded-[50px] text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none"
          placeholder="ornek@email.com"
          required
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-black-primary dark:text-white font-medium text-base mb-2">
          Şifre<span className="text-primary">*</span>
        </label>
        <div className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-[9px] px-[12px] rounded-[50px] text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none"
            placeholder="********"
            required
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <PrimaryButton isLoading={isLoading}>
        {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
      </PrimaryButton>
      <div className="flex flex-col items-center gap-2">
        <Link
          href="/forgot-password"
          className="text-grey dark:text-gray-300 hover:text-primary transition-colors text-sm"
        >
          Şifrenizi mi unuttunuz?
        </Link>

        <p className="text-grey dark:text-gray-300 font-normal text-center">
          Hesabınız yok mu?{" "}
          <Link
            href="/register"
            className="text-black-primary dark:text-white hover:text-primary transition-colors font-bold underline"
          >
            Kayıt Ol
          </Link>
        </p>
      </div>
    </form>
  );
}
