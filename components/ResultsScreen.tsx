import React, { useEffect, useMemo } from 'react';
import { useSound } from '../contexts/SoundContext';
import { useAuth } from '../contexts/AuthContext';
import { useQuiz } from '../contexts/QuizContext';
import { useLocalization } from '../contexts/LocalizationContext';

interface ResultsScreenProps {}

const Confetti: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            {Array.from({ length: 50 }).map((_, i) => {
                const style = {
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${2 + Math.random() * 3}s`,
                    backgroundColor: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'][Math.floor(Math.random()*16)]
                };
                return <div key={i} className="confetti" style={style}></div>;
            })}
        </div>
    );
};

const ResultsScreen: React.FC<ResultsScreenProps> = () => {
  const { user } = useAuth();
  const { t } = useLocalization();
  const { state, restartQuiz } = useQuiz();
  const { score, questions, selectedLanguage, selectedLevel, longestStreak } = state;
  const totalQuestions = questions.length;
  
  const userName = user ? user.name.split(' ')[0] : 'Guest';
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const { playSound } = useSound();

  useEffect(() => {
    playSound('complete');
  }, [playSound]);

  const feedback = useMemo(() => {
    if (percentage === 100) return t('results.perfect');
    if (percentage >= 80) return t('results.excellent');
    if (percentage >= 50) return t('results.good');
    return t('results.niceTry');
  }, [percentage, t]);
  
  if (!selectedLanguage || !selectedLevel) {
      return null; // Or some fallback UI
  }

  return (
    <div className="relative text-center bg-white/60 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl border border-white/30 overflow-hidden">
      {percentage > 70 && <Confetti />}
      <div className="relative z-10">
        <h1 className="text-xl sm:text-3xl font-black text-slate-800 mb-2">
           {t('results.title', { userName })}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mb-4">
          {t('results.subtitle', { level: selectedLevel.name, language: selectedLanguage.name })}
        </p>
        
        <div className="my-6">
          <p className="text-base sm:text-xl text-slate-700 animate-fade-in" style={{ animationDelay: '100ms' }}>{t('results.finalScore')}</p>
          <p className="text-4xl sm:text-6xl font-black text-orange-500 my-1 animate-pop-in" style={{ animationDelay: '200ms' }}>
            {score} <span className="text-xl sm:text-3xl text-slate-600">/ {totalQuestions}</span>
          </p>
          <p className="text-lg sm:text-2xl font-semibold text-slate-600 animate-fade-in" style={{ animationDelay: '300ms' }}>({percentage}%)</p>
          {longestStreak > 1 && (
            <p className="text-base sm:text-xl text-orange-500 font-semibold mt-3 animate-fade-in" style={{ animationDelay: '400ms' }}>
                {t('results.longestStreak', { streak: longestStreak })}
            </p>
          )}
        </div>

        <p className="text-base sm:text-xl italic text-slate-700 mb-6 animate-fade-in" style={{ animationDelay: '500ms' }}>{feedback}</p>

        <button
          onClick={restartQuiz}
          className="w-full sm:w-auto px-6 py-3 bg-orange-400 text-white font-bold rounded-xl text-base sm:text-lg shadow-lg hover:bg-orange-500 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        >
          {t('results.playAgain')}
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
