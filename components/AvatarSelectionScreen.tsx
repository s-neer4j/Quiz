import React, { useState } from 'react';
import { AVATAR_LIST } from '../constants';
import { useLocalization } from '../contexts/LocalizationContext';

interface AvatarSelectionScreenProps {
  onAvatarSelect: (avatarUrl: string) => void;
}

const AvatarSelectionScreen: React.FC<AvatarSelectionScreenProps> = ({ onAvatarSelect }) => {
  const { t } = useLocalization();
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedAvatar) {
      onAvatarSelect(selectedAvatar);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-white/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/30 max-w-2xl w-full text-center">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-800 mb-2">{t('avatar.title')}</h1>
            <p className="text-md sm:text-lg text-slate-600 mb-8">{t('avatar.subtitle')}</p>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-8">
                {AVATAR_LIST.map(avatar => (
                    <button
                        key={avatar}
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none ${selectedAvatar === avatar ? 'bg-yellow-400 ring-4 ring-yellow-300' : 'bg-white/40'}`}
                        aria-label={`Select avatar ${avatar}`}
                        aria-pressed={selectedAvatar === avatar}
                    >
                        <img src={avatar} alt="Avatar" className="w-full h-auto rounded-full" />
                    </button>
                ))}
            </div>

            <button
                onClick={handleConfirm}
                disabled={!selectedAvatar}
                className="w-full sm:w-auto px-10 py-3 bg-orange-400 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:-translate-y-1 transition-all duration-300"
            >
                {t('avatar.confirm')}
            </button>
        </div>
    </div>
  );
};

export default AvatarSelectionScreen;
