import { motion } from 'motion/react';
import { ChevronLeft, LucideHeading1 } from 'lucide-react';

interface TopicHeaderProps {
   topicName: string;
   topicEmoji: string;
   onBack: () => void;
}

export function TopicHeader({ topicName, topicEmoji, onBack }: TopicHeaderProps) {
   return (
      <div className="mb-8">
         <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all mb-6"
         >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
            <span className="text-gray-700">Back to Topics</span>
         </button>

         <div className="text-center">
            <div className="text-6xl mb-3">{topicEmoji}</div>
            <h1 className="text-3xl mb-1 font-semibold bg-gradient-to-r from-indigo-900 to-pink-900 bg-clip-text text-transparent">{topicName}</h1>
            <p className="text-gray/90 drop-shadow">Complete lessons to master this topic!</p>
         </div>
      </div>
   );
}
