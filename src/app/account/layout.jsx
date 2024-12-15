"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/account/Sidebar";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/services/User";
import { Skeleton } from "@/components/ui/Skeleton";

const AccountLayout = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const { user, getUser } = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        await getUser();
        return;
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
          <div className="pb-8">
            <Skeleton className="h-10 w-[152px]" />
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl transition-colors duration-200">
            <div className="flex flex-col lg:flex-row gap-8 p-8">
              <div className="w-full lg:w-64 space-y-6">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-8 w-3/4" />
              </div>
              <div className="flex-1 space-y-6">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <div className="pb-8">
          <Link href="/">
            <Image
              src="/assets/main-logo.svg"
              alt="Logo"
              width={152}
              height={40}
              priority
              className="cursor-pointer dark:hidden"
            />
            <Image
              src="/assets/main-logo-dark.svg"
              alt="Logo"
              width={152}
              height={40}
              priority
              className="cursor-pointer hidden dark:block"
            />
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl transition-colors duration-200">
          <div className="flex flex-col lg:flex-row gap-8 p-8">
            <Sidebar user={user} />
            <main className="flex-1 min-w-0">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
