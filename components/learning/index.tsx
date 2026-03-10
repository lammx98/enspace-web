'use client';

import React, { FC } from 'react';
import BasicLearning from './BasicLearning';

export interface LearningProps {}

const Learning: FC<LearningProps> = ({}) => {
   return (
      <div className="h-full w-full bg-white">
         <BasicLearning />
      </div>
   );
};

export default Learning;
