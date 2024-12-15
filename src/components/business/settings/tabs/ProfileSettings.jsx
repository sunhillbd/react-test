"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  updateBrandInfo,
  uploadBrandLogo,
  getBrandInfo,
} from "@/services/integrations/businessService";

export default function ProfileSettings({ brandData, setBrandData }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    description: "",
    logo: null,
    logoPreview: null,
    companyType: "",
    employeeCount: "",
    foundationYear: "",
    taxNumber: "",
    taxOffice: "",
    isActive: false,
    isFeatured: false,
    isPremium: false,
    verificationStatus: "pending",
    verificationNote: "",
  });
  const [loading, setLoading] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => {
    if (brandData) {
      setFormData({
        businessName: brandData.name || "",
        email: brandData.contact_email || "",
        phone: brandData.contact_phone || "",
        description: brandData.description || "",
        logo: brandData.logo || null,
        logoPreview: brandData.logo || null,
        companyType: brandData.company_type || "",
        employeeCount: brandData.employee_count || "",
        foundationYear: brandData.foundation_year || "",
        taxNumber: brandData.tax_number || "",
        taxOffice: brandData.tax_office || "",
        isActive: brandData.is_active || false,
        isFeatured: brandData.is_featured || false,
        isPremium: brandData.is_premium || false,
        verificationStatus: brandData.verification_status || "pending",
        verificationNote: brandData.verification_note || "",
      });
    }
  }, [brandData]);

  useEffect(() => {
    // Cleanup function to revoke object URLs when component unmounts
    // or when logoPreview changes
    return () => {
      if (
        formData?.logoPreview &&
        typeof formData.logoPreview === "string" &&
        formData.logoPreview.startsWith("blob:")
      ) {
        try {
          URL.revokeObjectURL(formData.logoPreview);
        } catch (error) {
          console.warn("Failed to revoke object URL:", error);
        }
      }
    };
  }, [formData?.logoPreview]);

  const handleBrandUpdate = async () => {
    try {
      const response = await getBrandInfo(brandData.id);
      if (response?.data) {
        setBrandData(response.data);

        // Update local form state with new data
        setFormData((prev) => ({
          ...prev,
          businessName: response.data.name || prev.businessName,
          email: response.data.contact_email || prev.email,
          phone: response.data.contact_phone || prev.phone,
          description: response.data.description || prev.description,
          logo: response.data.logo || prev.logo,
          logoPreview: response.data.logo || prev.logoPreview,
          companyType: response.data.company_type || prev.companyType,
          employeeCount: response.data.employee_count || prev.employeeCount,
          foundationYear: response.data.foundation_year || prev.foundationYear,
          taxNumber: response.data.tax_number || prev.taxNumber,
          taxOffice: response.data.tax_office || prev.taxOffice,
        }));
      }
    } catch (error) {
      console.error("Error updating brand data:", error);
    }
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Hata",
        description: "Logo dosyası 2MB'dan küçük olmalıdır",
        variant: "destructive",
      });
      return;
    }

    let localPreviewUrl;
    try {
      setUploadingLogo(true);

      // Create a local URL for preview
      localPreviewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        logo: file,
        logoPreview: localPreviewUrl,
      }));

      // Upload to server
      const response = await uploadBrandLogo(brandData.id, file);

      // Only update if component is still mounted and upload was successful
      if (response?.data?.data?.logo) {
        // Revoke the local preview URL before updating with server URL
        if (localPreviewUrl) {
          URL.revokeObjectURL(localPreviewUrl);
        }

        setFormData((prev) => ({
          ...prev,
          logoPreview: response.data.data.logo,
          logo: response.data.data.logo,
        }));

        await handleBrandUpdate();

        toast({
          title: "Başarılı",
          description: "Logo başarıyla yüklendi",
        });
      }
    } catch (error) {
      // Cleanup local preview URL on error
      if (localPreviewUrl) {
        URL.revokeObjectURL(localPreviewUrl);
      }

      toast({
        title: "Hata",
        description: error.message || "Logo yüklenirken bir hata oluştu",
        variant: "destructive",
      });

      // Reset to previous logo on error
      setFormData((prev) => ({
        ...prev,
        logo: brandData.logo || null,
        logoPreview: brandData.logo || null,
      }));
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Validate before setting loading state
    if (!formData.businessName.trim()) {
      toast({
        title: "Hata",
        description: "İşletme adı boş olamaz",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast({
        title: "Hata",
        description: "Geçerli bir e-posta adresi giriniz",
        variant: "destructive",
      });
      return;
    }

    if (!formData.phone.trim()) {
      toast({
        title: "Hata",
        description: "Telefon numarası boş olamaz",
        variant: "destructive",
      });
      return;
    }

    const updateData = {
      name: formData.businessName,
      contact_email: formData.email,
      contact_phone: formData.phone,
      description: formData.description,
      company_type: formData.companyType,
      employee_count: formData.employeeCount
        ? parseInt(formData.employeeCount)
        : null,
      foundation_year: formData.foundationYear
        ? parseInt(formData.foundationYear)
        : null,
      tax_number: formData.taxNumber?.trim() || "",
      tax_office: formData.taxOffice?.trim() || "",
    };

    try {
      setLoading(true);
      const response = await updateBrandInfo(brandData.id, updateData);

      if (response?.data?.data) {
        // Update brand first
        await handleBrandUpdate();

        toast({
          title: "Başarılı",
          description: "Profil bilgileriniz güncellendi",
        });
      }
    } catch (error) {
      if (error.response?.status === 422 && error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const firstError = Object.values(errors)[0][0];
        toast({
          title: "Doğrulama Hatası",
          description: firstError,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Hata",
          description: error.message || "Profil güncellenirken bir hata oluştu",
          variant: "destructive",
        });
      }
    } finally {
      // Set loading to false after everything is complete
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Logo Upload */}
        <div
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 
        dark:border-gray-700 p-6"
        >
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-4">
            İşletme Logosu
          </label>
          <div className="flex items-center gap-6">
            <div
              className="relative w-32 h-32 rounded-xl bg-gray-100 
            dark:bg-gray-700 overflow-hidden border-2 border-dashed 
            border-gray-300 dark:border-gray-600"
            >
              {formData.logoPreview ? (
                <Image
                  src={formData.logoPreview}
                  alt="Logo Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleLogoChange}
                disabled={uploadingLogo}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
              {uploadingLogo && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                PNG, JPG veya WEBP (max. 2MB)
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Önerilen boyut: 400x400px
              </p>
            </div>
          </div>
        </div>

        {/* İşletme Bilgileri */}
        <div
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 
        dark:border-gray-700 p-6"
        >
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            İşletme Bilgileri
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 
              dark:text-gray-200 mb-2"
              >
                İşletme Adı
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 
                focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 
              dark:text-gray-200 mb-2"
              >
                E-posta
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 
                focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 
              dark:text-gray-200 mb-2"
              >
                Telefon
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 
                focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 
              dark:text-gray-200 mb-2"
              >
                Vergi Numarası
              </label>
              <input
                type="text"
                value={formData.taxNumber}
                onChange={(e) =>
                  setFormData({ ...formData, taxNumber: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 
                focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 
              dark:text-gray-200 mb-2"
              >
                Vergi Dairesi
              </label>
              <input
                type="text"
                value={formData.taxOffice}
                onChange={(e) =>
                  setFormData({ ...formData, taxOffice: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 
                focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Açıklama */}
        <div
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 
        dark:border-gray-700 p-6"
        >
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            İşletme Açıklaması
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 
            dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 
            focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>

        {/* Kaydet Butonu */}
        <div className="flex justify-end">
          <button
            type="submit"
            className={`flex items-center justify-center px-4 py-2 text-sm font-medium text-white 
              bg-primary rounded-md hover:bg-primary/90 `}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Güncelleniyor...</span>
              </>
            ) : (
              <span>Değişiklikleri Kaydet</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
