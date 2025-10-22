"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function GenZQuizScreen() {
   const [selected, setSelected] = useState(null);
   const [isAnswered, setIsAnswered] = useState(false);

   const question = {
      text: "Which slang means something is amazing or really cool?",
      options: ["Cringe", "Lit", "Sus", "Lowkey"],
      correct: "Lit",
   };

   const handleSelect = (option: any) => {
      if (!isAnswered) {
         setSelected(option);
         setIsAnswered(true);
      }
   };

   return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 via-pink-500 to-orange-400 p-6 text-white">
         <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center drop-shadow-lg">
            ⚡ GenZ Quiz ⚡
         </h1>

         <Card className="w-full max-w-2xl !min-h-[600px] bg-white/20 backdrop-blur-lg border-none shadow-2xl">
            <CardContent className="p-6 md:p-8">
               <h2 className="text-2xl md:text-3xl font-bold mb-8 h-18 text-center animate-fade">
                  {question.text}
               </h2>

               <div className="flex flex-col gap-4">
                  {question.options.map((option, index) => {
                     const isCorrect = option === question.correct;
                     const isSelected = option === selected;

                     return (
                        <button
                           key={index}
                           onClick={() => handleSelect(option)}
                           className={cn(
                              "w-full py-4 rounded-2xl text-lg font-semibold transition-all border-2 backdrop-blur-md bg-white/10 hover:bg-white/20",
                              "animate-fade-up",
                              isAnswered &&
                                 isSelected &&
                                 isCorrect &&
                                 "border-green-400",
                              isAnswered &&
                                 isSelected &&
                                 !isCorrect &&
                                 "border-red-400",
                              isAnswered && !isSelected ? "opacity-60" : ""
                           )}
                           style={{
                              animationDuration: `${index * 2 * 100}ms`,
                           }}
                        >
                           {option}
                           {isAnswered && isSelected && isCorrect && (
                              <CheckCircle className="inline ml-2 text-green-300" />
                           )}
                           {isAnswered && isSelected && !isCorrect && (
                              <XCircle className="inline ml-2 text-red-300" />
                           )}
                        </button>
                     );
                  })}
               </div>

               {isAnswered && (
                  <div className="mt-8 flex justify-center">
                     <button
                        className="flex items-center text-primary-foreground h-10 px-6 py-3 text-lg rounded-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-500 hover:to-pink-400"
                        onClick={() => {
                           setSelected(null);
                           setIsAnswered(false);
                        }}
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
