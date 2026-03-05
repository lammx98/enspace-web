'use client';

import { Award, BadgeCheck, BookOpenText, Settings, Sparkles, Users } from 'lucide-react';
import React, { FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import ProfileMenu from './ProfileMenu';

interface SideBarMenuProps {}

const SideBarMenu: FC<SideBarMenuProps> = ({}) => {
   return (
      <div className="bg-sidebar h-full flex flex-col">
         <div className="flex items-center justify-center text-2xl font-bold p-8">ENSPACE</div>
         <div className="flex flex-col justify-between flex-1">
            <div className="flex flex-col gap-2 py-4 px-8">
               <SideBarItem icon={<BookOpenText />} label="Hành trình" href="/" />
               <SideBarItem icon={<Award />} label="Thành tựu" href="" />
               <SideBarItem icon={<Users />} label="Cộng đồng" href="" />
               <SideBarItem icon={<BadgeCheck />} label="Bảng xếp hạng" href="" />
               <SideBarItem icon={<Settings />} label="Cài đặt" href="" />
            </div>
            <div className="p-8">
               <ProfileMenu />
            </div>
         </div>
      </div>
   );
};

const SideBarItem = ({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) => {
   const router = useRouter();
   const pathname = usePathname();
   const isActive = pathname === href;
   const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      router.push(href);
   };
   return (
      <a href={href} onClick={onClick} className={cn('flex items-center gap-2 p-4 rounded-2xl hover:bg-gray-200', isActive && 'bg-gray-200')}>
         {icon}
         <span>{label}</span>
      </a>
   );
};

export default SideBarMenu;
