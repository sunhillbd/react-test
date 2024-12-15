"use client";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Camera,
  Mail,
  Phone,
  Building2,
  UserRound,
  FileText,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import apiService from "@/services/apiService";
import { Skeleton } from "@/components/ui/Skeleton";
import { updateAvatar } from "@/services/integrations/userService";

export function ProfileForm() {
  const [business, setBusiness] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.get("api/v1/profile");
        if (response?.data?.attributes) {
          const businessData = response.data.attributes;
          setBusiness(businessData);
          setAvatarPreview(response.data.media?.avatar?.original || null);

          // Set form values
          setValue("name", businessData.name);
          setValue("phone", businessData.contact?.phone);
          setValue("email", businessData.contact?.email);
          setValue("website", businessData.website);
          setValue("title", businessData.title);
          setValue("bio", businessData.bio);
        }
      } catch (error) {
        console.error("Error fetching business data:", error);
        toast.error("Bir hata oluştu, lütfen tekrar deneyin.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinessData();
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Dosya boyutu 2MB'dan küçük olmalıdır.");
        return;
      }

      try {
        setIsAvatarLoading(true);
        
        // Show preview immediately
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload to server
        const response = await updateAvatar(file);
        if (response.data?.media?.avatar?.original) {
          setAvatarPreview(response.data.media.avatar.original);
          toast.success("Profil fotoğrafı güncellendi.");
        }
      } catch (error) {
        toast.error(error.message || "Profil fotoğrafı güncellenirken bir hata oluştu.");
        // Revert preview on error
        if (business?.avatar) {
          setAvatarPreview(business.avatar);
        }
      } finally {
        setIsAvatarLoading(false);
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const response = await apiService.put("api/v1/profile", {
        name: data.name,
        website: data.website,
        title: data.title,
        bio: data.bio,
        phone: data.phone,
        contact: {
          email: data.email,
        },
      });

      if (response.status === 200) {
        toast.success("İşletme profili güncellendi.");
        setBusiness((prevBusiness) => ({
          ...prevBusiness,
          ...data,
        }));
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating business profile:", error);
      toast.error("Bir hata oluştu, lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  const ActionButtons = () => {
    if (isEditing) {
      return (
        <div className="flex justify-end gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-600 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Kaydediliyor...
              </div>
            ) : (
              "Kaydet"
            )}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(false);
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 
            dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            İptal
          </button>
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setIsEditing(true);
        }}
        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 
        dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        Düzenle
      </button>
    );
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-6">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
      {/* Profil Fotoğrafı */}
      <div className="flex items-center gap-6">
        <div className="relative group">
          <div
            className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-pointer"
            onClick={handleAvatarClick}
          >
            {isAvatarLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : avatarPreview ? (
              <Image
                src={avatarPreview}
                alt="Profile"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                {business?.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          {isEditing && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 
              group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={handleAvatarClick}
            >
              <Camera className="w-6 h-6 text-white" />
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Profil Fotoğrafı
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            JPG, GIF veya PNG. Maksimum 2MB.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ad Soyad */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">
            Ad Soyad
          </label>
          <input
            {...register("name", { required: "Ad soyad zorunludur" })}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-700 disabled:opacity-75"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* E-posta */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">
            E-posta
          </label>
          <input
            {...register("email")}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-700 disabled:opacity-75"
          />
        </div>

        {/* Telefon */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">
            Telefon
          </label>
          <input
            {...register("phone", {
              pattern: {
                value: /^(\+90|0)?[0-9]{10}$/,
                message: "Geçerli bir telefon numarası giriniz",
              },
            })}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-700 disabled:opacity-75"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Website */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">
            Website
          </label>
          <input
            {...register("website")}
            disabled={!isEditing}
            placeholder="https://example.com"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-700 disabled:opacity-75"
          />
        </div>

        {/* Ünvan */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">
            Ünvan
          </label>
          <input
            {...register("title")}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-700 disabled:opacity-75"
          />
        </div>
      </div>

      {/* Biyografi */}
      <div className="space-y-2">
        <label className="text-sm text-gray-600 dark:text-gray-400">
          Biyografi
        </label>
        <textarea
          {...register("bio")}
          disabled={!isEditing}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
          focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-700 disabled:opacity-75"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <ActionButtons />
      </div>
    </form>
  );
}
