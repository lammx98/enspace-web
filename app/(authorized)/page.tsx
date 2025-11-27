"use client";
import { TopicSelection } from "@/components/TopicSelection";
import { StreakModal } from "@/components/StreakModal";
import { LeaderboardPanel } from "@/components/LeaderboardPanel";
import { useState } from "react";
import { GameHeader } from "@/components/GameHeader";

export default function HomePage() {
   const [showLeaderboard, setShowLeaderboard] = useState(false);

   const handleSelectTopic = (topicId: string) => {
      // Topic selection is handled by TopicSelection component via router
   };

   // Topic Selection Screen (Home)
   return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 overflow-hidden">
         {/* <GameHeader
            onLeaderboardClick={() => setShowLeaderboard(!showLeaderboard)}
         /> */}

         <div className="flex gap-6 max-w-7xl mx-auto px-4 py-6">
            <div className="flex-1">
               <TopicSelection onSelectTopic={handleSelectTopic} />
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
}
