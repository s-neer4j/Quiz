import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocalization } from '../contexts/LocalizationContext';

interface HeaderProps {
    onHistoryClick: () => void;
    onLeaderboardClick: () => void;
    onProfileClick: () => void;
    onHomeClick: () => void;
    isMuted: boolean;
    onToggleMute: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHistoryClick, onLeaderboardClick, onProfileClick, onHomeClick, isMuted, onToggleMute }) => {
    const { user, logout } = useAuth();
    const { t } = useLocalization();

    if (!user) return null;

    return (
        <header className="flex flex-wrap justify-between items-center gap-2 p-2 sm:p-3 bg-white/60 backdrop-blur-md rounded-2xl border border-white/30 sticky top-2 sm:top-4 z-10">
            <div className="flex items-center gap-2">
                 <button onClick={onHomeClick} className="flex items-center gap-2 text-lg sm:text-xl font-black text-slate-800 hover:text-orange-500 transition-colors" aria-label={t('header.home')}>
                    <span role="img" aria-label={t('header.mascot')} className="text-2xl">🦉</span> 
                    <span className="hidden md:inline">Quizmaster Quest</span>
                 </button>
            </div>
            <div className="flex items-center gap-0.5 sm:gap-2">
                 <button onClick={onLeaderboardClick} title={t('header.leaderboard')} aria-label={t('header.leaderboard')} className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-white/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                 </button>
                 <button onClick={onHistoryClick} title={t('header.history')} aria-label={t('header.history')} className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-white/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                 </button>
                 <button onClick={onProfileClick} title={t('header.profile')} aria-label={t('header.profile')} className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-white/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                 </button>
                 <button onClick={onToggleMute} title={isMuted ? t('header.unmute') : t('header.mute')} aria-label={isMuted ? t('header.unmute') : t('header.mute')} className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-white/30 transition-colors">
                    {isMuted ? 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6m0-6l6 6m-3-11a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                    }
                 </button>
                <div className="flex items-center gap-2 sm:gap-3 pl-1 sm:pl-2">
                    <img 
                        src={user.picture} 
                        alt={user.name} 
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-yellow-400"
                    />
                    <div className="hidden md:block">
                        <p className="font-semibold text-slate-800 leading-tight text-sm">{user.name}</p>
                        <p className="text-xs text-slate-600 leading-tight truncate">{user.email}</p>
                    </div>
                </div>
                 <button onClick={logout} title={t('header.logout')} aria-label={t('header.logout')} className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-white/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                 </button>
            </div>
        </header>
    );
};

export default Header;
