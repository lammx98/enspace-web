'use client';

import React, { FC } from 'react';
import ProfileMenu from './ProfileMenu';
import GameHeader from './GameHeader';

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
