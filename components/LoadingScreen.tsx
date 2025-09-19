import React from 'react';
import IconicMascot from './IconicMascot';
import { useLocalization } from '../contexts/LocalizationContext';

const LoadingScreen: React.FC = () => {
  const { t } = useLocalization();
  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="text-center">
        <IconicMascot className="text-6xl animate-pulse" />
        <p className="mt-4 text-xl font-bold text-slate-700">{t('common.loading')}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
