import React, { useState } from 'react';
import { User } from '../types';
import { useLocalization } from '../contexts/LocalizationContext';

// IMPORTANT: Replace this with your actual Google Apps Script Web App URL.
const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

const inputClasses = "w-full px-4 py-3 rounded-xl border-2 border-slate-300 bg-white/40 backdrop-blur-sm text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-pink-400/50 focus:border-pink-500 transition-all";
const selectClasses = "px-3 py-3 rounded-xl border-2 border-slate-300 bg-white/40 backdrop-blur-sm text-slate-800 focus:outline-none focus:ring-4 focus:ring-pink-400/50 focus:border-pink-500 transition-all";

interface LeadGenerationModalProps {
  user: User;
  languageName: string;
  levelName: string;
  score: number;
  onClose: () => void;
}

const COUNTRIES = [
    { code: 'US', name: 'United States', dial_code: '+1', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', dial_code: '+44', flag: '🇬🇧' },
    { code: 'IN', name: 'India', dial_code: '+91', flag: '🇮🇳' },
    { code: 'DE', name: 'Germany', dial_code: '+49', flag: '🇩🇪' },
    { code: 'FR', name: 'France', dial_code: '+33', flag: '🇫🇷' },
    { code: 'JP', name: 'Japan', dial_code: '+81', flag: '🇯🇵' },
    { code: 'BR', name: 'Brazil', dial_code: '+55', flag: '🇧🇷' },
    { code: 'CN', name: 'China', dial_code: '+86', flag: '🇨🇳' },
];

const LeadGenerationModal: React.FC<LeadGenerationModalProps> = ({ user, languageName, levelName, score, onClose }) => {
  const { t } = useLocalization();
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
        setError(t('leadModal.errorConsent'));
        return;
    }
    setError('');
    setIsLoading(true);

    const data = {
        name: user.name,
        email: user.email,
        phone: `${country.dial_code} ${phone}`,
        language: languageName,
        level: levelName,
        score: score,
        percentage: `${Math.round((score / 5) * 100)}% (at question 5)`,
    };

    try {
        if(SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
            console.error("Submission failed: Please replace the placeholder SCRIPT_URL in LeadGenerationModal.tsx");
            setIsSubmitted(true);
            setTimeout(onClose, 2000); // Simulate success for UI purposes
            return;
        }

        await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        setIsSubmitted(true);

    } catch (err) {
        console.error("Error submitting lead:", err);
        setError(t('leadModal.errorGeneral'));
    } finally {
        setIsLoading(false);
        setTimeout(onClose, 2000); // Close modal after 2 seconds
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
        <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/30 max-w-md w-full relative">
            {isSubmitted ? (
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-green-600 mb-2">{t('leadModal.successTitle')}</h2>
                    <p className="text-slate-700">{t('leadModal.successSubtitle')}</p>
                </div>
            ) : (
            <>
                <h2 className="text-2xl font-black text-slate-800 text-center mb-2">{t('leadModal.title')}</h2>
                <p className="text-slate-600 text-center mb-6">{t('leadModal.subtitle')}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1">{t('leadModal.phoneLabel')}</label>
                        <div className="flex gap-2">
                            <select value={country.code} onChange={e => setCountry(COUNTRIES.find(c => c.code === e.target.value) || COUNTRIES[0])} className={selectClasses}>
                                {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.dial_code}</option>)}
                            </select>
                            <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" required className={inputClasses}/>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <input type="checkbox" id="consent" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1 h-4 w-4 rounded border-gray-300 text-pink-500 focus:ring-pink-500" />
                        <label htmlFor="consent" className="text-sm text-slate-600">
                            {t('leadModal.consent')}
                        </label>
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                         <button 
                            type="button" 
                            onClick={onClose}
                            className="w-full px-6 py-3 bg-white/50 text-slate-800 font-bold rounded-xl shadow-md hover:bg-white/70 transition-all"
                        >
                            {t('leadModal.skip')}
                        </button>
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full px-6 py-3 bg-orange-400 text-white font-bold rounded-xl shadow-lg hover:bg-orange-500 disabled:bg-gray-400 transform hover:-translate-y-1 transition-all"
                        >
                            {isLoading ? t('leadModal.submitting') : t('leadModal.submit')}
                        </button>
                    </div>
                </form>
            </>
            )}
        </div>
    </div>
  );
};

export default LeadGenerationModal;
