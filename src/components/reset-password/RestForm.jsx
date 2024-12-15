"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import PrimaryButton from "../shared/PrimaryButton";
import apiService from "@/services/apiService";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ROUTES } from "@/constants";

const ResetForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const emailFromUrl = searchParams.get("email");
    const tokenFromUrl = searchParams.get("token");
    if (emailFromUrl) setEmail(emailFromUrl);
    if (tokenFromUrl) setToken(tokenFromUrl);
  }, [searchParams]);

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validatePassword(password)) {
      setError(
        "Şifre en az 8 karakter, bir büyük harf, bir küçük harf, bir sayı ve bir özel karakter içermelidir."
      );
      toast({
        title: "Geçersiz Şifre",
        description: "Şifreniz gerekli kriterlere uymuyor.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      toast({
        title: "Şifre Hatası",
        description: "Şifreler eşleşmiyor.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiService.post("/api/v1/auth/reset-password", {
        email,
        password,
        password_confirmation: password,
        token,
      });

      if (response?.success) {
        toast({
          title: "Başarılı",
          description: "Şifreniz başarıyla sıfırlandı! Giriş sayfasına yönlendiriliyorsunuz.",
          variant: "success",
        });
        router.push(ROUTES.LOGIN);
      } else {
        setError(response?.message || "Şifre sıfırlama sırasında bir hata oluştu.");
        toast({
          title: "Hata",
          description: response?.message || "Şifre sıfırlama sırasında bir hata oluştu.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      setError("Bir şeyler yanlış gitti, lütfen tekrar deneyin.");
      toast({
        title: "Sunucu Hatası",
        description: "Şifre sıfırlama sırasında bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
          disabled
          className="w-full py-[9px] px-[12px] rounded-[50px] text-black-primary dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 outline-none cursor-not-allowed"
          placeholder="ornek@email.com"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-black-primary dark:text-white font-medium text-base mb-2">
          Yeni Şifre<span className="text-primary">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-[9px] px-[12px] rounded-[50px] text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none"
            placeholder="********"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black-primary dark:text-white"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <label className="text-black-primary dark:text-white font-medium text-base mb-2">
          Yeni Şifre Tekrar<span className="text-primary">*</span>
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full py-[9px] px-[12px] rounded-[50px] text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none"
            placeholder="********"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black-primary dark:text-white"
          >
            {showConfirmPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <PrimaryButton isLoading={isLoading}>
        {isLoading ? "Yükleniyor..." : "Şifreyi Sıfırla"}
      </PrimaryButton>

      <p className="text-grey dark:text-gray-300 font-normal text-center my-2">
        Giriş sayfasına dönmek için{" "}
        <Link
          href={ROUTES.LOGIN}
          className="text-black-primary dark:text-white hover:text-primary transition-colors font-bold underline"
        >
          tıklayın
        </Link>
      </p>
    </form>
  );
};

export default ResetForm;
