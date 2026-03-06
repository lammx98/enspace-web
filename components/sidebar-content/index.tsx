'use client';

import React, { FC } from 'react';
import ProfileMenu from '../sidebar-menu/ProfileMenu';
import GameHeader from './GameHeader';
import { LeaderboardPanel } from '../LeaderboardPanel';

interface SideBarContentProps {}

const SideBarContent: FC<SideBarContentProps> = ({}) => {
   return (
      <div className="flex flex-col gap-4 p-8">
         <div className="">
            <GameHeader />
         </div>
      </div>
   );
};

export default SideBarContent;
