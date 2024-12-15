"use client";

import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import PrimaryButton from "../shared/PrimaryButton";
import useUserStore from "@/stores/userStore";
import Link from "next/link";

export default function SignupForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  const { register, loading: isLoading } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!terms || !privacy) {
      setError("Lütfen kullanım koşullarını ve gizlilik politikasını kabul edin.");
      toast({
        title: "Hata",
        description: "Kullanım koşulları ve gizlilik politikası kabul edilmelidir.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await register({
        name,
        surname,
        email,
        password,
        password_confirmation: passwordConfirmation,
        terms,
        privacy,
      });

      if (result?.user) {
        toast({
          title: "Kayıt Başarılı",
          description: "Hesabınız başarıyla oluşturuldu!",
          variant: "success",
        });
        router.push("/account");
      } else {
        setError("Kayıt işlemi başarısız oldu");
        toast({
          title: "Kayıt Başarısız",
          description: "Lütfen bilgilerinizi kontrol edin.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Register error:", error);
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
      <div className="flex gap-4">
        <div className="flex flex-col flex-1">
          <label className="text-black-primary dark:text-white font-medium text-base mb-2">
            Ad<span className="text-primary">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full py-[9px] px-[12px] rounded-[50px] text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none"
            required
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-black-primary dark:text-white font-medium text-base mb-2">
            Soyad<span className="text-primary">*</span>
          </label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="w-full py-[9px] px-[12px] rounded-[50px] text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none"
            required
          />
        </div>
      </div>

      {/* Email field */}
      <div className="flex flex-col">
        <label className="text-black-primary dark:text-white font-medium text-base mb-2">
          E-posta<span className="text-primary">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-[9px] px-[12px] rounded-[50px] text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none"
          required
        />
      </div>

      {/* Password fields */}
      <div className="flex flex-col">
        <label className="text-black-primary dark:text-white font-medium text-base mb-2">
          Şifre<span className="text-primary">*</span>
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full py-[9px] px-[12px] rounded-[50px] text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-black-primary dark:text-white font-medium text-base mb-2">
          Şifre Tekrar<span className="text-primary">*</span>
        </label>
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className="w-full py-[9px] px-[12px] rounded-[50px] text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none"
          required
        />
      </div>

      {/* Terms and Privacy Checkboxes */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="terms"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            className="mt-1.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label 
            htmlFor="terms" 
            className="text-sm text-gray-600 dark:text-gray-300"
          >
            <span className="text-black-primary dark:text-white">
              Kullanım Koşullarını
            </span>{" "}
            kabul ediyorum.{" "}
            <Link 
              href="/terms" 
              className="text-primary hover:text-primary/80 underline"
              target="_blank"
            >
              Kullanım Koşullarını Oku
            </Link>
          </label>
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="privacy"
            checked={privacy}
            onChange={(e) => setPrivacy(e.target.checked)}
            className="mt-1.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label 
            htmlFor="privacy" 
            className="text-sm text-gray-600 dark:text-gray-300"
          >
            <span className="text-black-primary dark:text-white">
              Gizlilik Politikasını
            </span>{" "}
            kabul ediyorum.{" "}
            <Link 
              href="/privacy" 
              className="text-primary hover:text-primary/80 underline"
              target="_blank"
            >
              Gizlilik Politikasını Oku
            </Link>
          </label>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <PrimaryButton isLoading={isLoading}>
        {isLoading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
      </PrimaryButton>

      <p className="text-grey dark:text-gray-300 font-normal text-center my-2">
        Zaten hesabınız var mı?{" "}
        <Link
          href="/login"
          className="text-black-primary dark:text-white hover:text-primary transition-colors font-bold underline"
        >
          Giriş Yap
        </Link>
      </p>
    </form>
  );
}
