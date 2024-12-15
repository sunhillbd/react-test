"use client";
import { useState } from 'react';
import { X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export function TeamInviteModal({ isOpen, onClose }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    role: 'editor',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Başarılı",
        description: "Davet e-postası gönderildi",
        variant: "success"
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Hata",
        description: "Davet gönderilirken bir hata oluştu",
        variant: "destructive"
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Ekip Üyesi Davet Et
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 
            dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              E-posta Adresi
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
              rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary 
              dark:bg-gray-700"
              placeholder="ornek@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Rol
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
              rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary 
              dark:bg-gray-700"
            >
              <option value="admin">Admin</option>
              <option value="editor">Editör</option>
              <option value="viewer">Görüntüleyici</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Davet Mesajı (Opsiyonel)
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
              rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary 
              dark:bg-gray-700"
              rows={3}
              placeholder="Davet mesajınızı yazın..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 
              hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary 
              hover:bg-primary-600 rounded-lg transition-colors"
            >
              Davet Gönder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}