'use client';

import { LearningPath } from '@/components/LearningPath';
import { StreakModal } from '@/components/StreakModal';
import { LeaderboardPanel } from '@/components/LeaderboardPanel';
import { QuizGame } from '@/components/QuizGame';
import { QuizResults } from '@/components/QuizResults';
import { useState, useEffect } from 'react';
import { GameHeader } from '@/components/GameHeader';
import { useAppStore } from '@/hooks/use-app';
import { useRouter } from 'next/navigation';

type Screen = 'learning' | 'quiz' | 'results';

export default function LearnPage() {
   const [showLeaderboard, setShowLeaderboard] = useState(false);
   const [currentScreen, setCurrentScreen] = useState<Screen>('learning');
   const [selectedLesson, setSelectedLesson] = useState<number>(1);
   const [quizScore, setQuizScore] = useState(0);
   const [totalQuestions, setTotalQuestions] = useState(5);
   const [xpEarned, setXpEarned] = useState(0);

   const activeTopic = useAppStore((s) => s.activeTopic);
   const router = useRouter();

   const handleBackToTopics = () => {
      router.push('/');
   };

   const handleStartQuiz = (lessonId: number) => {
      setSelectedLesson(lessonId);
      setCurrentScreen('quiz');
   };

   const handleQuizComplete = (score: number, total: number, xp: number) => {
      setQuizScore(score);
      setTotalQuestions(total);
      setXpEarned(xp);
      setCurrentScreen('results');
   };

   const handleRestartQuiz = () => {
      setCurrentScreen('quiz');
   };

   const handleGoHome = () => {
      setCurrentScreen('learning');
   };

   // Quiz Screen
   if (currentScreen === 'quiz') {
      return <QuizGame lessonId={selectedLesson} onExit={() => setCurrentScreen('learning')} onComplete={handleQuizComplete} />;
   }

   // Results Screen
   if (currentScreen === 'results') {
      return <QuizResults score={quizScore} totalQuestions={totalQuestions} xpEarned={xpEarned} onRestart={handleRestartQuiz} onHome={handleGoHome} />;
   }

   // Learning Path Screen
   return (
      <div className="min-h-screen bg-gradient-to-b overflow-hidden">
         {/* <GameHeader onLeaderboardClick={() => setShowLeaderboard(!showLeaderboard)} /> */}

         <div className="flex gap-6 max-w-7xl mx-auto px-4 py-6">
            <div className="flex-1">
               <LearningPath onStartLesson={handleStartQuiz} onBack={handleBackToTopics} />
            </div>

            {showLeaderboard && (
               <div className="w-80 hidden lg:block">
                  <LeaderboardPanel />
               </div>
            )}
         </div>

         {/* <StreakModal /> */}
      </div>
   );
}
