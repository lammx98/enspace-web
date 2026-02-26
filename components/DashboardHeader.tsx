'use client';
import { Bell, Search, Menu, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
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
import { useAuthStore } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

export function DashboardHeader() {
   const router = useRouter();
   const user = useAuthStore((s) => s.user);
   const logout = useAuthStore((s) => s.logout);
   const [stats, setStats] = useState({
      streak: 0,
      level: 1,
      completedToday: 0,
      dailyGoal: 5,
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
               level: 1, // level not in StatsDto
               completedToday: response.result.completedWords || 0,
               dailyGoal: 5, // dailyGoal not in StatsDto
            });
         }
      } catch (error) {
         console.error('Failed to fetch stats:', error);
      }
   };

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

   const firstName = user?.fullName?.split(' ')[0] || 'User';

   return (
      <header className="mb-8">
         <div className="flex items-center justify-between mb-6">
            <button className="md:hidden p-2 hover:bg-white/50 rounded-lg">
               <Menu className="w-6 h-6" />
            </button>

            <div className="hidden md:block">
               <h1 className="text-gray-900 mb-1">Hey {firstName}! 👋</h1>
               <p className="text-gray-600 text-sm">Ready to level up your English?</p>
            </div>

            <div className="flex items-center gap-4">
               <div className="relative hidden md:block">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                     type="text"
                     placeholder="Search lessons..."
                     className="pl-10 pr-4 py-2 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                  />
               </div>

               <button className="relative p-2 hover:bg-white/50 rounded-lg">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
               </button>

               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <button className="focus:outline-none">
                        <Avatar className="cursor-pointer hover:scale-105 transition-transform">
                           <AvatarImage src={user?.avatarUrl || undefined} />
                           <AvatarFallback>{user ? getInitials(user.fullName ?? '') : '?'}</AvatarFallback>
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

         <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-gradient-to-r from-orange-400 to-pink-500 text-white border-0">🔥 {stats.streak} Day Streak</Badge>
            <Badge className="bg-gradient-to-r from-purple-400 to-blue-500 text-white border-0">⚡ Level {stats.level}</Badge>
            <Badge className="bg-gradient-to-r from-green-400 to-teal-500 text-white border-0">
               🎯 Daily Goal: {stats.completedToday}/{stats.dailyGoal}
            </Badge>
         </div>
      </header>
   );
}
