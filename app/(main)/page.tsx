'use client';
import { TopicSelection } from '@/components/TopicSelection';
import { StreakModal } from '@/components/StreakModal';
import { LeaderboardPanel } from '@/components/LeaderboardPanel';
import { useState } from 'react';
import { GameHeader } from '@/components/GameHeader2';
import TopicList from '@/app/(main)/components/TopicList';

export default function HomePage() {
   const [showLeaderboard, setShowLeaderboard] = useState(false);

   const handleSelectTopic = (topicId: string) => {
      // Topic selection is handled by TopicSelection component via router
   };

   // Topic Selection Screen (Home)
   return (
      <>
         {/* <GameHeader
            onLeaderboardClick={() => setShowLeaderboard(!showLeaderboard)}
         /> */}

         <div className="flex gap-6 max-w-5xl mx-auto px-4 py-6">
            <div className="flex flex-1 justify-center">
               <TopicList />
            </div>

            {/* {showLeaderboard && (
               <div className="w-80 hidden lg:block">
                  <LeaderboardPanel />
               </div>
            )} */}
         </div>

         <StreakModal />
      </>
   );
}
