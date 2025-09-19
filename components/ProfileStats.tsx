import React, { useMemo } from 'react';
import { User, QuizResult, Difficulty } from '../types';
import { useLocalization } from '../contexts/LocalizationContext';

interface ProfileStatsProps {
    user: User;
    quizHistory: QuizResult[];
}

const StatCard: React.FC<{ icon: string; label: string; value: string | number }> = ({ icon, label, value }) => (
  <div className="bg-white/40 p-4 rounded-xl text-center shadow">
    <div className="text-3xl mb-1">{icon}</div>
    <div className="text-2xl font-black text-slate-800">{value}</div>
    <div className="text-sm text-slate-600">{label}</div>
  </div>
);

const DifficultyStat: React.FC<{ level: string; correct: number; total: number }> = ({ level, correct, total }) => {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const barColor = percentage > 80 ? 'bg-green-500' : percentage > 50 ? 'bg-yellow-400' : 'bg-red-500';
  
  return (
    <div>
      <div className="flex justify-between items-end mb-1">
        <span className="font-semibold text-slate-700">{level}</span>
        <span className="text-sm font-bold text-slate-600">{total > 0 ? `${percentage}%` : 'N/A'}</span>
      </div>
      <div className="w-full bg-white/30 rounded-full h-2.5 border border-white/30">
        <div className={barColor} style={{ width: `${percentage}%`, transition: 'width 0.5s ease-in-out' }}></div>
      </div>
    </div>
  );
};

const ProfileStats: React.FC<ProfileStatsProps> = ({ user, quizHistory }) => {
    const { t } = useLocalization();
    const stats = useMemo(() => {
        if (quizHistory.length === 0) {
            return {
                totalQuizzes: 0,
                averageScore: 0,
                highestScore: 0,
                favoriteLanguage: 'N/A',
                difficultyStats: {
                    [Difficulty.BEGINNER]: { correct: 0, total: 0 },
                    [Difficulty.INTERMEDIATE]: { correct: 0, total: 0 },
                    [Difficulty.ADVANCED]: { correct: 0, total: 0 },
                }
            };
        }

        const totalPercentage = quizHistory.reduce((acc, result) => {
            const percentage = result.totalQuestions > 0 ? (result.score / result.totalQuestions) * 100 : 0;
            return acc + percentage;
        }, 0);

        const langCounts = quizHistory.reduce((acc, result) => {
            acc[result.languageName] = (acc[result.languageName] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const difficultyStats = {
            [Difficulty.BEGINNER]: { correct: 0, total: 0 },
            [Difficulty.INTERMEDIATE]: { correct: 0, total: 0 },
            [Difficulty.ADVANCED]: { correct: 0, total: 0 },
        };

        quizHistory.forEach(result => {
            if (difficultyStats[result.difficulty]) {
                difficultyStats[result.difficulty].correct += result.score;
                difficultyStats[result.difficulty].total += result.totalQuestions;
            }
        });

        return {
            totalQuizzes: quizHistory.length,
            averageScore: Math.round(totalPercentage / quizHistory.length),
            highestScore: Math.round(Math.max(...quizHistory.map(r => r.totalQuestions > 0 ? (r.score / r.totalQuestions) * 100 : 0))),
            favoriteLanguage: Object.keys(langCounts).reduce((a, b) => langCounts[a] > langCounts[b] ? a : b),
            difficultyStats,
        };
    }, [quizHistory]);

    return (
        <div className="mt-8 pt-6 border-t border-white/20">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 text-center mb-6">{t('profile.statsTitle')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                <StatCard icon="📝" label={t('profileStats.totalQuizzes')} value={stats.totalQuizzes} />
                <StatCard icon="📊" label={t('profileStats.averageScore')} value={`${stats.averageScore}%`} />
                <StatCard icon="🥇" label={t('profileStats.highestScore')} value={`${stats.highestScore}%`} />
                <StatCard icon="🔥" label={t('profileStats.longestStreak')} value={user.longestStreakEver || 0} />
                <StatCard icon="❤️" label={t('profileStats.favoriteLanguage')} value={stats.favoriteLanguage} />
            </div>
            <div className="mt-6 space-y-4">
                <h3 className="font-bold text-slate-800 text-center">{t('profileStats.performanceTitle')}</h3>
                <DifficultyStat level="Beginner" correct={stats.difficultyStats.Beginner.correct} total={stats.difficultyStats.Beginner.total} />
                <DifficultyStat level="Intermediate" correct={stats.difficultyStats.Intermediate.correct} total={stats.difficultyStats.Intermediate.total} />
                <DifficultyStat level="Advanced" correct={stats.difficultyStats.Advanced.correct} total={stats.difficultyStats.Advanced.total} />
            </div>
        </div>
    );
};

export default ProfileStats;
