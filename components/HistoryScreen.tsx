import React, { useMemo, useState, useEffect } from 'react';
import { QuizResult } from '../types';
import { useLocalization } from '../contexts/LocalizationContext';

interface HistoryScreenProps {
    history: QuizResult[];
    onBack: () => void;
}

const SkeletonHistoryItem: React.FC = () => (
    <div className="flex items-center gap-4 p-4 bg-slate-200/50 rounded-xl animate-pulse">
        <div className="flex-1 space-y-2">
            <div className="h-6 bg-slate-300/50 rounded w-3/4"></div>
            <div className="h-4 bg-slate-300/50 rounded w-1/2"></div>
        </div>
        <div className="flex items-center gap-4">
            <div className="h-8 bg-slate-300/50 rounded w-16"></div>
            <div className="h-8 bg-slate-300/50 rounded w-16"></div>
        </div>
    </div>
);

const HistoryScreen: React.FC<HistoryScreenProps> = ({ history, onBack }) => {
    const { t } = useLocalization();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 750);
        return () => clearTimeout(timer);
    }, []);

    const sortedHistory = useMemo(() => 
        [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [history]);

    return (
        <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t('common.back')}
            </button>

            <div className="bg-white/60 backdrop-blur-md p-4 sm:p-8 rounded-2xl shadow-2xl border border-white/30">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-800 text-center mb-6">{t('history.title')}</h1>
                
                {isLoading ? (
                     <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, index) => <SkeletonHistoryItem key={index} />)}
                    </div>
                ) : sortedHistory.length > 0 ? (
                    <div className="space-y-4">
                        {sortedHistory.map((result, index) => {
                            const percentage = result.totalQuestions > 0 ? Math.round((result.score / result.totalQuestions) * 100) : 0;
                            const getBorderColor = () => {
                                if (percentage === 100) return 'border-yellow-400';
                                if (percentage >= 80) return 'border-green-400';
                                if (percentage >= 50) return 'border-blue-400';
                                return 'border-red-400';
                            };
                            return (
                                <div key={index} className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white/40 rounded-xl border-l-4 ${getBorderColor()}`}>
                                    <div className="flex-1">
                                        <p className="font-bold text-lg text-slate-800">{result.languageName} - <span className="font-normal">{result.levelName}</span></p>
                                        <p className="text-sm text-slate-600">{new Date(result.date).toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="font-bold text-xl text-orange-500">
                                            {result.score}/{result.totalQuestions}
                                        </p>
                                        <div className="w-16 text-center">
                                            <p className={`font-bold text-lg ${percentage >= 50 ? 'text-green-600' : 'text-red-600'}`}>{percentage}%</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <p className="text-center text-slate-600 py-8">{t('history.noHistory')}</p>
                )}
            </div>
        </div>
    );
};

export default HistoryScreen;
