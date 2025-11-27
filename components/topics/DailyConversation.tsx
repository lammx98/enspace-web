import { motion } from 'motion/react';
import { MessageCircle, Users, Coffee, Smile, Heart, Star } from 'lucide-react';
import { TopicCardProps } from './TopicCard';
import { FC } from 'react';

const DailyConversation: FC<TopicCardProps> = ({ index }: TopicCardProps) => {
   return (
      <div className={`relative h-[180px] overflow-hidden bg-gradient-to-br from-amber-200 via-orange-200 to-pink-200`}>
         <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute top-2 left-2">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 opacity-60" />
         </motion.div>
         <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} className="absolute bottom-2 right-2">
            <Star className="w-5 h-5 text-pink-400 fill-pink-400 opacity-70" />
         </motion.div>
         <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-4 right-8">
            <Heart className="w-4 h-4 text-red-400 fill-red-400 opacity-70" />
         </motion.div>
         <div className="flex items-center justify-center h-full gap-3">
            <motion.div
               animate={{ rotate: [-5, 5, -5], y: [0, -3, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
               className="flex flex-col items-center"
            >
               <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-full p-4 shadow-lg">
                  <Smile className="w-8 h-8 text-white" />
               </div>
               <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="mt-2 bg-white rounded-2xl px-2 py-1 shadow-md"
               >
                  <MessageCircle className="w-4 h-4 text-blue-500" />
               </motion.div>
            </motion.div>
            <motion.div animate={{ y: [-3, 3, -3], rotate: [0, 5, 0, -5, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
               <Coffee className="w-7 h-7 text-amber-700" />
            </motion.div>
            <motion.div
               animate={{ rotate: [5, -5, 5], y: [0, -3, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
               className="flex flex-col items-center"
            >
               <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-full p-4 shadow-lg">
                  <Smile className="w-8 h-8 text-white" />
               </div>
               <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="mt-2 bg-white rounded-2xl px-2 py-1 shadow-md"
               >
                  <MessageCircle className="w-4 h-4 text-purple-500" />
               </motion.div>
            </motion.div>
         </div>
         <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, type: 'spring', stiffness: 200 }}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg"
         >
            <Users className="w-5 h-5 text-indigo-600" />
         </motion.div>
      </div>
   );
};
export default DailyConversation;
