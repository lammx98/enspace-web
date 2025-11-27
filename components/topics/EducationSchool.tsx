import { motion } from 'motion/react';
import { Star, BookOpen, GraduationCap, Apple } from 'lucide-react';
import { TopicCardProps } from './TopicCard';

const EducationSchool: React.FC<TopicCardProps> = ({ index }: TopicCardProps) => {
   return (
      <div className={`relative h-[180px] overflow-hidden bg-gradient-to-br from-indigo-200 via-purple-200 to-violet-200`}>
         <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-2 right-4">
            <GraduationCap className="w-10 h-10 text-indigo-600" />
         </motion.div>
         <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute bottom-3 left-3">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 opacity-60" />
         </motion.div>
         <div className="flex items-end justify-center h-full pb-8 gap-2">
            <motion.div
               animate={{ y: [0, -5, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
               className="w-14 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded shadow-xl"
            ></motion.div>
            <motion.div
               animate={{ y: [0, -5, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
               className="w-14 h-20 bg-gradient-to-br from-blue-400 to-blue-500 rounded shadow-xl"
            ></motion.div>
            <motion.div
               animate={{ y: [0, -5, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
               className="w-14 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded shadow-xl"
            ></motion.div>
            <motion.div
               animate={{ rotate: [0, 10, -10, 0], y: [0, -3, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
               className="absolute top-8 left-1/2 -translate-x-1/2"
            >
               <Apple className="w-10 h-10 text-red-500" />
            </motion.div>
         </div>
         <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, type: 'spring', stiffness: 200 }}
            className="absolute top-3 left-3 bg-white rounded-full p-2 shadow-lg"
         >
            <BookOpen className="w-5 h-5 text-indigo-600" />
         </motion.div>
      </div>
   );
};
export default EducationSchool;
