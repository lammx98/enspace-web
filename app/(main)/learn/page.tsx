'use client';

import { LearningPath } from '@/app/(main)/learn/components/LearningPath';
import { LeaderboardPanel } from '@/components/LeaderboardPanel';
import { QuizResults } from '@/components/QuizResults';
import { useState } from 'react';
import { useAppStore } from '@/hooks/use-app';
import { useRouter } from 'next/navigation';
import Learning from '@/components/learning';
import { ActivitiesService } from '@/api/enspace-content';
import type { ActivityItem } from '@/components/learning';

type Screen = 'learning' | 'quiz' | 'results';

export default function LearnPage() {
   const [showLeaderboard, setShowLeaderboard] = useState(false);
   const [currentScreen, setCurrentScreen] = useState<Screen>('learning');
   const [selectedLesson, setSelectedLesson] = useState<number>(1);
   const [activities, setActivities] = useState<ActivityItem[]>([]);
   const [isLoadingActivities, setIsLoadingActivities] = useState(false);
   const [quizScore, setQuizScore] = useState(0);
   const [totalQuestions, setTotalQuestions] = useState(5);
   const [xpEarned, setXpEarned] = useState(0);

   const activeTopic = useAppStore((s) => s.activeTopic);
   const router = useRouter();

   const handleBackToTopics = () => {
      router.push('/');
   };

   const handleStartQuiz = async (lessonId: number) => {
      setSelectedLesson(lessonId);
      setIsLoadingActivities(true);
      setCurrentScreen('quiz');
      try {
         const res = await ActivitiesService.getLessonsActivities({ lessonId });
         const items: ActivityItem[] = (res.result ?? []).map((a) => ({
            id: a.id,
            type: (a.type as number) ?? 1,
            data: a.data ?? {},
            level: a.level,
         }));
         setActivities(items);
      } catch (err) {
         console.error('Failed to fetch activities:', err);
         setActivities([]);
      } finally {
         setIsLoadingActivities(false);
      }
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
      return (
         <div className="fixed inset-0 z-50">
            {isLoadingActivities ? (
               <div className="flex items-center justify-center min-h-screen bg-white">
                  <div className="text-muted-foreground">Đang tải...</div>
               </div>
            ) : activities.length > 0 ? (
               <Learning
                  activities={activities}
                  onComplete={(score, total) => {
                     setQuizScore(score);
                     setTotalQuestions(total);
                     setXpEarned(score * 10);
                  }}
                  onExit={() => setCurrentScreen('learning')}
               />
            ) : (
               <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-4">
                  <p className="text-muted-foreground">Chưa có bài tập</p>
                  <button
                     onClick={() => setCurrentScreen('learning')}
                     className="px-4 py-2 rounded-lg border hover:bg-muted"
                  >
                     Quay lại
                  </button>
               </div>
            )}
         </div>
      );
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
