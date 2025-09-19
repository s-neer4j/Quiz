import React, { useState, useEffect } from 'react';
import { QuizResult } from '../types';
import { ACHIEVEMENTS_LIST, AVATAR_LIST } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { useLocalization } from '../contexts/LocalizationContext';
import ProfileStats from './ProfileStats';

interface ProfileScreenProps {
    quizHistory: QuizResult[];
    onBack: () => void;
}

const inputClasses = "w-full px-4 py-3 rounded-xl border-2 border-slate-300 bg-white/40 backdrop-blur-sm text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-pink-400/50 focus:border-pink-500 transition-all";

const ProfileSkeleton: React.FC = () => (
    <div className="animate-pulse">
        <div className="flex flex-col items-center gap-4 mb-6">
            <div className="w-32 h-32 rounded-full bg-slate-300/50"></div>
        </div>
        <div className="space-y-6">
            <div className="h-12 w-full rounded-xl bg-slate-300/50"></div>
            <div className="h-12 w-full rounded-xl bg-slate-300/50"></div>
            <div className="grid grid-cols-6 gap-4 p-2 bg-slate-200/50 rounded-xl">
                {Array.from({ length: 6 }).map((_, i) => <div key={i} className="w-12 h-12 rounded-full bg-slate-300/50"></div>)}
            </div>
            <div className="h-12 w-full rounded-xl bg-slate-300/50"></div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/20">
            <div className="h-8 w-1/2 mx-auto bg-slate-300/50 rounded-lg mb-6"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-28 rounded-xl bg-slate-300/50"></div>)}
            </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/20">
            <div className="h-8 w-1/2 mx-auto bg-slate-300/50 rounded-lg mb-6"></div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {ACHIEVEMENTS_LIST.map((_, i) => <div key={i} className="w-20 h-20 rounded-full bg-slate-300/50 mx-auto"></div>)}
            </div>
        </div>
    </div>
);


const ProfileScreen: React.FC<ProfileScreenProps> = ({ quizHistory, onBack }) => {
    const { user, updateUser } = useAuth();
    const { t } = useLocalization();
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [picture, setPicture] = useState(user?.picture || '');

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 750);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPicture(user.picture);
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(user) {
            updateUser({ ...user, name, email, picture });
        }
    };

    if (!user) {
        return <div>{t('common.loading')}</div>;
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t('common.back')}
            </button>
            <div className="bg-white/60 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl border border-white/30">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6 text-center">{t('profile.title')}</h1>
                
                {isLoading ? <ProfileSkeleton /> : (
                <>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col items-center gap-4">
                            <img src={picture} alt="Profile" className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-yellow-400 object-cover" 
                                onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128` }}
                            />
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">{t('profile.nameLabel')}</label>
                            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className={inputClasses} required />
                        </div>
                         <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">{t('profile.emailLabel')}</label>
                            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClasses} required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">{t('profile.avatarLabel')}</label>
                            <div className="grid grid-cols-6 gap-2 sm:gap-4 p-2 bg-white/30 rounded-xl">
                                {AVATAR_LIST.map(avatarUrl => (
                                    <button
                                        type="button"
                                        key={avatarUrl}
                                        onClick={() => setPicture(avatarUrl)}
                                        className={`rounded-full p-1 transition-all duration-200 ${picture === avatarUrl ? 'ring-4 ring-yellow-400' : 'ring-2 ring-transparent hover:ring-yellow-500'}`}
                                        aria-label={`Select avatar ${avatarUrl}`}
                                        aria-pressed={picture === avatarUrl}
                                    >
                                        <img src={avatarUrl} alt="Avatar option" className="w-full h-full rounded-full" />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button type="submit" className="w-full mt-2 px-8 py-3 bg-orange-400 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-orange-500 transform hover:-translate-y-1 transition-all duration-300">
                            {t('profile.saveButton')}
                        </button>
                    </form>
                    
                    <ProfileStats user={user} quizHistory={quizHistory} />

                    <div className="mt-8 pt-6 border-t border-white/20">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 text-center mb-6">{t('profile.achievementsTitle')}</h2>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                            {ACHIEVEMENTS_LIST.map(achievement => {
                                const isUnlocked = user.unlockedAchievements.includes(achievement.id);
                                return (
                                    <div key={achievement.id} className="achievement-badge flex flex-col items-center justify-center text-center">
                                        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-3xl sm:text-4xl transition-all duration-300 ${
                                            isUnlocked 
                                            ? 'bg-yellow-400 text-black shadow-lg scale-105' 
                                            : 'bg-black/30 filter grayscale opacity-60'
                                        }`}>
                                            {achievement.icon}
                                        </div>
                                        <p className={`mt-2 text-xs sm:text-sm font-semibold ${isUnlocked ? 'text-slate-800' : 'text-slate-500'}`}>
                                            {achievement.name}
                                        </p>
                                        <div className="tooltip">
                                          <p className="font-bold">{achievement.name}</p>
                                          <p className="text-xs mt-1">{achievement.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
                )}
            </div>
        </div>
    );
};

export default ProfileScreen;
