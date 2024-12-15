"use client";
import { Calendar, Award, Shield, Activity } from 'lucide-react';

export default function AccountInfo({ user }) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Üyelik Tarihi</div>
            <div className="font-medium text-gray-900 dark:text-white">
              {new Date(user?.createdAt).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
          <Shield className="w-5 h-5 text-gray-400" />
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Hesap Durumu</div>
            <div className="font-medium text-gray-900 dark:text-white">
              {user?.isVerified ? 'Doğrulanmış' : 'Doğrulanmamış'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
          <Award className="w-5 h-5 text-gray-400" />
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Üyelik Seviyesi</div>
            <div className="font-medium text-gray-900 dark:text-white">
              {user?.membershipLevel}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Son Aktiviteler
          </h3>
          <div className="space-y-3">
            {user?.recentActivities?.map((activity) => (
              <div 
                key={activity.id}
                className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-900 dark:text-white">
                      {activity.description}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.target}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(activity.date).toLocaleDateString('tr-TR')}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            İstatistikler
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">Toplam Yorum</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {user?.stats?.totalComments}
              </span>
            </div>
            <div className="flex justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">Beğeni Sayısı</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {user?.stats?.totalLikes}
              </span>
            </div>
            <div className="flex justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">Takip Edilen</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {user?.stats?.following}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}