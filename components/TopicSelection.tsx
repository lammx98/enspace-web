import { motion } from 'motion/react';
import { Book, MessageCircle, Lightbulb, Pen, Music, Briefcase, Plane, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/hooks/use-app';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { TopicsService, TopicDto } from '@/api/enspace-content';

interface TopicSelectionProps {
   onSelectTopic: (topicId: string) => void;
}

export function TopicSelection({ onSelectTopic }: TopicSelectionProps) {
   const router = useRouter();
   const setActiveTopic = useAppStore((s) => s.setActiveTopic);
   const [topics, setTopics] = useState<TopicDto[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      fetchTopics();
   }, []);

   const fetchTopics = async () => {
      try {
         const response = await TopicsService.getTopics();
         if (response.result) {
            setTopics(response.result);
         }
      } catch (error) {
         console.error('Failed to fetch topics:', error);
         // Use fallback topics
      } finally {
         setIsLoading(false);
      }
   };

   return;
}
