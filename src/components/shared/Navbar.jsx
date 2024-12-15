"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, Sun, Menu, X, Moon } from "lucide-react";
import Wrapper from "./Wrapper";
import { useTheme } from "next-themes";
import { ROUTES } from "@/constants";
import useUserStore from "@/stores/userStore";
import logout from "@/services/logout";
import { useRouter } from "next/navigation";
import { ChevronDown, UserCircle, LogOut, Settings } from "lucide-react";

import { useUser } from "@/services/User";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, getUser } = useUser();
  console.log("user", user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  const toggleTheme = () => {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  };

  const searchInputRef = useCallback(
    (inputElement) => {
      if (inputElement && isSearchExpanded) {
        inputElement.focus();
      }
    },
    [isSearchExpanded]
  );

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 900);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const toggleSearch = () => setIsSearchExpanded(!isSearchExpanded);
  const toggleMobileSearch = () => setIsMobileSearchOpen(!isMobileSearchOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSearchExpanded && !event.target.closest(".search-container")) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchExpanded]);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLinks = () => (
    <>
      <Link
        href="/complaints"
        className="text-lg font-medium text-black-primary dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
      >
        Yorumlar
      </Link>
      <Link
        href="/brands"
        className="text-lg font-medium text-black-primary dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
      >
        Markalar
      </Link>
    </>
  );

  const handleLogout = async () => {
    await logout(router);
  };

  const ActionButtons = () => (
    <>
      {user ? (
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 text-base font-medium text-black-primary dark:text-white hover:text-primary transition-colors"
          >
            <UserCircle className="size-[22px]" />
            <span>{user.name}</span>
            <ChevronDown className="size-[18px]" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-black-primary border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-20">
                <div className="py-2">
                  <Link
                    href="/account"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Settings className="size-[18px]" />
                    Hesap Ayarları
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <LogOut className="size-[18px]" />
                    Çıkış Yap
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <Link
            href={ROUTES.LOGIN}
            className="text-base font-medium text-black-primary dark:text-white hover:text-primary transition-colors"
          >
            Giriş Yap / Kayıt Ol
          </Link>
          <Link
            href="/create-complaint"
            className="bg-primary text-white text-base gap-1 hover:bg-primary/90 text-center rounded-full py-3.5 px-5 flex items-center justify-center hover:bg-primary-dark transition-colors"
          >
            Yorumla <ArrowRight className="text-white size-[18px] ml-1.5" />
          </Link>
        </>
      )}
    </>
  );

  const IconButtons = () => (
    <div className="flex items-center space-x-4">
      {/*  For Large Screen Only */}
      <div className="hidden lg:block relative search-container">
        <div className="flex items-center">
          <div
            className={`flex items-center ${
              isSearchExpanded
                ? "bg-gray-100 dark:bg-black-primary"
                : "bg-white dark:bg-black-primary"
            } rounded-full overflow-hidden transition-all duration-300 ease-in-out ${
              isSearchExpanded ? "w-64" : "w-10"
            }`}
          >
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Yorumları Ara..."
              className={` border-none outline-none bg-transparent  py-2 px-4 w-full ${
                isSearchExpanded ? "opacity-100" : "opacity-0"
              } transition-opacity duration-300 ease-in-out`}
            />
            <button
              aria-label="Yorumları Ara..."
              className={`flex items-center ${
                isSearchExpanded ? "bg-transparent" : "bg-white"
              } dark:bg-black-primary justify-center w-10 h-10 focus:outline-none`}
              onClick={toggleSearch}
            >
              <Search
                className={`size-[22px] text-black-primary dark:text-white ${
                  !isSearchExpanded && "-translate-x-5 bg-transparent"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
      {/*  For mobile screen Only search bar Other is same   */}
      <button
        aria-label="Yorumları Ara..."
        className="flex lg:hidden items-center justify-center w-10 h-10 focus:outline-none"
        onClick={toggleMobileSearch}
      >
        <Search className={`size-[18px] text-black-primary dark:text-white`} />
      </button>
      <button
        aria-label="Toggle theme"
        className="focus:outline-none"
        onClick={toggleTheme}
      >
        {theme === "dark" ? (
          <Sun className="size-[22px] text-black-primary dark:text-white" />
        ) : (
          <Moon className="size-[22px] text-black-primary dark:text-white" />
        )}
      </button>
    </div>
  );

  return (
    <div
      className={`border-b border-gray-100/20 dark:border-gray-800/20 transition-all duration-300
      ${isScrolled ? "bg-white dark:bg-black-primary" : "bg-transparent"}`}
    >
      <Wrapper className="my-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Link href="/">
              <Image
                priority
                src={
                  theme === "dark"
                    ? "/assets/main-logo-dark.svg"
                    : "/assets/main-logo.svg"
                }
                alt="Logo"
                width={152}
                height={40}
                className="cursor-pointer"
              />
            </Link>

            {!isSmallScreen && (
              <>
                <span className="text-[#E2E8F0] dark:text-gray-700 text-[30px]">
                  /
                </span>
                <div className="flex gap-4 items-center">
                  <NavLinks />
                </div>
              </>
            )}
          </div>

          {isSmallScreen ? (
            <div className="flex items-center space-x-4">
              <IconButtons />
              <button
                onClick={toggleDrawer}
                aria-label="Open menu"
                className="focus:outline-none"
              >
                <Menu className="size-[22px] text-black-primary dark:text-white" />
              </button>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <IconButtons />
              <ActionButtons />
            </div>
          )}
        </div>

        {/* Mobil Search Overlay */}
        {isMobileSearchOpen && (
          <div className="fixed inset-0 bg-white dark:bg-black-primary z-50 lg:hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex-1 mr-4">
                  <input
                    type="text"
                    placeholder="Yorumları Ara..."
                    autoFocus
                    className="w-full py-2 px-4 bg-transparent border-none outline-none text-black-primary dark:text-white"
                  />
                  <button
                    aria-label="Yorumları Ara..."
                    className="flex items-center justify-center w-10 h-10 focus:outline-none"
                  >
                    <Search className="size-[18px] text-black-primary dark:text-white" />
                  </button>
                </div>
                <button
                  onClick={() => setIsMobileSearchOpen(false)}
                  className="focus:outline-none"
                >
                  <X className="size-[22px] text-black-primary dark:text-white" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Drawer for small screens */}
        <div
          className={`fixed top-0 left-0 h-full w-full bg-white dark:bg-black-primary shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <Link href="/">
                <Image
                  src={
                    theme === "dark"
                      ? "/assets/main-logo-dark.svg"
                      : "/assets/main-logo.svg"
                  }
                  alt="Logo"
                  width={152}
                  height={40}
                  className="cursor-pointer"
                />
              </Link>
              <button
                onClick={toggleDrawer}
                className="focus:outline-none"
                aria-label="Close menu"
              >
                <X className="size-[22px] text-black-primary dark:text-white" />
              </button>
            </div>
            <div className="mb-6">
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <input
                  type="text"
                  placeholder="Yorumları Ara..."
                  className="w-full py-2 px-4 bg-transparent border-none outline-none text-black-primary dark:text-white"
                />
                <button
                  aria-label="Search"
                  className="flex items-center justify-center w-10 h-10 focus:outline-none"
                >
                  <Search className="size-[18px] text-black-primary dark:text-white" />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <NavLinks />
              <div className="flex flex-col gap-4 mb-4">
                {user ? (
                  <>
                    <Link
                      href="/account"
                      className="flex items-center gap-2 text-base font-medium text-black-primary dark:text-white"
                    >
                      <Settings className="size-[18px]" />
                      Hesap Ayarları
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-base font-medium text-red-600"
                    >
                      <LogOut className="size-[18px]" />
                      Çıkış Yap
                    </button>
                  </>
                ) : (
                  <ActionButtons />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Overlay */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black  bg-opacity-50 z-40"
            onClick={toggleDrawer}
          ></div>
        )}
      </Wrapper>
    </div>
  );
}
