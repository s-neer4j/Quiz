import React from 'react';
import { Achievement } from '../types';
import { useLocalization } from '../contexts/LocalizationContext';

interface AchievementToastProps {
  achievement: Achievement;
}

const AchievementToast: React.FC<AchievementToastProps> = ({ achievement }) => {
  const { t } = useLocalization();
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-auto max-w-xs sm:max-w-sm bg-gradient-to-br from-yellow-400 to-orange-500 text-black p-4 rounded-xl shadow-2xl flex items-center gap-4 animate-toast-in-out z-50">
      <span className="text-4xl">{achievement.icon}</span>
      <div>
        <p className="font-bold text-sm">{t('achievementToast.title')}</p>
        <p className="text-sm">{achievement.name}</p>
      </div>
    </div>
  );
};

export default AchievementToast;
