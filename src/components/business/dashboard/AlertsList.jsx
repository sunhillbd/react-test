import { AlertCircle, Info, CheckCircle } from 'lucide-react';

export default function AlertsList() {
    const alerts = [
      {
        type: 'warning',
        message: '3 yanıt bekleyen yorum bulunuyor',
        time: '5 dakika önce'
      },
      {
        type: 'info',
        message: 'Yeni kampanya önerileri mevcut',
        time: '1 saat önce'
      },
      {
        type: 'success',
        message: 'Aylık rapor hazırlandı',
        time: '3 saat önce'
      }
    ];
  
    return (
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg flex items-start gap-3
              ${alert.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}
              ${alert.type === 'info' ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
              ${alert.type === 'success' ? 'bg-green-50 dark:bg-green-900/20' : ''}
            `}
          >
            <AlertCircle className={`w-5 h-5 mt-0.5
              ${alert.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' : ''}
              ${alert.type === 'info' ? 'text-blue-600 dark:text-blue-400' : ''}
              ${alert.type === 'success' ? 'text-green-600 dark:text-green-400' : ''}
            `} />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {alert.message}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {alert.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }