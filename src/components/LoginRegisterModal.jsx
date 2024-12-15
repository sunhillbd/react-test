"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/constants';

const LoginRegisterModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-medium text-black-primary dark:text-white">
            Lütfen Giriş Yapın veya Kayıt Olun
          </h3>
          <button
            onClick={onClose}
            className="text-grey hover:text-black-primary dark:hover:text-white transition-colors"
          >
            &times;
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-grey dark:text-gray-300">
            Geri bildiriminizi göndermek için lütfen giriş yapın veya hesap oluşturun.
          </p>
          <div className="flex gap-4">
            <Link href={ROUTES.LOGIN} className="flex-1 bg-primary text-white py-3.5 px-5 rounded-full flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
              Giriş Yap
            </Link>
            <Link href={ROUTES.REGISTER} className="flex-1 border border-gray-200 dark:border-gray-700 text-black-primary dark:text-white py-3.5 px-5 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Kayıt Ol
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterModal;
