import React, { useState, useEffect } from 'react';
import { useSound } from '../contexts/SoundContext';
import { useAuth } from '../contexts/AuthContext';
import { useQuiz } from '../contexts/QuizContext';
import { useLocalization } from '../contexts/LocalizationContext';

const QUESTION_TIME = 20;

const ProgressBar: React.FC<{ current: number, total: number, isAnswered: boolean }> = ({ current, total, isAnswered }) => {
    const displayCurrent = isAnswered ? current + 1 : current;
    const percentage = total > 0 ? (displayCurrent / total) * 100 : 0;
    const { t } = useLocalization();

    return (
        <div className="w-full bg-white/30 rounded-full h-3 sm:h-4 mb-2 border border-white/30">
            <div 
                className="bg-yellow-400 h-full rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${percentage}%` }}
                role="progressbar"
                aria-valuenow={displayCurrent}
                aria-valuemin={0}
                aria-valuemax={total}
                aria-label={t('quiz.question', { current: displayCurrent, total })}
            />
        </div>
    );
};

const TimerBar: React.FC<{ timeLeft: number; totalTime: number }> = ({ timeLeft, totalTime }) => {
  const { t } = useLocalization();
  const percentage = (timeLeft / totalTime) * 100;
  const barColor = percentage > 50 ? 'bg-green-400' : percentage > 25 ? 'bg-yellow-400' : 'bg-red-500';
  return (
      <div className="w-full bg-white/30 rounded-full h-2 my-2">
          <div
              className={`${barColor} h-full rounded-full`}
              style={{ width: `${percentage}%`, transition: 'width 1s linear' }}
              role="progressbar"
              aria-label={t('quiz.timeLeft', { seconds: timeLeft })}
          />
      </div>
  );
};

const QuizScreen: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLocalization();
  const { state, answerQuestion, nextQuestion, saveQuiz } = useQuiz();
  const { questions, currentQuestionIndex, userAnswers, score, streak, selectedLanguage, selectedLevel } = state;

  const question = questions[currentQuestionIndex];
  const userAnswer = userAnswers[currentQuestionIndex];
  const isAnswered = userAnswer !== null;
  const isCorrect = isAnswered && userAnswer === question.correctAnswer;
  
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [flashColor, setFlashColor] = useState<'green' | 'red' | null>(null);
  const { playSound } = useSound();

  // Timer logic
  useEffect(() => {
    setTimeLeft(QUESTION_TIME);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (isAnswered) return;

    if (timeLeft <= 0) {
      answerQuestion('');
      return;
    }

    const timerId = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft, isAnswered, answerQuestion]);

  // Save progress
  useEffect(() => {
    saveQuiz();
  }, [userAnswers, currentQuestionIndex, score, saveQuiz]);


  // Answer feedback effect
  useEffect(() => {
    if (isAnswered) {
        setFlashColor(isCorrect ? 'green' : 'red');
        const timer = setTimeout(() => setFlashColor(null), 500);
        playSound(isCorrect ? 'correct' : 'incorrect');
        return () => clearTimeout(timer);
    }
  }, [isAnswered, isCorrect, playSound]);

  const handleAnswerClick = (option: string) => {
    playSound('click');
    answerQuestion(option);
  }

  const handleAdvance = () => {
    nextQuestion();
  };
  
  // Auto-advance after timeout if question was auto-answered
  useEffect(() => {
    if (isAnswered && timeLeft <= 0) {
      const advanceTimer = setTimeout(() => handleAdvance(), 1500); // give user time to see the correct answer
      return () => clearTimeout(advanceTimer);
    }
  }, [isAnswered, timeLeft]);

  const getButtonClass = (option: string) => {
    if (!isAnswered) return "bg-white/40 hover:bg-white/60 text-slate-800 border-slate-300";
    if (option === question.correctAnswer) return "bg-green-500 text-white border-green-400 animate-bounce-custom";
    if (option === userAnswer) return "bg-red-500 text-white border-red-400 animate-shake";
    return "bg-slate-200/50 text-slate-500 border-slate-300/50";
  };
  
  const renderFeedback = () => {
    const userName = user ? user.name.split(' ')[0] : '';
    const feedbackText = isCorrect ? t('quiz.correctFeedback', { userName }) : t('quiz.incorrectFeedback');
    const parts = feedbackText.split(/<1>|<\/1>/);

    return (
        <p className={`text-base sm:text-lg font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {parts[0]}
            {parts.length > 1 && <span className="underline">{question.correctAnswer}</span>}
            {parts.length > 2 && parts[2]}
        </p>
    );
  };


  if (!question || !selectedLanguage || !selectedLevel) {
    return null; // or a loading state
  }

  return (
    <div className="relative bg-white/60 backdrop-blur-md p-3 sm:p-6 md:p-8 rounded-2xl shadow-2xl border border-white/30">
      <div 
        className={`flash-overlay rounded-2xl ${flashColor ? 'active' : ''}`}
        style={{ backgroundColor: flashColor === 'green' ? '#4ade80' : '#f87171' }}
      />
      <div className="relative z-10">
        {streak > 1 && (
          <div key={streak} className="absolute top-[-24px] right-2 flex items-center gap-1 bg-orange-500 text-white font-bold px-2 py-0.5 rounded-full animate-fade-in shadow-lg text-sm">
              <span role="img" aria-label="streak flame">🔥</span>
              <span>{streak}</span>
          </div>
        )}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-base sm:text-xl font-bold text-slate-800">
            {t('quiz.question', { current: currentQuestionIndex + 1, total: questions.length })}
          </h2>
          <div className="px-2 py-1 sm:px-4 sm:py-1.5 bg-yellow-400/20 text-yellow-600 font-bold rounded-full text-sm sm:text-lg">
            {t('common.score')}: {score}
          </div>
        </div>

        <ProgressBar current={currentQuestionIndex} total={questions.length} isAnswered={isAnswered} />
        <TimerBar timeLeft={timeLeft} totalTime={QUESTION_TIME} />

        <div key={currentQuestionIndex} className="my-4 space-y-4 animate-pop-in">
          {question.text && (
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 text-center py-2">
              {question.text}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              disabled={isAnswered}
              className={`w-full text-left p-3 sm:p-4 rounded-xl border-2 font-medium transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed text-sm sm:text-base ${getButtonClass(option)}`}
            >
              <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>
        
        {isAnswered && (
          <div className="text-center mt-4 p-3 sm:p-4 rounded-lg bg-white/40 animate-pop-in">
              {renderFeedback()}
               <button
                  onClick={handleAdvance}
                  className="mt-3 px-6 py-2 bg-orange-400 text-white font-bold rounded-xl text-base sm:text-lg shadow-lg hover:bg-orange-500 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
               >
                  {currentQuestionIndex === questions.length - 1 ? t('quiz.resultsButton') : t('quiz.nextButton')}
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;