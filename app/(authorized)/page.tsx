"use client";
import { LearningPath } from "@/components/LearningPath";
import { TopicSelection } from "@/components/TopicSelection";
import { StreakModal } from "@/components/StreakModal";
import { LeaderboardPanel } from "@/components/LeaderboardPanel";
import { QuizGame } from "@/components/QuizGame";
import { QuizResults } from "@/components/QuizResults";
import { useState } from "react";
import { GameHeader } from "@/components/GameHeader";

type Screen = "topics" | "learning" | "quiz" | "results";

export default function App() {
   const [showLeaderboard, setShowLeaderboard] = useState(false);
   const [currentScreen, setCurrentScreen] = useState<Screen>("topics");
   const [selectedTopic, setSelectedTopic] = useState<string>("basics");
   const [quizScore, setQuizScore] = useState(0);
   const [totalQuestions, setTotalQuestions] = useState(5);
   const [xpEarned, setXpEarned] = useState(0);

   const handleSelectTopic = (topicId: string) => {
      setSelectedTopic(topicId);
      setCurrentScreen("learning");
   };

   const handleBackToTopics = () => {
      setCurrentScreen("topics");
   };

   const handleStartQuiz = () => {
      setCurrentScreen("quiz");
   };

   const handleQuizComplete = (score: number, total: number, xp: number) => {
      setQuizScore(score);
      setTotalQuestions(total);
      setXpEarned(xp);
      setCurrentScreen("results");
   };

   const handleRestartQuiz = () => {
      setCurrentScreen("quiz");
   };

   const handleGoHome = () => {
      setCurrentScreen("topics");
   };

   // Quiz Screen
   if (currentScreen === "quiz") {
      return (
         <QuizGame
            onExit={() => setCurrentScreen("learning")}
            onComplete={handleQuizComplete}
         />
      );
   }

   // Results Screen
   if (currentScreen === "results") {
      return (
         <QuizResults
            score={quizScore}
            totalQuestions={totalQuestions}
            xpEarned={xpEarned}
            onRestart={handleRestartQuiz}
            onHome={handleGoHome}
         />
      );
   }

   // Learning Path Screen
   if (currentScreen === "learning") {
      return (
         <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 overflow-hidden">
            <GameHeader
               onLeaderboardClick={() => setShowLeaderboard(!showLeaderboard)}
            />

            <div className="flex gap-6 max-w-7xl mx-auto px-4 py-6">
               <div className="flex-1">
                  <LearningPath
                     topicId={selectedTopic}
                     onStartLesson={handleStartQuiz}
                     onBack={handleBackToTopics}
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
   }

   // Topic Selection Screen (Home)
   return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 overflow-hidden">
         <GameHeader
            onLeaderboardClick={() => setShowLeaderboard(!showLeaderboard)}
         />

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
