"use client";

import { useState, useEffect } from "react";
import ProfileForm from "@/components/account/ProfileForm";
import AccountInfo from "@/components/account/AccountInfo";
import { useUser } from "@/services/User";

const AccountPage = () => {
  const [userData, setUserData] = useState(null);
  const { user, getUser } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        await getUser();
        return;
      }

      // Format user data for the components
      const formattedData = {
        id: user.id,
        fullName: user.name,
        email: user.email,
        avatar: user.avatar || null,
        phone: user.phone || "+90 555 123 4567",
        city: user.meta_data?.location || "Belirtilmemiş",
        createdAt: user.created_at,
        isVerified: !!user.email_verified_at,
        membershipLevel: user.type === "user" ? "Standart Üye" : "Premium Üye",
        stats: {
          totalComments: 0, // These could come from additional API calls if needed
          totalLikes: 0,
          following: 0,
        },
        notifications: {
          email: user.settings?.email_notifications || false,
          push: user.settings?.push_notifications || false,
          marketing: user.settings?.notification_preferences?.marketing || false,
        },
        preferences: {
          language: user.settings?.language || "tr",
          theme: "system",
        },
        meta: {
          bio: user.meta_data?.bio || "",
          website: user.meta_data?.website || "",
          social: user.meta_data?.social_links || {},
          lastLogin: user.meta_data?.last_login_at || "",
          device: user.meta_data?.last_login_device || {},
        }
      };

      setUserData(formattedData);
    };

    fetchData();
  }, [user, getUser]);

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 transition-all duration-300 ease-in-out">
      <div className="bg-white dark:bg-black-primary p-6 rounded-2xl shadow-sm transition-all duration-300 ease-in-out">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Profil Bilgileri
        </h1>
        <ProfileForm user={userData} />
      </div>

      <div className="bg-white dark:bg-black-primary p-6 rounded-2xl shadow-sm transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Hesap Bilgileri
        </h2>
        <AccountInfo user={userData} />
      </div>
    </div>
  );
};

export default AccountPage;
