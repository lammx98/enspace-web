'use client';

import React, { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/hooks/use-auth';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProfileMenuProps {}

const ProfileMenu: FC<ProfileMenuProps> = ({}) => {
   const user = useAuthStore((s) => s.user);
   const logout = useAuthStore((s) => s.logout);
   const router = useRouter();

   const onLogout = () => {
      logout().then(() => router.push('/login'));
   };

   return (
      <div className="flex flex-col items-center gap-2 p-8 rounded-3xl border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all border-dashed border-2 cursor-pointer">
         <Avatar className="p-[4px] bg-gradient-to-br from-purple-400 to-pink-400 size-24">
            <AvatarImage src={user?.avatarUrl || undefined} alt={user?.fullName ?? ''} />
            <AvatarFallback className="bg-white">
               <UserRound />
            </AvatarFallback>
         </Avatar>
         <div className="min-w-12">
            <span className="text-lg font-semibold">{user?.fullName}</span>
         </div>
      </div>
   );
};

export default ProfileMenu;
