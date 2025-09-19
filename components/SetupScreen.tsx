import React, { useState, useMemo } from 'react';
import { Language, Difficulty } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useLocalization } from '../contexts/LocalizationContext';
import { Trans, useTranslation } from 'react-i18next'; // Placeholder for a more advanced i18n library if needed

interface SetupScreenProps {
  language: Language;
  onSetupComplete: (level: string) => void;
}

const selectClasses = "w-full px-4 py-3 rounded-xl border-2 border-slate-300 bg-white/40 backdrop-blur-sm text-slate-800 focus:outline-none focus:ring-4 focus:ring-pink-400/50 focus:border-pink-500 transition-all";

const SetupScreen: React.FC<SetupScreenProps> = ({ language, onSetupComplete }) => {
  const { t } = useLocalization();
  const { user } = useAuth();
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | ''>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedQuizLength, setSelectedQuizLength] = useState<number>(0);
  
  const userName = user ? user.name.split(' ')[0] : 'Guest';

  const availableDifficulties = useMemo(() => {
    const difficulties = language.levels.map(l => l.difficulty);
    return [...new Set(difficulties)];
  }, [language]);

  const availableLevels = useMemo(() => {
      if (!selectedDifficulty) return [];
      return language.levels.filter(l => l.difficulty === selectedDifficulty);
  }, [selectedDifficulty, language]);

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(e.target.value as Difficulty);
    setSelectedLevel(''); // Reset level when difficulty changes
    setSelectedQuizLength(0); // Reset quiz length
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const levelName = e.target.value;
    setSelectedLevel(levelName);
    const levelData = language.levels.find(l => l.name === levelName);
    if (levelData) {
      setSelectedQuizLength(levelData.quizLength);
    } else {
      setSelectedQuizLength(0);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (language && selectedLevel) {
      onSetupComplete(selectedLevel);
    }
  };

  const renderSummary = () => {
      const summaryText = t('setup.summary', { count: selectedQuizLength, levelName: selectedLevel });
      const parts = summaryText.split(/<1>|<\/1>|<3>|<\/3>/);
      return (
        <p className="text-center text-slate-600 pt-4 animate-fade-in text-sm sm:text-base">
          {parts[0]}
          <span className="font-bold text-orange-500">{parts[1]}</span>
          {parts[2]}
          <span className="font-bold text-slate-800">{parts[3]}</span>
          {parts[4]}
        </p>
      );
  };

  return (
    <div className="bg-white/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/30">
      <div className="flex flex-col items-center text-center">
        <img src={language.flag} alt={`${language.name} flag`} className="w-24 h-auto object-cover rounded-lg shadow-md mb-4" />
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 mb-2">
          {t('setup.title', { userName: userName })}
        </h1>
        <p className="text-md sm:text-lg text-slate-600 mb-8">{t('setup.subtitle', { languageName: language.name })}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="difficulty-select" className="block text-md font-semibold text-slate-700 mb-2">
            {t('setup.difficultyLabel')}
          </label>
          <select
            id="difficulty-select"
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
            className={selectClasses}
            aria-label={t('setup.difficultyLabel')}
          >
            <option value="" disabled>{t('setup.difficultyPlaceholder')}</option>
            {availableDifficulties.map(diff => (
              <option key={diff} value={diff}>{diff}</option>
            ))}
          </select>
        </div>

        {selectedDifficulty && (
          <div className="animate-fade-in">
            <label htmlFor="level-select" className="block text-md font-semibold text-slate-700 mb-2">
              {t('setup.levelLabel')}
            </label>
            <select
              id="level-select"
              value={selectedLevel}
              onChange={handleLevelChange}
              className={selectClasses}
              aria-label={t('setup.levelLabel')}
            >
              <option value="" disabled>{t('setup.levelPlaceholder')}</option>
              {availableLevels.map(level => (
                <option key={level.name} value={level.name}>{level.name}</option>
              ))}
            </select>
          </div>
        )}

        {selectedQuizLength > 0 && selectedLevel && renderSummary()}

        <button
          type="submit"
          disabled={!selectedLevel}
          className="w-full mt-4 px-8 py-3 sm:py-4 bg-orange-400 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        >
          {t('setup.startButton')}
        </button>
      </form>
    </div>
  );
};

export default SetupScreen;
