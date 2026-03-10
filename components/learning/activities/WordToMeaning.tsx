'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ChooseTextData } from './types';

interface WordToMeaningProps {
   data: ChooseTextData;
   onCorrect?: () => void;
   onIncorrect?: () => void;
   onComplete?: () => void;
}

export function WordToMeaning({ data, onCorrect, onIncorrect, onComplete }: WordToMeaningProps) {
   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
   const [showFeedback, setShowFeedback] = useState(false);

   const handleSelect = (index: number) => {
      if (showFeedback) return;
      setSelectedIndex(index);
   };

   const handleSubmit = () => {
      if (selectedIndex === null) return;

      const isCorrect = selectedIndex === data.correctIndex;
      setShowFeedback(true);

      if (isCorrect) {
         onCorrect?.();
      } else {
         onIncorrect?.();
      }
   };

   return (
      <div className="space-y-6 p-6">
         <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Chọn nghĩa đúng của từ</p>
            <h2 className="text-2xl font-bold text-primary">{data.question}</h2>
         </div>

         <div className="space-y-3">
            {data.options.map((option, index) => {
               const isSelected = selectedIndex === index;
               const isCorrectAnswer = index === data.correctIndex;
               const showCorrect = showFeedback && isCorrectAnswer;
               const showIncorrect = showFeedback && isSelected && !isCorrectAnswer;

               return (
                  <button
                     key={index}
                     type="button"
                     onClick={() => handleSelect(index)}
                     disabled={showFeedback}
                     className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                        showCorrect
                           ? 'bg-green-100 border-green-500'
                           : showIncorrect
                             ? 'bg-red-100 border-red-500'
                             : isSelected
                               ? 'bg-blue-100 border-blue-500'
                               : 'bg-muted/50 border-border hover:border-primary/50 hover:bg-muted'
                     } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                     <span>{option.text}</span>
                     {showCorrect && <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />}
                     {showIncorrect && <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
                  </button>
               );
            })}
         </div>

         {!showFeedback ? (
            <Button
               onClick={handleSubmit}
               disabled={selectedIndex === null}
               className="w-full"
               size="lg"
            >
               Kiểm tra
            </Button>
         ) : (
            <Button onClick={() => onComplete?.()} className="w-full" size="lg" variant="secondary">
               Tiếp tục
            </Button>
         )}
      </div>
   );
}
