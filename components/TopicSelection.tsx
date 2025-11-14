import { motion } from "motion/react";
import {
   Book,
   MessageCircle,
   Lightbulb,
   Pen,
   Music,
   Briefcase,
   Plane,
   Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/hooks/use-app";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TopicsService, TopicDto } from "@/api/enspace-content";

interface Topic {
   id: number;
   name: string;
   description: string;
   icon: any;
   color: string;
   gradient: string;
   progress: number;
   lessonsCount: number;
   emoji: string;
}

interface TopicSelectionProps {
   onSelectTopic: (topicId: string) => void;
}

const defaultTopics: Topic[] = [
   {
      id: 1,
      name: "Basics",
      description: "Start your English journey",
      icon: Book,
      color: "blue",
      gradient: "from-blue-400 to-blue-600",
      progress: 0,
      lessonsCount: 12,
      emoji: "📚",
   },
   {
      id: 2,
      name: "Conversation",
      description: "Practice everyday dialogues",
      icon: MessageCircle,
      color: "green",
      gradient: "from-green-400 to-green-600",
      progress: 0,
      lessonsCount: 15,
      emoji: "💬",
   },
];
export function TopicSelection({ onSelectTopic }: TopicSelectionProps) {
   const router = useRouter();
   const setActiveTopic = useAppStore((s) => s.setActiveTopic);
   const [topics, setTopics] = useState<Topic[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      fetchTopics();
   }, []);

   const fetchTopics = async () => {
      try {
         const response = await TopicsService.getApiTopics();
         if (response.result) {
            // Map API data to UI format
            const mappedTopics = response.result.map((topic, index) => ({
               id: topic.id!,
               name: topic.name!,
               description: topic.description || "Start learning now",
               icon: getIconForIndex(index),
               color: getColorForIndex(index),
               gradient: getGradientForIndex(index),
               progress: 0, // TODO: Get from progress API
               lessonsCount: 0, // TODO: Get lesson count
               emoji: getEmojiForIndex(index),
            }));
            setTopics(mappedTopics);
         }
      } catch (error) {
         console.error("Failed to fetch topics:", error);
         // Use fallback topics
         setTopics(defaultTopics);
      } finally {
         setIsLoading(false);
      }
   };

   const getIconForIndex = (index: number) => {
      const icons = [Book, MessageCircle, Lightbulb, Pen, Music, Briefcase, Plane, Heart];
      return icons[index % icons.length];
   };

   const getColorForIndex = (index: number) => {
      const colors = ["blue", "green", "yellow", "purple", "pink", "indigo", "cyan", "red"];
      return colors[index % colors.length];
   };

   const getGradientForIndex = (index: number) => {
      const gradients = [
         "from-blue-400 to-blue-600",
         "from-green-400 to-green-600",
         "from-yellow-400 to-orange-500",
         "from-purple-400 to-purple-600",
         "from-pink-400 to-pink-600",
         "from-indigo-400 to-indigo-600",
         "from-cyan-400 to-cyan-600",
         "from-red-400 to-red-600",
      ];
      return gradients[index % gradients.length];
   };

   const getEmojiForIndex = (index: number) => {
      const emojis = ["📚", "💬", "💡", "✍️", "🎭", "💼", "✈️", "🤙"];
      return emojis[index % emojis.length];
   };

   const onSelect = (topicId: number) => {
      setActiveTopic(topicId.toString());
      router.push('/learn');
   };

   const getProgressColor = (color: string) => {
      const colors: { [key: string]: string } = {
         blue: "bg-blue-500",
         green: "bg-green-500",
         yellow: "bg-yellow-500",
         purple: "bg-purple-500",
         pink: "bg-pink-500",
         indigo: "bg-indigo-500",
         cyan: "bg-cyan-500",
         red: "bg-red-500",
      };
      return colors[color] || "bg-blue-500";
   };

   if (isLoading) {
      return (
         <div className="flex items-center justify-center min-h-screen">
            <div className="text-white text-2xl font-bold">Loading topics...</div>
         </div>
      );
   }

   return (
      <div className="pb-20">
         {/* Header */}
         <div className="text-center mb-8">
            <motion.div
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ type: "spring", stiffness: 200 }}
               className="inline-block mb-4"
            >
               <div className="text-7xl">🎯</div>
            </motion.div>
            <h1 className="text-white drop-shadow-lg mb-2">
               Choose Your Topic
            </h1>
            <p className="text-white/90 drop-shadow">
               What do you want to learn today?
            </p>
         </div>

         {/* Topics Grid */}
         <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {topics.map((topic, index) => {
               const Icon = topic.icon;
               return (
                  <button
                     key={topic.id}
                     //  onClick={() => onSelectTopic(topic.id)}
                     onClick={() => onSelect(topic.id)}
                     className={cn(
                        "bg-white rounded-3xl p-6 shadow-2xl border-4 border-gray-200 text-left",
                        "hover:border-gray-300 hover:scale-105 hover:-translate-y-1 active:scale-95",
                        "transition-all duration-300 ease-out",
                        `animate-fade-up animate-duration-[400ms]`
                     )}
                     style={{ animationDelay: index * 50 + "ms" }}
                  >
                     {/* Icon */}
                     <div
                        className={`w-16 h-16 bg-gradient-to-br ${topic.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
                     >
                        <span className="text-3xl">{topic.emoji}</span>
                     </div>

                     {/* Content */}
                     <h3 className="text-gray-900 mb-1">{topic.name}</h3>
                     <p className="text-sm text-gray-600 mb-4">
                        {topic.description}
                     </p>

                     {/* Stats */}
                     <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-500">
                           {topic.lessonsCount} lessons
                        </span>
                        <span className="text-xs text-gray-500">
                           {topic.progress}% complete
                        </span>
                     </div>

                     {/* Progress Bar */}
                     <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                           initial={{ width: 0 }}
                           animate={{ width: `${topic.progress}%` }}
                           transition={{
                              delay: index * 0.1 + 0.3,
                              duration: 0.8,
                           }}
                           className={`h-full ${getProgressColor(topic.color)}`}
                        />
                     </div>

                     {/* Status Badge */}
                     {topic.progress > 0 && (
                        <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-green-100 rounded-full">
                           <span className="text-xs text-green-700">
                              In Progress 🔥
                           </span>
                        </div>
                     )}
                     {topic.progress === 0 && (
                        <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-blue-100 rounded-full">
                           <span className="text-xs text-blue-700">
                              New Topic ✨
                           </span>
                        </div>
                     )}
                  </button>
               );
            })}
         </div>

         {/* Mascot Message */}
         <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
         >
            <div className="inline-block bg-white rounded-3xl px-8 py-6 shadow-2xl border-4 border-gray-200 max-w-md">
               <div className="flex items-start gap-4">
                  <div className="text-5xl">🦉</div>
                  <div className="flex-1 text-left">
                     <p className="text-gray-700">
                        Pick any topic to continue your learning journey! Each
                        topic has fun lessons and quizzes waiting for you! 🌟
                     </p>
                  </div>
               </div>
            </div>
         </motion.div>
      </div>
   );
}
