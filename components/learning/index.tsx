'use client';

import React, { FC, useState } from 'react';
import { X } from 'lucide-react';
import { ActivityRenderer } from './activities';
import { LearningSummary } from './LearningSummary';
import { Progress } from '@/components/ui/progress';

export interface ActivityItem {
   id?: number;
   type: number;
   data: unknown;
   level?: number;
}

export interface LearningProps {
   activities: ActivityItem[];
   onComplete?: (score: number, total: number) => void;
   onExit?: () => void;
}

const Learning: FC<LearningProps> = ({ activities, onComplete, onExit }) => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [score, setScore] = useState(0);

   const activity = activities[currentIndex];
   const total = activities.length;
   const isLastActivity = currentIndex === total - 1;
   const progress = total > 0 ? ((currentIndex + 1) / total) * 100 : 0;

   const handleCorrect = () => {
      setScore((s) => s + 1);
   };

   const handleContinue = () => {
      if (isLastActivity) {
         setCurrentIndex(total);
         onComplete?.(score, total);
      } else {
         setCurrentIndex((i) => i + 1);
      }
   };

   if (currentIndex >= total && total > 0) {
      return (
         <LearningSummary
            score={score}
            total={total}
            onRestart={() => {
               setCurrentIndex(0);
               setScore(0);
            }}
            onExit={onExit}
         />
      );
   }

   if (!activity || total === 0) {
      return (
         <div className="flex flex-col items-center justify-center min-h-[400px] text-muted-foreground gap-4">
            <p>Không có activity</p>
            {onExit && (
               <button
                  onClick={onExit}
                  className="px-4 py-2 rounded-lg border hover:bg-muted"
               >
                  Quay lại
               </button>
            )}
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400">
         <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b shadow-sm">
            <div className="max-w-2xl mx-auto px-4 py-3">
               <div className="flex items-center justify-between gap-4">
                  <button
                     onClick={onExit}
                     className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                     aria-label="Thoát"
                  >
                     <X className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="flex-1">
                     <Progress value={progress} className="h-2" />
                  </div>
                  <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
                     {currentIndex + 1} / {total}
                  </span>
               </div>
            </div>
         </div>

         <div className="max-w-2xl mx-auto p-4">
            <div className="rounded-2xl border bg-white shadow-lg overflow-hidden">
               <ActivityRenderer
                  type={activity.type}
                  data={activity.data}
                  onCorrect={handleCorrect}
                  onIncorrect={() => {}}
                  onComplete={handleContinue}
               />
            </div>
         </div>
      </div>
   );
};

export default Learning;
export { ActivityRenderer } from './activities';
export type { ActivityRendererProps } from './activities';
export { ACTIVITY_TYPE } from './activities';
export { LearningSummary } from './LearningSummary';
