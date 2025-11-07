'use client';

import { GameHeader } from '@/components/GameHeader';
import { LeaderboardPanel } from '@/components/LeaderboardPanel';
import { LearningPath } from '@/components/LearningPath';
import { StreakModal } from '@/components/StreakModal';
import { useAppStore } from '@/hooks/use-app';
import React, { FC, useState } from 'react';

interface LearnPageProps {}

const LearnPage: FC<LearnPageProps> = ({}) => {
   const activeTopic = useAppStore((s) => s.activeTopic);
   const [showLeaderboard, setShowLeaderboard] = useState(false);
   if (!activeTopic) return null;
   return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 overflow-hidden">
         <GameHeader onLeaderboardClick={() => setShowLeaderboard(!showLeaderboard)} />

         <div className="flex gap-6 max-w-7xl mx-auto px-4 py-6">
            <div className="flex-1">
               <LearningPath
                  topicId={activeTopic}
                  // onStartLesson={handleStartQuiz}
                  // onBack={handleBackToTopics}
               />
            </div>

            {showLeaderboard && (
               <div className="w-80 hidden lg:block">
                  <LeaderboardPanel />
               </div>
            )}
         </div>

         <StreakModal />
      </div>
   );
};

export default LearnPage;
