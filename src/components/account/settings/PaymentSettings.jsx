"use client";
import { useState } from 'react';
import { CreditCard, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function PaymentSettings() {
  const [cards, setCards] = useState([
    {
      id: 1,
      type: 'mastercard',
      last4: '4242',
      expiry: '12/24',
      name: 'John Doe',
      default: true
    },
    {
      id: 2,
      type: 'visa',
      last4: '1234',
      expiry: '08/25',
      name: 'John Doe',
      default: false
    }
  ]);

  const handleRemoveCard = (cardId) => {
    if (cards.find(c => c.id === cardId)?.default) {
      toast.error('Varsayılan kart silinemez');
      return;
    }
    setCards(cards.filter(c => c.id !== cardId));
    toast.success('Kart silindi');
  };

  const handleSetDefault = (cardId) => {
    setCards(cards.map(card => ({
      ...card,
      default: card.id === cardId
    })));
    toast.success('Varsayılan kart güncellendi');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Kayıtlı Kartlar
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Ödeme yöntemlerinizi yönetin.
        </p>
        <div className="mt-4 space-y-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex items-center justify-between p-4 bg-gray-50 
              dark:bg-gray-800/50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <CreditCard className="w-6 h-6" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                    {card.type.toUpperCase()} •••• {card.last4}
                    {card.default && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        Varsayılan
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Son Kullanma: {card.expiry}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!card.default && (
                  <>
                    <button
                      onClick={() => handleSetDefault(card.id)}
                      className="text-sm text-primary hover:text-primary-600"
                    >
                      Varsayılan Yap
                    </button>
                    <button
                      onClick={() => handleRemoveCard(card.id)}
                      className="p-2 text-gray-500 hover:text-red-500 rounded-lg 
                      hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary 
        bg-primary/10 rounded-lg hover:bg-primary/20"
      >
        <Plus className="w-5 h-5" />
        Yeni Kart Ekle
      </button>

      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Fatura Adresi
        </h2>
        <div className="mt-4">
          <textarea
            rows={3}
            className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 
            dark:border-gray-700 rounded-lg"
            placeholder="Fatura adresinizi girin..."
          />
        </div>
      </div>
    </div>
  );
}