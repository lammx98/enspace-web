import { motion } from 'motion/react';
import {
   Users,
   Heart,
   Home,
   Baby,
   HeartHandshake,
} from 'lucide-react';
import { TopicCardProps } from './TopicCard';

const FamilyRelationships: React.FC<TopicCardProps> = ({ index }: TopicCardProps) => {
   return (
      <div data-slot="topic-banner" className={`relative overflow-hidden bg-gradient-to-br from-rose-200 via-pink-200 to-fuchsia-200`}>
         <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
         >
            <Heart className="w-24 h-24 text-rose-400 fill-rose-400 opacity-30" />
         </motion.div>
         <div className="flex items-center justify-center h-full gap-6">
            <motion.div
               animate={{ y: [0, -5, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
               className="flex flex-col items-center gap-2"
            >
               <div className="bg-gradient-to-br from-rose-400 to-rose-500 rounded-full p-3 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
               </div>
               <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            </motion.div>
            <motion.div
               animate={{ y: [0, -5, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
               className="flex flex-col items-center gap-2"
            >
               <div className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-full p-3 shadow-lg">
                  <Home className="w-8 h-8 text-white" />
               </div>
               <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
            </motion.div>
            <motion.div
               animate={{ y: [0, -5, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
               className="flex flex-col items-center gap-2"
            >
               <div className="bg-gradient-to-br from-fuchsia-400 to-fuchsia-500 rounded-full p-3 shadow-lg">
                  <Baby className="w-8 h-8 text-white" />
               </div>
               <Heart className="w-5 h-5 text-fuchsia-500 fill-fuchsia-500" />
            </motion.div>
         </div>
         <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, type: 'spring', stiffness: 200 }}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg"
         >
            <HeartHandshake className="w-5 h-5 text-rose-600" />
         </motion.div>
      </div>
   );
}
export default FamilyRelationships;