'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { RearrangeSentenceData } from './types';

interface RearrangeSentenceProps {
   data: RearrangeSentenceData;
   onCorrect?: () => void;
   onIncorrect?: () => void;
   onComplete?: () => void;
}

export function RearrangeSentence({
   data,
   onCorrect,
   onIncorrect,
   onComplete,
}: RearrangeSentenceProps) {
   const [selectedOrder, setSelectedOrder] = useState<number[]>([]);
   const [remainingIndices, setRemainingIndices] = useState<number[]>(
      data.words.map((_, i) => i)
   );
   const [showFeedback, setShowFeedback] = useState(false);

   const correctOrder = data.correctOrder;
   const isCorrect =
      selectedOrder.length === correctOrder.length &&
      selectedOrder.every((val, i) => val === correctOrder[i]);

   const handleWordClick = (wordIndex: number, fromRemaining: boolean) => {
      if (showFeedback) return;

      if (fromRemaining) {
         setSelectedOrder([...selectedOrder, wordIndex]);
         setRemainingIndices(remainingIndices.filter((i) => i !== wordIndex));
      } else {
         setSelectedOrder(selectedOrder.filter((_, i) => selectedOrder[i] !== wordIndex));
         setRemainingIndices([...remainingIndices, wordIndex].sort((a, b) => a - b));
      }
   };

   const handleSubmit = () => {
      if (selectedOrder.length !== data.words.length) return;

      setShowFeedback(true);

      if (isCorrect) {
         onCorrect?.();
      } else {
         onIncorrect?.();
      }
   };

   const handleReset = () => {
      if (showFeedback) return;
      setSelectedOrder([]);
      setRemainingIndices(data.words.map((_, i) => i));
   };

   return (
      <div className="space-y-6 p-6">
         <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Sắp xếp các từ thành câu đúng</p>
            <p className="text-sm text-muted-foreground">
               Nhấn vào từ để chọn hoặc bỏ chọn theo thứ tự
            </p>
         </div>

         <div className="space-y-4">
            <div className="min-h-[60px] p-4 rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/30 flex flex-wrap gap-2 items-center">
               {selectedOrder.length === 0 ? (
                  <span className="text-muted-foreground">Chọn các từ theo thứ tự...</span>
               ) : (
                  selectedOrder.map((wordIndex, i) => (
                     <button
                        key={`${wordIndex}-${i}`}
                        type="button"
                        onClick={() => handleWordClick(wordIndex, false)}
                        disabled={showFeedback}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
                     >
                        <GripVertical className="w-4 h-4" />
                        {data.words[wordIndex]}
                     </button>
                  ))
               )}
            </div>

            <div className="flex flex-wrap gap-2">
               {remainingIndices.map((wordIndex) => (
                  <button
                     key={wordIndex}
                     type="button"
                     onClick={() => handleWordClick(wordIndex, true)}
                     disabled={showFeedback}
                     className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 border border-border transition-colors"
                  >
                     {data.words[wordIndex]}
                  </button>
               ))}
            </div>

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
                              Câu đúng: "
                              <strong>
                                 {correctOrder.map((i) => data.words[i]).join(' ')}
                              </strong>
                              "
                           </span>
                        </div>
                     </>
                  )}
               </div>
            )}
         </div>

         <div className="flex gap-3">
            {!showFeedback && (
               <Button
                  onClick={handleReset}
                  variant="outline"
                  disabled={selectedOrder.length === 0}
                  className="flex-1"
               >
                  Làm lại
               </Button>
            )}
            {!showFeedback ? (
               <Button
                  onClick={handleSubmit}
                  disabled={selectedOrder.length !== data.words.length}
                  className="flex-1"
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
      </div>
   );
}
