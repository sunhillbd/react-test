"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/business/products/ProductForm";
import { createProduct } from "@/services/integrations/productService";
import { toast } from "sonner";
import { useUser } from "@/services/User";

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const handleSubmit = async (formData, isDraft = false) => {

    if(user) {
      formData.brand_id = user?.brand?.id;
    }

    try {
      // Basic validation
      if (!formData.name?.trim()) {
        toast.error("Ürün adı zorunludur");
        return;
      }
      if (!formData.category_id) {
        toast.error("Kategori seçimi zorunludur");
        return;
      }
      if (!formData.type) {
        toast.error("Ürün tipi seçimi zorunludur");
        return;
      }
      if (!formData.price || formData.price <= 0) {
        toast.error("Geçerli bir fiyat girilmelidir");
        return;
      }
      if (!formData.stock || formData.stock < 0) {
        toast.error("Geçerli bir stok miktarı girilmelidir");
        return;
      }
      if (
        !formData.variants?.length ||
        !formData.variants.some((v) => v.price)
      ) {
        toast.error("En az bir varyant fiyatı girilmelidir");
        return;
      }

      if(formData.brand_id == '' || formData.brand_id == null) {
        toast.error("Marka seçimi zorunludur");
        return;
      }
      console.log(formData);

      setIsSubmitting(true);
      const productData = {
        ...formData,
        status: isDraft ? "draft" : formData.status || "active",
      };

      const response = await createProduct(productData);
      toast.success(
        isDraft ? "Ürün taslak olarak kaydedildi" : "Ürün başarıyla yayınlandı"
      );
      router.push("/business/products/list");
    } catch (error) {
      toast.error(error.message || "Bir hata oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/business/products/list"
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Yeni Ürün Ekle
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Yeni bir ürün eklemek için formu doldurun
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() =>
              document
                .getElementById("product-form")
                .dispatchEvent(
                  new Event("submit", { cancelable: true, bubbles: true })
                )
            }
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Kaydediliyor..." : "Taslak Olarak Kaydet"}
          </button>
          <button
            onClick={() =>
              document
                .getElementById("product-form")
                .dispatchEvent(
                  new Event("submit", { cancelable: true, bubbles: true })
                )
            }
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Yayınlanıyor..." : "Yayınla"}
          </button>
        </div>
      </div>

      {/* Form */}
      <ProductForm id="product-form" onSubmit={handleSubmit} />
    </div>
  );
}
