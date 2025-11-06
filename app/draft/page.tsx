"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { VocabService } from "@/api/services/VocabService";
import type { VocabDTO } from "@/api/models/VocabDTO";
import { useSpeech } from "react-text-to-speech";

// Removed local QuizVocab interface in favor of VocabDTO
function speak(text: string, options?: SpeechSynthesisUtterance) {
   if (!("speechSynthesis" in window)) {
      alert("Sorry, your browser does not support text-to-speech!");
      return;
   }

   const utterance = new SpeechSynthesisUtterance(text);
   utterance.lang = options?.lang || "en-US";
   utterance.rate = options?.rate || 1;
   utterance.pitch = options?.pitch || 1;
   utterance.volume = options?.volume || 1;

   window.speechSynthesis.cancel(); // stop any ongoing speech
   window.speechSynthesis.speak(utterance);
}

export default function GenZQuizScreen() {
   const [vocabs, setVocabs] = useState<VocabDTO[]>([]);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [selected, setSelected] = useState<VocabDTO | null>(null);
   const [isAnswered, setIsAnswered] = useState(false);
   const [score, setScore] = useState(0);
   const [options, setOptions] = useState<VocabDTO[]>([]);
   const { start, stop } = useSpeech({
      text: selected?.text,
      lang: "en-US",
      rate: 1,
      pitch: 1,
   });

   // Load initial vocab on mount
   useEffect(() => {
      loadVocab();
   }, []);

   // Generate options whenever vocabList or current question changes
   useEffect(() => {
      if (vocabs.length > 0 && currentIndex < vocabs.length) {
         generateOptions();
      }
   }, [vocabs, currentIndex]);

   const loadVocab = async () => {
      VocabService.getVocabRandom({ count: 10 }).then((resData) => {
         setVocabs(resData.result ?? []);
      });
   };

   const capitalizeFirstLetter = (str: string | undefined | null) => {
      return str
         ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
         : "";
   };

   // Updated generateOptions to work with VocabDTO
   const generateOptions = () => {
      const currentVocab = vocabs[currentIndex];

      // Use VocabDTO directly
      const uniqueWrongOptions = new Set<VocabDTO>();
      const otherVocabs = vocabs.filter(
         (vocab: VocabDTO) => vocab.id !== currentVocab.id
      );

      while (
         uniqueWrongOptions.size < 3 &&
         uniqueWrongOptions.size < otherVocabs.length
      ) {
         const randomIndex = Math.floor(Math.random() * otherVocabs.length);
         uniqueWrongOptions.add(otherVocabs[randomIndex]);
      }

      const allOptions = [currentVocab, ...Array.from(uniqueWrongOptions)];
      setOptions(allOptions.sort(() => Math.random() - 0.5));
   };

   // Update handleSelect to accept VocabDTO and compare by id
   const handleSelect = (option: VocabDTO) => {
      if (!isAnswered) {
         setSelected(option);
         setIsAnswered(true);
         const current = vocabs[currentIndex];
         current.text && speak(current.text)
         if (option.id === current.id) {
            setScore((prev) => prev + 1);
         }
      }
   };

   const handleNext = async () => {
      const nextIndex = currentIndex + 1;
      
      if (nextIndex < vocabs.length) {
         setCurrentIndex(nextIndex);
         setSelected(null);
         setIsAnswered(false);
      } else {
         alert(`Quiz finished! Your score: ${score}`);
      }
   };

   if (vocabs.length === 0 || currentIndex >= vocabs.length) {
      return (
         <div className="min-h-screen flex items-center justify-center">
            Loading...
         </div>
      );
   }

   const currentQuestion = vocabs[currentIndex];

   return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-6 text-white">
         <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center drop-shadow-lg">
            ⚡ Genzy Quiz ⚡
         </h1>
         <div className="mb-4 text-xl">Score: {score}</div>
         <Card className="w-full max-w-2xl !min-h-[600px] bg-white/20 backdrop-blur-lg border-none shadow-2xl">
            <CardContent className="p-6 md:p-8">
               <div className="flex flex-col gap-2 items-center">
                  <span className="opacity-50">What is the meaning of</span>
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                     {capitalizeFirstLetter(currentQuestion.text)}
                  </h2>
               </div>
               <div className="flex flex-col gap-4">
                  {options.map((option, index) => {
                     const isCorrect = option.id === vocabs[currentIndex].id;
                     const isOptionSelected = selected?.id === option.id;
                     return (
                        <button
                           key={index}
                           onClick={() => handleSelect(option)}
                           className={cn(
                              "w-full py-4 rounded-2xl text-lg font-semibold transition-all border-2 backdrop-blur-md bg-white/10 hover:bg-white/20 hover:cursor-pointer",
                              isAnswered &&
                                 isOptionSelected &&
                                 isCorrect &&
                                 "border-green-400 text-green-900",
                              isAnswered &&
                                 isOptionSelected &&
                                 !isCorrect &&
                                 "border-red-400 text-red-900",
                              isAnswered && !isOptionSelected
                                 ? "opacity-60"
                                 : ""
                           )}
                        >
                           {capitalizeFirstLetter(option.meaning)}
                           {isAnswered && isOptionSelected && isCorrect && (
                              <CheckCircle className="inline ml-2 text-green-600" />
                           )}
                           {isAnswered && isOptionSelected && !isCorrect && (
                              <XCircle className="inline ml-2 text-red-600" />
                           )}
                        </button>
                     );
                  })}
               </div>
               {isAnswered && (
                  <div className="mt-8 flex justify-center">
                     <button
                        className="flex items-center justify-center text-primary-foreground h-14 w-full px-6 py-3 text-xl rounded-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-500 hover:to-pink-400 hover:cursor-pointer animate-fade-up animate-duration-200"
                        onClick={handleNext}
                     >
                        Next ➜
                     </button>
                  </div>
               )}
            </CardContent>
         </Card>
      </div>
   );
}
