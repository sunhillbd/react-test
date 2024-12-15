"use client";
import { useState } from "react";
import ProfileSettings from "./tabs/ProfileSettings";
import NotificationSettings from "./tabs/NotificationSettings";
import SecuritySettings from "./tabs/SecuritySettings";
import IntegrationSettings from "./tabs/IntegrationSettings";

const TABS = [
  { id: "profile", label: "Profil" },
  { id: "notifications", label: "Bildirimler" },
  { id: "security", label: "Güvenlik" },
  { id: "integrations", label: "Entegrasyonlar" },
];

export default function SettingsTabs({ brandData, onBrandUpdate }) {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileSettings
            brandData={brandData}
            onBrandUpdate={onBrandUpdate}
          />
        );
      case "notifications":
        return <NotificationSettings />;
      case "security":
        return <SecuritySettings />;
      case "integrations":
        return <IntegrationSettings />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8" aria-label="Tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">{renderTabContent()}</div>
    </div>
  );
}
