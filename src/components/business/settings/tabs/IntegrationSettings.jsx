"use client";
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { 
  CreditCard, 
  Truck, 
  MessageSquare, 
  BarChart4, 
  Share2,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const INTEGRATIONS = [
  {
    id: 'payment',
    name: 'Ödeme Sistemleri',
    description: 'İyzico, Stripe, PayTR gibi ödeme sistemleri entegrasyonları',
    icon: CreditCard,
    platforms: [
      { id: 'iyzico', name: 'iyzico', status: 'connected', apiKey: '****-****-****-1234' },
      { id: 'stripe', name: 'Stripe', status: 'not_connected' },
      { id: 'paytr', name: 'PayTR', status: 'not_connected' }
    ]
  },
  {
    id: 'shipping',
    name: 'Kargo Entegrasyonları',
    description: 'Yurtiçi, MNG, Aras gibi kargo firmaları entegrasyonları',
    icon: Truck,
    platforms: [
      { id: 'yurtici', name: 'Yurtiçi Kargo', status: 'connected', accountId: 'YK123456' },
      { id: 'mng', name: 'MNG Kargo', status: 'connected', accountId: 'MNG789012' },
      { id: 'aras', name: 'Aras Kargo', status: 'not_connected' }
    ]
  },
  {
    id: 'messaging',
    name: 'İletişim Platformları',
    description: 'WhatsApp, SMS, E-posta servisleri entegrasyonları',
    icon: MessageSquare,
    platforms: [
      { id: 'whatsapp', name: 'WhatsApp Business', status: 'not_connected' },
      { id: 'netgsm', name: 'NetGSM', status: 'not_connected' },
      { id: 'sendgrid', name: 'Sendgrid', status: 'not_connected' }
    ]
  }
];

export default function IntegrationSettings() {
  const { toast } = useToast();
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [platforms, setPlatforms] = useState(
    INTEGRATIONS.reduce((acc, integration) => {
      acc[integration.id] = integration.platforms;
      return acc;
    }, {})
  );

  const handleToggle = async (integrationId, platformId, currentStatus) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPlatforms(prev => ({
        ...prev,
        [integrationId]: prev[integrationId].map(platform => 
          platform.id === platformId 
            ? { ...platform, status: currentStatus === 'connected' ? 'not_connected' : 'connected' }
            : platform
        )
      }));

      toast({
        title: "Başarılı",
        description: currentStatus === 'connected' 
          ? "Platform bağlantısı kesildi"
          : "Platform başarıyla bağlandı",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "İşlem sırasında bir hata oluştu",
        variant: "destructive"
      });
    }
  };

  const renderPlatformDetails = (platform) => {
    if (platform.status !== 'connected') return null;

    const details = [];
    if (platform.apiKey) details.push(['API Key', platform.apiKey]);
    if (platform.accountId) details.push(['Hesap ID', platform.accountId]);
    if (platform.trackingId) details.push(['Tracking ID', platform.trackingId]);
    if (platform.pixelId) details.push(['Pixel ID', platform.pixelId]);
    if (platform.account) details.push(['Hesap', platform.account]);

    return details.map(([label, value]) => (
      <p key={label} className="text-xs text-gray-500 dark:text-gray-400">
        {label}: {value}
      </p>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Entegrasyonlar
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Üçüncü parti servisleri ve platformları yönetin
        </p>
      </div>

      <div className="space-y-6">
        {INTEGRATIONS.map((integration) => (
          <div
            key={integration.id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 
            dark:border-gray-700 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <integration.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {integration.name}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {integration.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIntegration(
                    selectedIntegration === integration.id ? null : integration.id
                  )}
                  className="text-sm font-medium text-primary hover:text-primary-600 
                  transition-colors"
                >
                  {selectedIntegration === integration.id ? 'Gizle' : 'Yönet'}
                </button>
              </div>

              {selectedIntegration === integration.id && (
                <div className="mt-6 space-y-4 border-t border-gray-100 
                dark:border-gray-700 pt-4">
                  {platforms[integration.id].map((platform) => (
                    <div
                      key={platform.id}
                      className="flex items-center justify-between py-3"
                    >
                      <div className="flex items-center space-x-3">
                        {platform.status === 'connected' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-400" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900 
                          dark:text-white">
                            {platform.name}
                          </p>
                          {renderPlatformDetails(platform)}
                        </div>
                      </div>
                      <Switch
                        checked={platform.status === 'connected'}
                        onCheckedChange={() => handleToggle(
                          integration.id, 
                          platform.id, 
                          platform.status
                        )}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}