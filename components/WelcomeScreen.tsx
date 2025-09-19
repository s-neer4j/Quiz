import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { MOCK_USERS } from '../constants';
import IconicMascot from './IconicMascot';
import { useAuth } from '../contexts/AuthContext';
import { useSound } from '../contexts/SoundContext';
import { GoogleIcon, AppleIcon, PhoneIcon, EmailIcon } from './AuthIcons';
import { useLocalization } from '../contexts/LocalizationContext';

const WelcomeScreen: React.FC = () => {
  const { t } = useLocalization();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMethod, setAuthMethod] = useState<'google' | 'email' | 'phone' | 'apple' | null>(null);
  const [phoneStep, setPhoneStep] = useState<'enter-number' | 'enter-code'>('enter-number');
  const { login } = useAuth();
  const { isMuted, toggleMute } = useSound();

  const handleLogin = (user: User) => {
    setIsModalOpen(false);
    // Add a small delay to simulate network latency for a better UX
    setTimeout(() => {
        login(user);
        if (isMuted) {
            toggleMute();
        }
    }, 300);
  };
  
  const handlePhoneLogin = () => {
    const phoneUser = MOCK_USERS.find(u => u.email === 'codeninja@example.dev');
    if(phoneUser) {
        handleLogin(phoneUser);
    }
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Log in with the first mock user for the email simulation
    handleLogin(MOCK_USERS[0]);
  }

  useEffect(() => {
    if (authMethod) {
      setIsModalOpen(true);
    }
  }, [authMethod]);
  
  const closeModal = () => {
    setIsModalOpen(false);
    setAuthMethod(null);
    setPhoneStep('enter-number');
  }

  const renderModalContent = () => {
    switch (authMethod) {
      case 'google':
        return (
          <>
              <div className="flex justify-center mb-4"><GoogleIcon /></div>
              <h2 className="text-xl sm:text-2xl font-semibold text-center mb-2">{t('modals.googleTitle')}</h2>
              <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">{t('modals.googleSubtitle')}</p>
              
              <div className="space-y-2">
                {MOCK_USERS.filter(u => !u.email.includes('codeninja') && !u.email.includes('icloud.com')).map((user) => (
                  <div 
                    key={user.email}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 cursor-pointer border border-gray-200" 
                    onClick={() => handleLogin(user)} 
                    role="button" 
                    tabIndex={0} 
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin(user)}
                    aria-label={`Log in as ${user.name}`}
                  >
                    <img src={user.picture} alt={user.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
                    <div>
                      <p className="font-bold text-base sm:text-lg">{user.name}</p>
                      <p className="text-gray-600 text-sm">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
          </>
        );
      case 'apple':
          const appleUser = MOCK_USERS.find(u => u.email.includes('icloud.com'));
          if (!appleUser) return null;
          return (
              <>
                  <div className="flex justify-center mb-4"><AppleIcon /></div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-center mb-2">{t('modals.appleTitle')}</h2>
                  <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">{t('modals.appleSubtitle')}</p>
                  <div
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 cursor-pointer border border-gray-200"
                      onClick={() => handleLogin(appleUser)}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => e.key === 'Enter' && handleLogin(appleUser)}
                      aria-label={`Log in as ${appleUser.name}`}
                  >
                      <img src={appleUser.picture} alt={appleUser.name} className="w-12 h-12 rounded-full" />
                      <div>
                          <p className="font-bold text-lg">{appleUser.name}</p>
                          <p className="text-gray-600 text-sm">{appleUser.email}</p>
                      </div>
                  </div>
              </>
          );
      case 'email':
          return (
               <>
                  <div className="flex justify-center mb-4"><EmailIcon /></div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-center mb-2">{t('modals.emailTitle')}</h2>
                  <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">{t('modals.emailSubtitle')}</p>
                  <form className="space-y-4" onSubmit={handleEmailSubmit}>
                      <div>
                          <label className="block text-left text-sm font-medium text-gray-700" htmlFor="email-input">{t('modals.emailLabel')}</label>
                          <input id="email-input" type="email" defaultValue="alex.chen@example.com" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500" />
                      </div>
                       <div>
                          <label className="block text-left text-sm font-medium text-gray-700" htmlFor="password-input">{t('modals.passwordLabel')}</label>
                          <input id="password-input" type="password" defaultValue="password" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500" />
                      </div>
                      <button type="submit" className="w-full justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">{t('modals.signIn')}</button>
                  </form>
               </>
          );

      case 'phone':
          return (
            <>
                <div className="flex justify-center mb-4"><PhoneIcon /></div>
                <h2 className="text-xl sm:text-2xl font-semibold text-center mb-2">{t('modals.phoneTitle')}</h2>
                {phoneStep === 'enter-number' ? (
                     <>
                        <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">{t('modals.phoneSubtitleEnterNumber')}</p>
                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setPhoneStep('enter-code'); }}>
                            <div>
                                <label className="block text-left text-sm font-medium text-gray-700" htmlFor="tel-input">{t('modals.phoneLabel')}</label>
                                <input id="tel-input" type="tel" defaultValue="+1 (555) 123-4567" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500" />
                            </div>
                            <button type="submit" className="w-full justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">{t('modals.sendCode')}</button>
                        </form>
                     </>
                ) : (
                     <>
                        <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">{t('modals.phoneSubtitleEnterCode')}</p>
                         <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handlePhoneLogin(); }}>
                            <div>
                                <label className="block text-left text-sm font-medium text-gray-700" htmlFor="code-input">{t('modals.codeLabel')}</label>
                                <input id="code-input" type="text" defaultValue="123456" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500" />
                            </div>
                            <button type="submit" className="w-full justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">{t('modals.verify')}</button>
                        </form>
                     </>
                )}
            </>
        )
      default:
        return null;
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/30 max-w-sm w-full text-center">
          <div className="flex justify-center animate-bounce-custom">
            <IconicMascot className="text-6xl sm:text-7xl mb-4" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 mb-2">{t('welcome.title')}</h1>
          <p className="text-md sm:text-lg text-slate-600 mb-8">{t('welcome.subtitle')}</p>
          
          <div className="space-y-4">
            <button 
              onClick={() => setAuthMethod('google')}
              className="w-full inline-flex justify-center items-center gap-4 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl shadow-md hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-300 border border-gray-200"
            >
              <GoogleIcon /><span>{t('welcome.signInGoogle')}</span>
            </button>
             <button
                onClick={() => setAuthMethod('apple')}
                className="w-full inline-flex justify-center items-center gap-4 px-6 py-3 bg-black text-white font-semibold rounded-xl shadow-md hover:bg-gray-800 transform hover:-translate-y-1 transition-all duration-300"
            >
                <AppleIcon /><span>{t('welcome.signInApple')}</span>
            </button>
             <button 
              onClick={() => setAuthMethod('phone')}
              className="w-full inline-flex justify-center items-center gap-4 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-lg hover:bg-green-600 transform hover:-translate-y-1 transition-all duration-300"
            >
              <PhoneIcon /><span>{t('welcome.continuePhone')}</span>
            </button>
          </div>

          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">{t('common.or')}</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button 
              onClick={() => setAuthMethod('email')}
              className="w-full inline-flex justify-center items-center gap-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-600 transform hover:-translate-y-1 transition-all duration-300"
            >
              <EmailIcon /><span>{t('welcome.continueEmail')}</span>
            </button>

        </div>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in" onClick={closeModal} role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-6 m-4 max-w-sm w-full text-gray-800" onClick={(e) => e.stopPropagation()}>
            {renderModalContent()}
            <p className="text-xs text-gray-500 text-center mt-6">{t('welcome.simulatedLogin')}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomeScreen;
