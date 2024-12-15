"use client";
import { useEffect, useState } from "react";
import SettingsHeader from "@/components/business/settings/SettingsHeader";
import SettingsTabs from "@/components/business/settings/SettingsTabs";
import { getBrandInfo } from "@/services/integrations/businessService";
import { useUser } from "@/services/User";

export default function SettingsPage() {
  const [brandData, setBrandData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, getUser } = useUser();

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        if (user?.brand) {
          setBrandData(user.brand);
        }
      } catch (error) {
        console.error("Error fetching brand data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrandData();
  }, [user]);

  const handleBrandUpdate = async () => {
    try {
      const response = await getBrandInfo(user.brand.id);
      setTimeout(() => {
        setBrandData(response.data);
      }, 0);
    } catch (error) {
      console.error("Error updating brand data:", error);
      setBrandData(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <SettingsHeader brandData={brandData} />
      <SettingsTabs brandData={brandData} onBrandUpdate={handleBrandUpdate} />
    </div>
  );
}
