import React from 'react';
import { Language } from '../types';
import { useLocalization } from '../contexts/LocalizationContext';

interface LanguageDetailScreenProps {
    language: Language;
    onBack: () => void;
    onStartQuiz: () => void;
}

const DetailItem: React.FC<{label: string, value: React.ReactNode}> = ({label, value}) => (
    <div>
        <p className="text-sm text-slate-600">{label}</p>
        <p className="text-md font-semibold text-slate-800">{value}</p>
    </div>
)

const LanguageDetailScreen: React.FC<LanguageDetailScreenProps> = ({ language, onBack, onStartQuiz }) => {
    const { t } = useLocalization();
    const highestLevel = language.levels.reduce((prev, current) => {
        const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
        return difficulties.indexOf(prev.difficulty) > difficulties.indexOf(current.difficulty) ? prev : current;
    });

    return (
        <div className="space-y-6 sm:space-y-8 p-2 sm:p-0">
            <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t('languageDetail.back')}
            </button>
            
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
                <img src={language.flag} alt={`${language.name} flag`} className="w-full md:w-52 h-auto object-cover rounded-2xl shadow-lg" />
                <div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-800">{language.name}</h1>
                    <p className="mt-2 text-md sm:text-lg text-slate-700 max-w-prose">{language.description}</p>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-bold text-slate-800 mb-4">{t('languageDetail.title')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 bg-white/60 backdrop-blur-md rounded-xl border border-white/30">
                   <DetailItem label={t('common.langCode')} value={language.code} />
                   <DetailItem label={t('common.status')} value={
                       <span className="flex items-center gap-2 text-green-600">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                         </svg>
                         {t('common.active')}
                       </span>
                   }/>
                   <DetailItem label={t('common.maxLevel')} value={highestLevel.difficulty} />
                   <DetailItem label={t('common.added')} value="Sep 1, 2025" />
                </div>
            </div>
            
             <div className="text-center pt-4">
                <button
                    onClick={onStartQuiz}
                    className="w-full sm:w-auto px-10 py-3 sm:py-4 bg-orange-400 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-orange-500 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                    {t('languageDetail.startButton')}
                </button>
            </div>
        </div>
    )
}

export default LanguageDetailScreen;
