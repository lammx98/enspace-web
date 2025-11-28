'use client';

import React, { FC } from 'react';
import { TopicCard } from './TopicCard';

interface TopicListProps {}

const topics = [
   {
      id: 1,
      name: 'Daily Conversation',
      description: 'Basic everyday communication topics',
      order: 1,
   },
   {
      id: 2,
      name: 'Workplace English',
      description: 'Useful phrases and situations at work',
      order: 2,
   },
   {
      id: 3,
      name: 'Travel & Tourism',
      description: 'English for traveling abroad',
      order: 3,
   },
   {
      id: 4,
      name: 'Shopping',
      description: 'Common phrases for buying things',
      order: 4,
   },
   {
      id: 5,
      name: 'Food & Restaurant',
      description: 'Ordering food and talking about meals',
      order: 5,
   },
   {
      id: 6,
      name: 'Health & Medicine',
      description: 'Discussing health and medical issues',
      order: 6,
   },
   {
      id: 7,
      name: 'Education & School',
      description: 'English for academic environments',
      order: 7,
   },
   {
      id: 8,
      name: 'Technology',
      description: 'Talking about gadgets and digital life',
      order: 8,
   },
   {
      id: 9,
      name: 'Family & Relationships',
      description: 'Describing people and relationships',
      order: 9,
   },
   {
      id: 10,
      name: 'Hobbies & Leisure',
      description: 'Talking about interests and free-time activities',
      order: 10,
   },
   {
      id: 11,
      name: 'Weather',
      description: 'Discussing weather conditions',
      order: 11,
   },
   {
      id: 12,
      name: 'Transportation',
      description: 'Using public transport and directions',
      order: 12,
   },
   {
      id: 13,
      name: 'Money & Finance',
      description: 'Basic financial vocabulary and situations',
      order: 13,
   },
   {
      id: 14,
      name: 'Accommodation',
      description: 'Booking and describing places to stay',
      order: 14,
   },
   {
      id: 15,
      name: 'Environment',
      description: 'Talking about nature and environmental issues',
      order: 15,
   },
];
const TopicList: FC<TopicListProps> = ({}) => {
   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-3 gap-6">
         {topics.map((topic) => (
            <TopicCard topic={topic} index={topic.id} />
         ))}
      </div>
   );
};

export default TopicList;
