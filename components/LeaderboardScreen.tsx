import React, { useMemo, useState, useEffect } from 'react';
import { QuizResult } from '../types';
import { LEADERBOARD_DATA } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { useLocalization } from '../contexts/LocalizationContext';

interface LeaderboardScreenProps {
    history: QuizResult[];
    onBack: () => void;
}

const SkeletonLeaderboardItem: React.FC = () => (
    <div className="flex items-center gap-3 sm:gap-4 p-3 bg-slate-200/50 rounded-xl animate-pulse">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-300/50"></div>
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-300/50"></div>
        <div className="h-6 bg-slate-300/50 rounded flex-1"></div>
        <div className="h-8 bg-slate-300/50 rounded w-20"></div>
    </div>
);

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ history, onBack }) => {
    const { user } = useAuth();
    const { t } = useLocalization();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 750);
        return () => clearTimeout(timer);
    }, []);

    const leaderboard = useMemo(() => {
        if (!user) return [];
        
        const userTotalScore = history.reduce((acc, result) => acc + result.score, 0);

        const otherPlayers = LEADERBOARD_DATA.map(player => ({
            name: player.name,
            score: player.score,
            picture: `https://api.dicebear.com/8.x/bottts/svg?seed=${encodeURIComponent(player.name)}`,
            isCurrentUser: false,
        }));
        
        const currentUserEntry = {
            name: user.name,
            picture: user.picture,
            score: userTotalScore,
            isCurrentUser: true,
        };

        const combinedData = [...otherPlayers, currentUserEntry];
        return combinedData.sort((a, b) => b.score - a.score);
    }, [history, user]);

    const getRankContent = (rank: number) => {
        if (rank === 0) return '🥇';
        if (rank === 1) return '🥈';
        if (rank === 2) return '🥉';
        return rank + 1;
    }
    
    const getRankBG = (rank: number) => {
        if (rank === 0) return 'bg-yellow-500 text-black';
        if (rank === 1) return 'bg-gray-400 text-black';
        if (rank === 2) return 'bg-yellow-700 text-white';
        return 'bg-white/40 text-slate-800';
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t('common.back')}
            </button>
            <div className="bg-white/60 backdrop-blur-md p-4 sm:p-8 rounded-2xl shadow-2xl border border-white/30">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-800 text-center mb-6">{t('leaderboard.title')}</h1>
                <div className="space-y-3">
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, index) => <SkeletonLeaderboardItem key={index} />)
                    ) : (
                        leaderboard.map((player, index) => (
                            <div key={index} className={`flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-xl transition-all duration-300 ${player.isCurrentUser ? 'bg-yellow-500/30 ring-2 ring-yellow-400 shadow-lg' : 'bg-white/40'}`}>
                                <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-lg sm:text-xl font-black ${getRankBG(index)}`}>
                                    {getRankContent(index)}
                                </div>
                                <img src={player.picture} alt={player.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/30" />
                                <p className="font-bold text-base sm:text-lg text-slate-800 flex-1 truncate">
                                    {player.name} {player.isCurrentUser && t('leaderboard.you')}
                                </p>
                                <div className="bg-yellow-400/20 text-yellow-600 font-bold text-sm sm:text-md px-3 py-1.5 rounded-full">
                                    {t('leaderboard.points', { score: player.score })}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeaderboardScreen;
