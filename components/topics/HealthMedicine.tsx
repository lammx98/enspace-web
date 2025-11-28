import { motion } from 'motion/react';
import { Heart, Activity, Pill, Cross, Stethoscope } from 'lucide-react';
import { TopicCardProps } from './TopicCard';

const HealthMedicine: React.FC<TopicCardProps> = ({ index }: TopicCardProps) => {
   return (
      <div data-slot="topic-banner" className={`relative overflow-hidden bg-gradient-to-br from-red-200 via-pink-200 to-rose-200`}>
         <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-red-400 rounded-full opacity-20"
         ></motion.div>
         <motion.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-red-400 rounded-full opacity-10"
         ></motion.div>
         <div className="flex items-center justify-center h-full">
            <motion.div
               animate={{ scale: [1, 1.1, 1] }}
               transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
               className="bg-white rounded-2xl p-6 shadow-2xl"
            >
               <Cross className="w-16 h-16 text-red-500" />
            </motion.div>
         </div>
         <motion.div
            animate={{ x: [-100, 200], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute top-12"
         >
            <Activity className="w-8 h-8 text-red-500" />
         </motion.div>
         <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-4 left-8">
            <Pill className="w-8 h-8 text-pink-500" />
         </motion.div>
         <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute bottom-4 right-8"
         >
            <Stethoscope className="w-8 h-8 text-red-600" />
         </motion.div>
         <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, type: 'spring', stiffness: 200 }}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg"
         >
            <Heart className="w-5 h-5 text-red-600 fill-red-600" />
         </motion.div>
      </div>
   );
}
export default HealthMedicine;