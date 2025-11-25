import { Flame, Trophy, Heart, Zap, LogOut } from 'lucide-react';
import { Progress } from './ui/progress';
import { useState, useEffect } from 'react';
import { MeService } from '@/api/enspace-progress';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';

interface GameHeaderProps {
   onLeaderboardClick: () => void;
}

export function GameHeader({ onLeaderboardClick }: GameHeaderProps) {
   const router = useRouter();
   const user = useAuthStore((s) => s.user);
   const logout = useAuthStore((s) => s.logout);
   const [stats, setStats] = useState({
      streak: 0,
      dailyXp: 0,
      hearts: 5,
      rank: 0,
      dailyGoal: 500,
   });

   useEffect(() => {
      fetchStats();
   }, []);

   const fetchStats = async () => {
      try {
         const response = await MeService.getMeStats();
         if (response.result) {
            setStats({
               streak: response.result.currentStreak || 0,
               dailyXp: response.result.xp || 0,
               hearts: 5, // Hearts is not tracked in backend yet
               rank: 0, // Rank not in StatsDto
               dailyGoal: 500, // dailyGoal not in StatsDto
            });
         }
      } catch (error) {
         console.error('Failed to fetch stats:', error);
      }
   };

   const progressPercentage = stats.dailyGoal > 0 ? (stats.dailyXp / stats.dailyGoal) * 100 : 0;

   const getInitials = (name: string) => {
      return name
         .split(' ')
         .map((n) => n[0])
         .join('')
         .toUpperCase()
         .substring(0, 2);
   };

   const onLogout = () => {
      logout().then(() => router.push('/login'));
   };

   return (
      <header className="sticky top-0 z-50 bg-white border-b-4 border-gray-200 shadow-lg">
         <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
               {/* Logo */}
               <div className="flex items-center gap-2">
                  <div className="text-3xl">🦉</div>
                  <span className="text-green-600 hidden md:block">EnSpace</span>
               </div>

               {/* Stats */}
               <div className="flex items-center gap-3 md:gap-6 flex-1 justify-end max-w-2xl">
                  {/* Streak */}
                  <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-orange-100 hover:bg-orange-200 rounded-2xl transition-all hover:scale-105">
                     <Flame className="w-5 h-5 text-orange-500" />
                     <div className="flex flex-col items-start">
                        <span className="text-xs text-orange-600">Streak</span>
                        <span className="text-orange-600">{stats.streak}</span>
                     </div>
                  </button>

                  {/* XP */}
                  <div className="hidden sm:flex items-center gap-2 px-3 md:px-4 py-2 bg-yellow-100 rounded-2xl">
                     <Zap className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                     <div className="flex flex-col items-start">
                        <span className="text-xs text-yellow-600">Daily XP</span>
                        <span className="text-yellow-600">{stats.dailyXp}</span>
                     </div>
                  </div>

                  {/* Hearts */}
                  <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-red-100 rounded-2xl">
                     <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                     <div className="flex flex-col items-start">
                        <span className="text-xs text-red-600">Hearts</span>
                        <span className="text-red-600">{stats.hearts}</span>
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
                        <span className="text-purple-600">#{stats.rank || '-'}</span>
                     </div>
                  </button>

                  {/* User Menu */}
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <button className="focus:outline-none">
                           <Avatar className="w-10 h-10 border-4 border-white shadow-lg cursor-pointer hover:scale-105 transition-transform">
                              <AvatarImage src={user?.avatarUrl || undefined} alt={user?.fullName ?? ''} />
                              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                                 {user ? getInitials(user.fullName ?? '') : '?'}
                              </AvatarFallback>
                           </Avatar>
                        </button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>
                           <div className="flex flex-col">
                              <span className="font-semibold">{user?.fullName}</span>
                              <span className="text-xs text-gray-500">{user?.email}</span>
                           </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={onLogout} className="text-red-600 cursor-pointer">
                           <LogOut className="w-4 h-4 mr-2" />
                           Logout
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </div>

            {/* XP Progress Bar */}
            <div className="mt-4 hidden md:block">
               <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">Daily Goal</span>
                  <div className="flex-1">
                     <Progress value={progressPercentage} className="h-3" />
                  </div>
                  <span className="text-sm">
                     {stats.dailyXp} / {stats.dailyGoal} XP
                  </span>
               </div>
            </div>
         </div>
      </header>
   );
}
