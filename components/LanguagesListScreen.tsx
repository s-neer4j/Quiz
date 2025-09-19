import React, { useState, useMemo, useEffect } from 'react';
import { Language, SavedQuizState } from '../types';
import { useLocalization } from '../contexts/LocalizationContext';

interface LanguagesListScreenProps {
  languages: Language[];
  onSelectLanguage: (language: Language) => void;
  savedQuizState: SavedQuizState | null;
  onResumeQuiz: () => void;
}

const inputClasses = "w-full px-4 py-3 rounded-xl border-2 border-slate-300 bg-white/40 backdrop-blur-sm text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-pink-400/50 focus:border-pink-500 transition-all";

const SkeletonLanguageItem: React.FC = () => (
  <div className="w-full flex items-center gap-4 p-4 bg-slate-200/50 rounded-xl animate-pulse">
    <div className="w-12 h-8 rounded-md bg-slate-300/50"></div>
    <div className="flex-1 space-y-2">
      <div className="h-5 bg-slate-300/50 rounded w-1/3"></div>
      <div className="h-4 bg-slate-300/50 rounded w-1/2"></div>
    </div>
  </div>
);


const LanguagesListScreen: React.FC<LanguagesListScreenProps> = ({ languages, onSelectLanguage, savedQuizState, onResumeQuiz }) => {
  const { t } = useLocalization();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredLanguages = useMemo(() => {
    if (!searchTerm) return languages;
    return languages.filter(lang => 
      lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [languages, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-800 mb-2 text-center">{t('languages.title')}</h1>
        <p className="text-slate-600 text-center text-sm sm:text-base">{t('languages.subtitle')}</p>
      </div>

      {savedQuizState && (
        <div className="bg-pink-100 border border-pink-300 p-4 rounded-xl text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
          <p className="font-semibold text-pink-800 mb-2">{t('languages.resumeTitle')}</p>
          <button 
            onClick={onResumeQuiz}
            className="px-6 py-2 bg-pink-400 text-white font-bold rounded-lg shadow-lg hover:bg-pink-500 transition-all transform hover:-translate-y-0.5"
          >
            {t('languages.resumeButton')}
          </button>
        </div>
      )}

      <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
        <input 
          type="text"
          placeholder={t('languages.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`${inputClasses} pl-10`}
          aria-label={t('languages.searchPlaceholder')}
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => <SkeletonLanguageItem key={index} />)
        ) : filteredLanguages.length > 0 ? filteredLanguages.map((lang, index) => (
          <button
            key={lang.name}
            onClick={() => onSelectLanguage(lang)}
            className="w-full flex items-center gap-4 p-3 sm:p-4 bg-white/40 rounded-xl border-2 border-transparent hover:border-pink-400 hover:bg-white/60 transition-all focus:outline-none focus:ring-2 focus:ring-pink-400 transform hover:scale-105 hover:shadow-md animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <img src={lang.flag} alt={`${lang.name} flag`} className="w-12 h-8 object-cover rounded-md" />
            <div className="text-left">
              <p className="font-semibold text-md sm:text-lg text-slate-800">{lang.name}</p>
              <p className="text-sm text-slate-600">{lang.code} • {t('common.levels', {count: lang.levels.length})}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500 ml-auto" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        )) : (
          <p className="text-center text-slate-600 py-8 animate-fade-in">{t('languages.noResults')}</p>
        )}
      </div>
    </div>
  );
};

export default LanguagesListScreen;
