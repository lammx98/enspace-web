import { Flame, Trophy, Heart, Zap } from "lucide-react";
import { Progress } from "./ui/progress";

interface GameHeaderProps {
  onLeaderboardClick: () => void;
}

export function GameHeader({ onLeaderboardClick }: GameHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-3xl">🦉</div>
            <span className="text-green-600 hidden md:block">EngLingo</span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 md:gap-6 flex-1 justify-end max-w-2xl">
            {/* Streak */}
            <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-orange-100 hover:bg-orange-200 rounded-2xl transition-all hover:scale-105">
              <Flame className="w-5 h-5 text-orange-500" />
              <div className="flex flex-col items-start">
                <span className="text-xs text-orange-600">Streak</span>
                <span className="text-orange-600">7</span>
              </div>
            </button>

            {/* XP */}
            <div className="hidden sm:flex items-center gap-2 px-3 md:px-4 py-2 bg-yellow-100 rounded-2xl">
              <Zap className="w-5 h-5 text-yellow-600 fill-yellow-600" />
              <div className="flex flex-col items-start">
                <span className="text-xs text-yellow-600">Daily XP</span>
                <span className="text-yellow-600">340</span>
              </div>
            </div>

            {/* Hearts */}
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-red-100 rounded-2xl">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <div className="flex flex-col items-start">
                <span className="text-xs text-red-600">Hearts</span>
                <span className="text-red-600">5</span>
              </div>
            </div>

            {/* Leaderboard */}
            <button 
              onClick={onLeaderboardClick}
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 rounded-2xl transition-all hover:scale-105"
            >
              <Trophy className="w-5 h-5 text-purple-600" />
              <div className="flex flex-col items-start">
                <span className="text-xs text-purple-600">Rank</span>
                <span className="text-purple-600">#12</span>
              </div>
            </button>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center border-4 border-white shadow-lg">
              <span className="text-white">😊</span>
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mt-4 hidden md:block">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Daily Goal</span>
            <div className="flex-1">
              <Progress value={68} className="h-3" />
            </div>
            <span className="text-sm">340 / 500 XP</span>
          </div>
        </div>
      </div>
    </header>
  );
}
