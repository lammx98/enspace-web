import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";

interface TopicHeaderProps {
  topicName: string;
  topicEmoji: string;
  onBack: () => void;
}

export function TopicHeader({ topicName, topicEmoji, onBack }: TopicHeaderProps) {
  return (
    <div className="mb-8">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -5 }}
        onClick={onBack}
        className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all mb-6"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
        <span className="text-gray-700">Back to Topics</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-6xl mb-3">{topicEmoji}</div>
        <h1 className="text-white drop-shadow-lg mb-2">{topicName}</h1>
        <p className="text-white/90 drop-shadow">Complete lessons to master this topic!</p>
      </motion.div>
    </div>
  );
}
