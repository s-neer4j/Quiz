import React, { createContext, useContext, useReducer, ReactNode, useCallback, useEffect, useState } from 'react';
import { Language, Level, Question, QuizResult, SavedQuizState, Achievement, Difficulty, User } from '../types';
import { useAuth } from './AuthContext';
import { generateQuizQuestions } from '../services/geminiService';
import { QUIZ_DATA, ACHIEVEMENTS_LIST } from '../constants';

type QuizStatus = 'idle' | 'selecting_language' | 'selecting_level' | 'generating_questions' | 'in_progress' | 'finished';

interface QuizState {
    status: QuizStatus;
    selectedLanguage: Language | null;
    selectedLevel: Level | null;
    questions: Question[];
    currentQuestionIndex: number;
    userAnswers: (string | null)[];
    score: number;
    streak: number;
    longestStreak: number;
    quizHistory: QuizResult[];
    savedQuizState: SavedQuizState | null;
    achievementToastQueue: Achievement[];
}

type QuizAction =
  | { type: 'SELECT_LANGUAGE'; payload: Language }
  | { type: 'START_SETUP' }
  | { type: 'START_QUIZ'; payload: { level: Level; questions: Question[] } }
  | { type: 'ANSWER_QUESTION'; payload: { answer: string; isCorrect: boolean } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'FINISH_QUIZ' }
  | { type: 'RESTART' }
  | { type: 'SET_HISTORY'; payload: QuizResult[] }
  | { type: 'SET_SAVED_QUIZ'; payload: SavedQuizState | null }
  | { type: 'RESUME_QUIZ'; payload: { language: Language; level: Level; savedState: SavedQuizState } }
  | { type: 'SHOW_ACHIEVEMENT'; payload: Achievement }
  | { type: 'DISMISS_ACHIEVEMENT' }
  | { type: 'SET_LOADING'; payload: QuizStatus };


const initialState: QuizState = {
    status: 'idle',
    selectedLanguage: null,
    selectedLevel: null,
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    score: 0,
    streak: 0,
    longestStreak: 0,
    quizHistory: [],
    savedQuizState: null,
    achievementToastQueue: [],
};

const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
    switch (action.type) {
        case 'SELECT_LANGUAGE':
            return { ...state, status: 'selecting_language', selectedLanguage: action.payload };
        case 'START_SETUP':
            return { ...state, status: 'selecting_level' };
        case 'SET_LOADING':
            return { ...state, status: action.payload };
        case 'START_QUIZ':
            return {
                ...state,
                status: 'in_progress',
                selectedLevel: action.payload.level,
                questions: action.payload.questions,
                currentQuestionIndex: 0,
                score: 0,
                userAnswers: Array(action.payload.questions.length).fill(null),
                streak: 0,
                longestStreak: 0,
            };
        case 'ANSWER_QUESTION': {
            const newAnswers = [...state.userAnswers];
            newAnswers[state.currentQuestionIndex] = action.payload.answer;
            const newStreak = action.payload.isCorrect ? state.streak + 1 : 0;
            return {
                ...state,
                userAnswers: newAnswers,
                score: action.payload.isCorrect ? state.score + 1 : state.score,
                streak: newStreak,
                longestStreak: Math.max(state.longestStreak, newStreak),
            };
        }
        case 'NEXT_QUESTION':
            return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
        case 'FINISH_QUIZ':
            return { ...state, status: 'finished' };
        case 'RESTART':
            return { ...initialState, quizHistory: state.quizHistory, status: 'idle' };
        case 'SET_HISTORY':
            return { ...state, quizHistory: action.payload };
        case 'SET_SAVED_QUIZ':
            return { ...state, savedQuizState: action.payload };
        case 'RESUME_QUIZ':
            return {
                ...state,
                status: 'in_progress',
                selectedLanguage: action.payload.language,
                selectedLevel: action.payload.level,
                questions: action.payload.savedState.questions,
                currentQuestionIndex: action.payload.savedState.currentQuestionIndex,
                userAnswers: action.payload.savedState.userAnswers,
                score: action.payload.savedState.score,
            }
        case 'SHOW_ACHIEVEMENT':
             if (state.achievementToastQueue.some(a => a.id === action.payload.id)) {
                return state;
            }
            return {
                ...state,
                achievementToastQueue: [...state.achievementToastQueue, action.payload],
            };
        case 'DISMISS_ACHIEVEMENT':
            return {
                ...state,
                achievementToastQueue: state.achievementToastQueue.slice(1),
            };
        default:
            return state;
    }
};

interface QuizContextType {
    state: QuizState;
    selectLanguage: (language: Language) => void;
    startQuizSetup: () => void;
    setupComplete: (levelName: string) => Promise<void>;
    answerQuestion: (answer: string) => void;
    nextQuestion: () => void;
    restartQuiz: () => void;
    resumeQuiz: () => void;
    clearSavedQuiz: () => void;
    dismissAchievement: () => void;
    saveQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = (): QuizContextType => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(quizReducer, initialState);
    const { user, updateUser } = useAuth();
    
    // Load/save user-specific data from localStorage
    useEffect(() => {
        if (user) {
            try {
                const storedHistory = localStorage.getItem(`quiz_history_${user.email}`);
                dispatch({ type: 'SET_HISTORY', payload: storedHistory ? JSON.parse(storedHistory) : [] });
                
                const storedQuiz = localStorage.getItem(`saved_quiz_${user.email}`);
                dispatch({ type: 'SET_SAVED_QUIZ', payload: storedQuiz ? JSON.parse(storedQuiz) : null });

            } catch (error) {
                console.error("Failed to load data from localStorage:", error);
            }
        }
    }, [user]);

    // Persist history to localStorage
    useEffect(() => {
        if (user && state.quizHistory.length > 0) {
            localStorage.setItem(`quiz_history_${user.email}`, JSON.stringify(state.quizHistory));
        }
    }, [state.quizHistory, user]);

    const checkAndUnlockAchievements = useCallback((params: {
        isMidQuiz?: boolean;
        isQuizEnd?: boolean;
    }) => {
        if (!user) return;
    
        const { isMidQuiz, isQuizEnd } = params;
        let newAchievements: string[] = [];
        let updatedUserCopy = { ...user };
    
        const unlock = (id: string) => {
            if (!user.unlockedAchievements.includes(id)) {
                newAchievements.push(id);
                const achievement = ACHIEVEMENTS_LIST.find(a => a.id === id);
                if (achievement) dispatch({ type: 'SHOW_ACHIEVEMENT', payload: achievement });
            }
        };
    
        if (isMidQuiz) {
            if (state.quizHistory.length === 0 && state.currentQuestionIndex === 0) unlock('FIRST_QUIZ');
            if (state.streak === 5) unlock('STREAK_5');
            if (state.streak === 10) unlock('STREAK_10');
        } else if (isQuizEnd && state.selectedLevel) {
            const percentage = state.questions.length > 0 ? (state.score / state.questions.length) * 100 : 0;
            if (percentage === 100) {
                if (state.selectedLevel.difficulty === Difficulty.BEGINNER) unlock('PERFECT_BEGINNER');
                if (state.selectedLevel.difficulty === Difficulty.INTERMEDIATE) unlock('PERFECT_INTERMEDIATE');
                if (state.selectedLevel.difficulty === Difficulty.ADVANCED) unlock('PERFECT_ADVANCED');
            }
            const uniqueLanguages = new Set(state.quizHistory.map(h => h.languageName));
            if (uniqueLanguages.size >= 3) unlock('POLYGLOT_3');
            if (state.quizHistory.length >= 10) unlock('DEDICATION');
            if (state.longestStreak > (user.longestStreakEver || 0)) {
                updatedUserCopy.longestStreakEver = state.longestStreak;
            }
        }
    
        if (newAchievements.length > 0) {
            updatedUserCopy.unlockedAchievements = [...user.unlockedAchievements, ...newAchievements];
        }

        if (newAchievements.length > 0 || updatedUserCopy.longestStreakEver !== user.longestStreakEver) {
            updateUser(updatedUserCopy);
        }
    }, [user, state, updateUser]);

    const selectLanguage = (language: Language) => dispatch({ type: 'SELECT_LANGUAGE', payload: language });
    const startQuizSetup = () => dispatch({ type: 'START_SETUP' });

    const setupComplete = async (levelName: string) => {
        if (!state.selectedLanguage) return;
        const level = state.selectedLanguage.levels.find(l => l.name === levelName);
        if (level) {
            dispatch({ type: 'SET_LOADING', payload: 'generating_questions' });
            clearSavedQuiz();
            const questions = await generateQuizQuestions(state.selectedLanguage, level);
            dispatch({ type: 'START_QUIZ', payload: { level, questions } });
        }
    };

    const answerQuestion = (answer: string) => {
        const question = state.questions[state.currentQuestionIndex];
        const isCorrect = answer === question.correctAnswer;
        dispatch({ type: 'ANSWER_QUESTION', payload: { answer, isCorrect } });
        checkAndUnlockAchievements({ isMidQuiz: true });
    };

    const nextQuestion = () => {
        if (state.currentQuestionIndex < state.questions.length - 1) {
            dispatch({ type: 'NEXT_QUESTION' });
        } else {
            if (state.selectedLanguage && state.selectedLevel) {
                const newResult: QuizResult = {
                    languageName: state.selectedLanguage.name,
                    levelName: state.selectedLevel.name,
                    difficulty: state.selectedLevel.difficulty,
                    score: state.score,
                    totalQuestions: state.questions.length,
                    date: new Date().toISOString(),
                };
                const updatedHistory = [...state.quizHistory, newResult];
                dispatch({ type: 'SET_HISTORY', payload: updatedHistory });
                checkAndUnlockAchievements({ isQuizEnd: true });
            }
            clearSavedQuiz();
            dispatch({ type: 'FINISH_QUIZ' });
        }
    };
    
    const restartQuiz = () => dispatch({ type: 'RESTART' });
    const dismissAchievement = () => dispatch({ type: 'DISMISS_ACHIEVEMENT' });

    const clearSavedQuiz = useCallback(() => {
        if (user) {
            localStorage.removeItem(`saved_quiz_${user.email}`);
            dispatch({ type: 'SET_SAVED_QUIZ', payload: null });
        }
    }, [user]);
    
    const resumeQuiz = () => {
        if (state.savedQuizState) {
            const language = QUIZ_DATA.find(lang => lang.code === state.savedQuizState!.languageCode);
            const level = language?.levels.find(l => l.name === state.savedQuizState!.levelName);
            if(language && level) {
                dispatch({ type: 'RESUME_QUIZ', payload: { language, level, savedState: state.savedQuizState } });
            } else {
                clearSavedQuiz();
            }
        }
    };

    const saveQuiz = useCallback(() => {
        if (user && state.status === 'in_progress') {
            const stateToSave: SavedQuizState = {
                languageCode: state.selectedLanguage!.code,
                levelName: state.selectedLevel!.name,
                questions: state.questions,
                currentQuestionIndex: state.currentQuestionIndex,
                score: state.score,
                userAnswers: state.userAnswers,
            };
            localStorage.setItem(`saved_quiz_${user.email}`, JSON.stringify(stateToSave));
            dispatch({type: 'SET_SAVED_QUIZ', payload: stateToSave});
        }
    }, [user, state]);

    const value = {
        state,
        selectLanguage,
        startQuizSetup,
        setupComplete,
        answerQuestion,
        nextQuestion,
        restartQuiz,
        resumeQuiz,
        clearSavedQuiz,
        dismissAchievement,
        saveQuiz
    };

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
