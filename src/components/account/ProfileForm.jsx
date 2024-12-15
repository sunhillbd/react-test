"use client";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Camera, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import Image from "next/image";
import apiService from "@/services/apiService";
import { Skeleton } from "@/components/ui/Skeleton";
import { updateAvatar } from "@/services/integrations/userService";

export default function ProfileForm() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.get("api/v1/profile");
        if (response?.data?.attributes) {
          const userData = response.data.attributes;
          setUser(userData);
          setAvatarPreview(response.data.media?.avatar?.original || null);
          setValue("name", userData.name);
          setValue("phone", userData.contact?.phone);
          setValue("email", userData.contact?.email);
          setValue("city", userData.location?.city);
        } else {
          toast.error("Kullanıcı bilgileri alınamadı.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Bir hata oluştu, lütfen tekrar deneyin.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
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
        
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);

        const response = await updateAvatar(file);
        if (response.data?.media?.avatar?.original) {
          setAvatarPreview(response.data.media.avatar.original);
          toast.success("Profil fotoğrafı güncellendi.");
        }
      } catch (error) {
        toast.error(error.message || "Profil fotoğrafı güncellenirken bir hata oluştu.");
        if (user?.avatar) {
          setAvatarPreview(user.avatar);
        }
      } finally {
        setIsAvatarLoading(false);
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
  
      const updatedData = {
        name: data.name,
        contact: {
          phone: data.phone,
          email: user.contact.email,
        },
        location: {
          city: data.city,
        },
      };
  
      const response = await apiService.put("api/v1/profile", updatedData);
  
      if (response.status === 200) {
        toast.success("Profil bilgileri güncellendi.");
  
        setUser((prevUser) => ({
          ...prevUser,
          name: updatedData.name,
          contact: {
            ...prevUser.contact,
            phone: updatedData.contact.phone,
          },
          location: {
            ...prevUser.location,
            city: updatedData.location.city,
          },
        }));
  
        setIsEditing(false); 
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Bir hata oluştu, lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                {user?.name?.charAt(0).toUpperCase()}
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
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {user?.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user?.contact.email}
          </p>
        </div>

        <div className="flex gap-3">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 
              dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Düzenle
            </button>
          ) : (
            <>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-600 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Kaydet"
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 
                dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                İptal
              </button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">
            Ad Soyad
          </label>
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
            {isEditing ? (
              <input
                {...register("name", { required: "Ad soyad zorunludur" })}
                disabled={!isEditing}
                className="w-full px-4 py-3 bg-transparent outline-none disabled:opacity-75"
              />
            ) : (
              <span className="text-gray-600 dark:text-gray-400">
                {user?.name}
              </span>
            )}
          </div>
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">
            E-posta
          </label>
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
            <Mail className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">
              {user?.contact.email}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">
            Telefo
          </label>
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
            <Phone className="w-5 h-5 text-gray-400" />
            {isEditing ? (
              <input
                {...register("phone", {
                  pattern: {
                    value: /^(\+90|0)?[0-9]{10}$/,
                    message: "Geçerli bir telefon numarası giriniz",
                  },
                })}
                disabled={!isEditing}
                className="w-full bg-transparent outline-none disabled:opacity-75"
              />
            ) : (
              <span className="text-gray-600 dark:text-gray-400">
                {user?.contact?.phone}
              </span>
            )}
          </div>
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">
            Şehir
          </label>
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
            <MapPin className="w-5 h-5 text-gray-400" />
            {isEditing ? (
              <input
                {...register("city")}
                disabled={!isEditing}
                className="w-full bg-transparent outline-none disabled:opacity-75"
              />
            ) : (
              <span className="text-gray-600 dark:text-gray-400">
                {user?.location?.city}
              </span>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
