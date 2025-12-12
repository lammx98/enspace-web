import { LessonNode } from './LessonNode';
import { Lock } from 'lucide-react';
import { TopicHeader } from './TopicHeader';
import { useState, useEffect } from 'react';
import { LessonsService, LessonDto } from '@/api/enspace-content';
import { useAppStore } from '@/hooks/use-app';

interface LearningPathProps {
   onStartLesson?: (lessonId: number) => void;
   onBack?: () => void;
}

interface Lesson {
   id: number;
   title: string;
   subtitle: string;
   type: 'lesson' | 'practice' | 'story' | 'test';
   status: 'completed' | 'current' | 'locked';
   xp: number;
   position: 'left' | 'right' | 'center';
   icon: string;
}

// Fallback topic data for when API fails
const defaultLessons: Lesson[] = [
   {
      id: 1,
      title: 'Unit 1',
      subtitle: 'Getting Started',
      type: 'lesson',
      status: 'current',
      xp: 50,
      position: 'left',
      icon: '👋',
   },
];

export function LearningPath({ onStartLesson, onBack }: LearningPathProps) {
   const activeTopic = useAppStore((s) => s.activeTopic);
   const [lessons, setLessons] = useState<Lesson[]>([]);
   const [topicName, setTopicName] = useState('Learning Path');
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      if (activeTopic?.id) fetchLessons(activeTopic.id);
   }, [activeTopic?.id]);

   const fetchLessons = async (topicId: number) => {
      try {
         const response = await LessonsService.getLessons({
            topicId,
         });

         if (response.result) {
            const mappedLessons = response.result.map((lesson, index) => ({
               id: lesson.id!,
               title: `Unit ${index + 1}`,
               subtitle: lesson.title || '',
               type: 'lesson' as const,
               status: (index === 0 ? 'current' : 'locked') as 'completed' | 'current' | 'locked',
               xp: 50,
               position: (index % 3 === 0 ? 'left' : index % 3 === 1 ? 'right' : 'center') as 'left' | 'right' | 'center',
               icon: getIconForIndex(index),
            }));
            setLessons(mappedLessons);
            // Use first lesson's topic info if available, or fallback
            setTopicName('Learning Path');
         }
      } catch (error) {
         console.error('Failed to fetch lessons:', error);
         // Use fallback data
         setLessons(defaultLessons);
      } finally {
         setIsLoading(false);
      }
   };

   const getIconForIndex = (index: number) => {
      const icons = ['👋', '🙋', '💪', '🔢', '🎨', '📝', '🎯', '🎮'];
      return icons[index % icons.length];
   };

   const handleLessonClick = (lessonId: number, status: string) => {
      if (status !== 'locked' && onStartLesson) {
         onStartLesson(lessonId);
      }
   };

   if (isLoading) {
      return (
         <div className="flex items-center justify-center min-h-screen">
            <div className="text-white text-2xl font-bold">Loading lessons...</div>
         </div>
      );
   }

   if (!activeTopic) {
      return (
         <div className="flex items-center justify-center min-h-screen">
            <div className="text-white text-2xl font-bold">Topic not found</div>
         </div>
      );
   }

   return (
      <div className="relative pb-20">
         {/* Topic Header */}
         {onBack && <TopicHeader topicName={topicName} topicEmoji="📚" onBack={onBack} />}

         {/* Learning Path */}
         <div className="relative max-w-2xl mx-auto px-4">
            {/* Path Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 transform -translate-x-1/2 -z-10" />

            <div className="space-y-8">
               {lessons.map((lesson, index) => (
                  <LessonNode key={lesson.id} {...lesson} delay={index * 0.1} onClick={() => handleLessonClick(lesson.id, lesson.status)} />
               ))}
            </div>

            {/* Bottom message */}
            <div className="text-center mt-16 mb-8">
               <div className="inline-block bg-white rounded-3xl px-8 py-4 shadow-xl border-4 border-gray-200">
                  <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Complete more lessons to unlock!</p>
               </div>
            </div>
         </div>
      </div>
   );
}
