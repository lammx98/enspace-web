'use client';

import React, { FC } from 'react';
import BasicLearning from './BasicLearning';

export interface LearningProps {
}

const Learning: FC<LearningProps> = ({}) => {
    return (
        <div>
            <BasicLearning />
        </div>
    );
};

export default Learning;