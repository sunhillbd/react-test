"use client";
import { useState } from 'react';
import { toast } from 'sonner';
import { updateEmail } from '../../../services/integrations/userService';

export default function EmailSettings() {
  const [email, setEmail] = useState('user@example.com');
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = async (e) => {
    e.preventDefault();
    
    try {
      if (!newEmail || !password) {
        toast.error('Tüm alanları doldurun');
        return;
      }

      setIsLoading(true);

      const response = await updateEmail({
        email: newEmail,
        password: password
      });

      if (response.success) {
        toast.success(response.message);
        setEmail(newEmail);
        setNewEmail('');
        setPassword('');
      } else {
        toast.error(response.message);
      }

    } catch (error) {
      toast.error(error.message || 'E-posta güncellenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          E-posta Adresini Değiştir
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Mevcut e-posta: {email}
        </p>
        <form onSubmit={handleEmailChange} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Yeni E-posta
            </label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              disabled={isLoading}
              className="mt-1 w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-300 
              dark:border-gray-700 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Mevcut Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="mt-1 w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-300 
              dark:border-gray-700 rounded-lg"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-primary 
            rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'İşleniyor...' : 'Değişikliği Onayla'}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          E-posta Doğrulama
        </h2>
        <div className="mt-4">
          <button
            onClick={() => toast.success('Doğrulama e-postası gönderildi')}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 
            rounded-lg hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Doğrulama E-postası Gönder
          </button>
        </div>
      </div>
    </div>
  );
}