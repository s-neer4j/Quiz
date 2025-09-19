import React, { useState, useEffect, useCallback } from 'react';
import { QUIZ_DATA } from './constants';
import WelcomeScreen from './components/WelcomeScreen';
import LanguagesListScreen from './components/LanguagesListScreen';
import LanguageDetailScreen from './components/LanguageDetailScreen';
import SetupScreen from './components/SetupScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import Header from './components/Header';
import HistoryScreen from './components/HistoryScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import ProfileScreen from './components/ProfileScreen';
import AchievementToast from './components/AchievementToast';
import AvatarSelectionScreen from './components/AvatarSelectionScreen';
import IconicMascot from './components/IconicMascot';
import LoadingScreen from './components/LoadingScreen';
import { useAuth } from './contexts/AuthContext';
import { useSound } from './contexts/SoundContext';
import { useQuiz } from './contexts/QuizContext';

type Screen = 'welcome' | 'languages-list' | 'language-detail' | 'setup' | 'quiz' | 'results' | 'history' | 'leaderboard' | 'profile' | 'avatar-selection';

const App: React.FC = () => {
    const { user, isAuthenticated, updateUser } = useAuth();
    const { state: quizState, selectLanguage, startQuizSetup, setupComplete, restartQuiz, resumeQuiz, dismissAchievement } = useQuiz();
    
    const [screen, setScreen] = useState<Screen>('welcome');
    const [isTransitioning, setIsTransitioning] = useState(true); // Start with initial transition
    const [currentAchievement, setCurrentAchievement] = useState(quizState.achievementToastQueue[0]);

    // Initial load
    useEffect(() => {
        setTimeout(() => setIsTransitioning(false), 750);
    }, []);

    // Handle screen transitions based on quiz state
    useEffect(() => {
        let targetScreen: Screen | null = null;
        switch(quizState.status) {
            case 'idle':
                if (screen !== 'languages-list' && screen !== 'history' && screen !== 'leaderboard' && screen !== 'profile') {
                    targetScreen = 'languages-list';
                }
                break;
            case 'selecting_language':
                targetScreen = 'language-detail';
                break;
            case 'selecting_level':
                targetScreen = 'setup';
                break;
            case 'in_progress':
                targetScreen = 'quiz';
                break;
            case 'finished':
                targetScreen = 'results';
                break;
        }

        if (targetScreen && targetScreen !== screen) {
            navigate(targetScreen);
        }

        if (quizState.status === 'generating_questions' && !isTransitioning) {
            setIsTransitioning(true);
        } else if (quizState.status !== 'generating_questions' && isTransitioning && screen !== 'welcome') {
            setIsTransitioning(false);
        }
        
    }, [quizState.status]);

    // Handle routing based on authentication status
    useEffect(() => {
      if (isAuthenticated && user) {
        if (!user.hasSelectedAvatar) {
          if (screen !== 'avatar-selection') navigate('avatar-selection');
        } else if (screen === 'welcome' || screen === 'avatar-selection') {
          navigate('languages-list');
        }
      } else {
        if (screen !== 'welcome') {
          restartQuiz(); // Clear quiz state on logout
          navigate('welcome');
        }
      }
    }, [isAuthenticated, user]);

    // Handle achievement toast queue
    useEffect(() => {
        if (quizState.achievementToastQueue.length > 0 && !currentAchievement) {
            const nextAchievement = quizState.achievementToastQueue[0];
            setCurrentAchievement(nextAchievement);
            setTimeout(() => {
                setCurrentAchievement(null);
                dismissAchievement();
            }, 4000);
        }
    }, [quizState.achievementToastQueue, currentAchievement, dismissAchievement]);


    const navigate = useCallback((targetScreen: Screen) => {
        if (screen === targetScreen) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setScreen(targetScreen);
            setIsTransitioning(false);
        }, 500);
    }, [screen]);

    const handleAvatarSelected = (avatarUrl: string) => {
        if (user) {
            updateUser({ ...user, picture: avatarUrl, hasSelectedAvatar: true });
        }
    };

    const renderScreen = () => {
        if (!isAuthenticated || !user) {
            return <WelcomeScreen />;
        }
        
        switch (screen) {
            case 'avatar-selection':
                return <AvatarSelectionScreen onAvatarSelect={handleAvatarSelected} />;
            case 'languages-list':
                return <LanguagesListScreen languages={QUIZ_DATA} onSelectLanguage={selectLanguage} onResumeQuiz={resumeQuiz} savedQuizState={quizState.savedQuizState} />;
            case 'language-detail':
                return quizState.selectedLanguage ? <LanguageDetailScreen language={quizState.selectedLanguage} onBack={() => navigate('languages-list')} onStartQuiz={startQuizSetup} /> : null;
            case 'setup':
                 return quizState.selectedLanguage ? <SetupScreen language={quizState.selectedLanguage} onSetupComplete={setupComplete} /> : null;
            case 'quiz':
                return <QuizScreen />;
            case 'results':
                return <ResultsScreen />;
            case 'history':
                return <HistoryScreen history={quizState.quizHistory} onBack={() => navigate('languages-list')} />;
            case 'leaderboard':
                return <LeaderboardScreen history={quizState.quizHistory} onBack={() => navigate('languages-list')} />;
            case 'profile':
                return <ProfileScreen quizHistory={quizState.quizHistory} onBack={() => navigate('languages-list')} />;
            default:
                return <WelcomeScreen />;
        }
    };

    const { isMuted, toggleMute } = useSound();
    
    return (
        <div className="text-slate-800 min-h-screen font-sans">
            {(isTransitioning || quizState.status === 'generating_questions') && <LoadingScreen />}
            {isAuthenticated && screen !== 'welcome' && screen !== 'avatar-selection' && <IconicMascot isFloating />}
            <div className="container mx-auto p-2 sm:p-4 md:p-6 max-w-4xl">
            {isAuthenticated && screen !== 'welcome' && screen !== 'avatar-selection' && (
              <Header 
                onHistoryClick={() => navigate('history')}
                onLeaderboardClick={() => navigate('leaderboard')}
                onProfileClick={() => navigate('profile')}
                onHomeClick={() => {
                  restartQuiz();
                  navigate('languages-list');
                }} 
                isMuted={isMuted}
                onToggleMute={toggleMute}
              />
            )}
            <main className="mt-4 sm:mt-8">
              <div key={screen} className="animate-fade-in">
                {renderScreen()}
              </div>
            </main>
          </div>
          {currentAchievement && <AchievementToast achievement={currentAchievement} />}
        </div>
    );
};

export default App;
