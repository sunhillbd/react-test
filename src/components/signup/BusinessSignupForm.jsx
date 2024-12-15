"use client";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import PrimaryButton from "../shared/PrimaryButton";
import { ROUTES } from "@/constants";
import { registerBusiness } from "@/services/integrations/businessService";
import { getBrandCategories } from "@/services/integrations/categoryService";
import { Button } from "@headlessui/react";
import Image from "next/image";


const BusinessSignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  // İşletme bilgileri
  const [businessName, setBusinessName] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");

  // Yetkili bilgileri
  const [authorizedName, setAuthorizedName] = useState("");
  const [authorizedPhone, setAuthorizedPhone] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Add new state variables for required fields
  const [taxOffice, setTaxOffice] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [description, setDescription] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getBrandCategories();
        setCategories(response.data || []);
      } catch (error) {
        console.error("Categories could not be fetched:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation checks
    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor");
      setIsLoading(false);
      return;
    }

    if (taxNumber.length > 50) {
      setError("Vergi numarası 50 karakterden uzun olamaz");
      setIsLoading(false);
      return;
    }

    try {
      const businessData = {
        name: businessName,
        category_id: businessCategory,
        description: description || "İşletme açıklaması",
        contact_email: email,
        contact_phone: authorizedPhone,
        tax_number: taxNumber,
        tax_office: taxOffice,
        company_type: companyType,
        address: businessAddress,
        authorized_person: authorizedName,
        password: password,
        password_confirmation: confirmPassword,
      };

      await registerBusiness(businessData);
      setSuccessMessage("Kayıt işlemi başarılı bir şekilde tamamlandı. Lütfen e-posta adresinize gönderilen doğrulama bağlantısını tıklayarak hesabınızı aktifleştirin.");
    } catch (error) {
      setError(
        error.response?.data?.message || 
        "Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form 
      className="flex flex-col w-full space-y-4" 
      onSubmit={handleSubmit}
      style={{ pointerEvents: successMessage ? 'none' : 'auto', opacity: successMessage ? 0.7 : 1 }}
    >
      {/* İşletme Bilgileri Başlığı */}
      <h3 className="text-black-primary dark:text-white font-semibold text-lg">
        İşletme Bilgileri
      </h3>

      <div className="flex flex-col">
        <label className="text-black-primary dark:text-white font-medium text-base mb-2">
          İşletme Adı<span className="text-primary">*</span>
        </label>
        <input
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="w-full py-[9px] px-[12px] rounded-[50px] text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none"
          placeholder="ABC İşletmesi Ltd. Şti."
          required
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-black-primary dark:text-white font-medium text-base mb-2">
            Vergi Numarası<span className="text-primary">*</span>
          </label>
          <input
            type="text"
            value={taxNumber}
            onChange={(e) => setTaxNumber(e.target.value)}
            className="w-full py-[9px] px-[12px] rounded-[50px] text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none"
            placeholder="1234567890"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-black-primary dark:text-white font-medium text-base mb-2">
            Vergi Dairesi<span className="text-primary">*</span>
          </label>
          <input
            type="text"
            value={taxOffice}
            onChange={(e) => setTaxOffice(e.target.value)}
            className="w-full py-[9px] px-[12px] rounded-[50px] text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none"
            placeholder="Vergi Dairesi"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-black-primary dark:text-white font-medium text-base mb-2">
            Şirket Türü<span className="text-primary">*</span>
          </label>
          <select
            value={companyType}
            onChange={(e) => setCompanyType(e.target.value)}
            className="w-full py-[9px] px-[12px] rounded-[50px] text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none"
            required
          >
            <option value="">Şirket Türü Seçin</option>
            <option value="individual">Şahıs Şirketi</option>
            <option value="limited">Limited Şirket</option>
            <option value="corporation">Anonim Şirket</option>
            <option value="other">Diğer</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-black-primary dark:text-white font-medium text-base mb-2">
            İşletme Telefonu<span className="text-primary">*</span>
          </label>
          <input
            type="tel"
            value={businessPhone}
            onChange={(e) => setBusinessPhone(e.target.value)}
            className="w-full py-[9px] px-[12px] rounded-[50px] text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none"
            placeholder="+90 (___) ___ __ __"
            required
          />
        </div>

        <div className="flex flex-col sm:col-span-2">
          <label className="text-black-primary dark:text-white font-medium text-base mb-2">
            İşletme Adresi<span className="text-primary">*</span>
          </label>
          <textarea
            value={businessAddress}
            onChange={(e) => setBusinessAddress(e.target.value)}
            className="w-full py-[9px] px-[12px] rounded-[20px] text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none min-h-[80px]"
            placeholder="İşletme açık adresi"
            required
          />
        </div>

        <div className="flex flex-col sm:col-span-2">
          <label className="text-black-primary dark:text-white font-medium text-base mb-2">
            İşletme Kategorisi<span className="text-primary">*</span>
          </label>
          <select
            value={businessCategory}
            onChange={(e) => setBusinessCategory(e.target.value)}
            className="w-full py-[9px] px-[12px] rounded-[50px] text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none"
            required
          >
            <option value="">Kategori Seçin</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-black-primary dark:text-white font-medium text-base mb-2">
            İşletme Açıklaması<span className="text-primary">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full py-[9px] px-[12px] rounded-[20px] text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none min-h-[80px]"
            placeholder="İşletmenizi kısaca tanıtın"
            required
          />
        </div>
      </div>

      {/* Yetkili Bilgileri Başlığı */}
      <h3 className="text-black-primary dark:text-white font-semibold text-lg pt-2">
        Yetkili Bilgileri
      </h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-black-primary dark:text-white font-medium text-base mb-2">
            Yetkili Adı Soyadı<span className="text-primary">*</span>
          </label>
          <input
            type="text"
            value={authorizedName}
            onChange={(e) => setAuthorizedName(e.target.value)}
            className="w-full py-[9px] px-[12px] rounded-[50px] text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none"
            placeholder="Ahmet Yılmaz"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-black-primary dark:text-white font-medium text-base mb-2">
            Yetkili Telefonu<span className="text-primary">*</span>
          </label>
          <input
            type="tel"
            value={authorizedPhone}
            onChange={(e) => setAuthorizedPhone(e.target.value)}
            className="w-full py-[9px] px-[12px] rounded-[50px] text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none"
            placeholder="+90 (___) ___ __ __"
            required
          />
        </div>

        <div className="flex flex-col sm:col-span-2">
          <label className="text-black-primary dark:text-white font-medium text-base mb-2">
            E-posta<span className="text-primary">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-[9px] px-[12px] rounded-[50px] text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none"
            placeholder="ornek@sirket.com"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-black-primary dark:text-white font-medium text-base mb-2">
            Şifre<span className="text-primary">*</span>
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
              {showPassword ? (
                <EyeOff className="w-[20px] h-[20px]" />
              ) : (
                <Eye className="w-[20px] h-[20px]" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-black-primary dark:text-white font-medium text-base mb-2">
            Şifre Tekrar<span className="text-primary">*</span>
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
              {showConfirmPassword ? (
                <EyeOff className="w-[20px] h-[20px]" />
              ) : (
                <Eye className="w-[20px] h-[20px]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="space-y-6">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{successMessage}</span>
          </div>
          
          <div className="flex flex-col gap-4">
            <p className="text-grey dark:text-gray-300 text-center">
              Diğer seçenekler
            </p>
            
            <div className="flex gap-4">
              <Link 
                href={ROUTES.LOGIN}
                className="flex-1 bg-primary text-white py-3.5 px-5 rounded-full flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                Giriş Yap
              </Link>
              <Link 
                href={ROUTES.REGISTER}
                className="flex-1 border border-gray-200 dark:border-gray-700 text-black-primary dark:text-white py-3.5 px-5 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Bireysel Kayıt
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-full bg-gradient-to-l from-[#E2E8F0] to-transparent"></div>
              <span className="text-grey dark:text-gray-300 text-sm whitespace-nowrap font-semibold">
                veya sosyal medya ile giriş yapın
              </span>
              <div className="h-px w-full bg-gradient-to-r from-[#E2E8F0] to-transparent"></div>
            </div>

            <div className="flex gap-2 sm:flex-row flex-col">
              <Button>
                <Image
                  src="/assets/google.svg"
                  width={24}
                  height={24}
                  className="w-[18px] h-[18px]"
                  alt="Google"
                />
                <span>Google</span>
              </Button>
              <Button>
                <Image
                  src="/assets/fb.svg"
                  width={24}
                  height={24}
                  className="w-[18px] h-[18px]"
                  alt="Facebook"
                />
                <span>Facebook</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <PrimaryButton isLoading={isLoading}>
        {isLoading ? "Yükleniyor..." : "Kurumsal Kayıt Oluştur"}
      </PrimaryButton>

      <p className="text-grey dark:text-gray-300 font-normal text-center my-2">
        Zaten hesabınız var mı?{" "}
        <Link
          href={ROUTES.LOGIN}
          className="text-black-primary dark:text-white hover:text-primary transition-colors font-bold underline"
        >
          Giriş Yap
        </Link>
      </p>
    </form>
  );
};

export default BusinessSignupForm;
