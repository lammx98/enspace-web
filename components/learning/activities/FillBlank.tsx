'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { FillBlankData } from './types';

interface FillBlankProps {
   data: FillBlankData;
   onCorrect?: () => void;
   onIncorrect?: () => void;
   onComplete?: () => void;
}

export function FillBlank({ data, onCorrect, onIncorrect, onComplete }: FillBlankProps) {
   const [answer, setAnswer] = useState('');
   const [showFeedback, setShowFeedback] = useState(false);
   const [isCorrect, setIsCorrect] = useState(false);

   const handleSubmit = () => {
      if (!answer.trim()) return;

      const correctAnswerNormalized = data.correctAnswer.trim().toLowerCase();
      const userAnswerNormalized = answer.trim().toLowerCase();
      const correct = userAnswerNormalized === correctAnswerNormalized;
      setIsCorrect(correct);
      setShowFeedback(true);

      if (correct) {
         onCorrect?.();
      } else {
         onIncorrect?.();
      }
   };

   const displaySentence = data.sentence.replace('___', '______');

   return (
      <div className="space-y-6 p-6">
         <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Điền từ vào chỗ trống</p>
            <p className="text-xl font-medium mb-4">{displaySentence}</p>
            {data.hint && (
               <p className="text-sm text-muted-foreground italic">Gợi ý: {data.hint}</p>
            )}
         </div>

         <div className="space-y-4">
            <Input
               type="text"
               placeholder="Nhập đáp án của bạn..."
               value={answer}
               onChange={(e) => setAnswer(e.target.value)}
               disabled={showFeedback}
               className={`text-lg h-12 ${
                  showFeedback
                     ? isCorrect
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                     : ''
               }`}
               autoFocus
            />

            {showFeedback && (
               <div
                  className={`flex items-center gap-3 p-4 rounded-xl ${
                     isCorrect ? 'bg-green-100' : 'bg-red-100'
                  }`}
               >
                  {isCorrect ? (
                     <>
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                        <span className="text-green-800 font-medium">Chính xác!</span>
                     </>
                  ) : (
                     <>
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                        <div>
                           <span className="text-red-800 font-medium">Chưa đúng. </span>
                           <span className="text-red-700">
                              Đáp án đúng là: <strong>{data.correctAnswer}</strong>
                           </span>
                        </div>
                     </>
                  )}
               </div>
            )}
         </div>

         {!showFeedback ? (
            <Button
               onClick={handleSubmit}
               disabled={!answer.trim()}
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
