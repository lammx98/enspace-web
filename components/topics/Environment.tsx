import { motion } from 'motion/react';
import { Leaf, TreePine, Recycle, Flower2, Sprout } from 'lucide-react';
import { TopicCardProps } from './TopicCard';

const Environment: React.FC<TopicCardProps> = ({ index }: TopicCardProps) => {
   return (
      <div data-slot="topic-banner" className={`relative overflow-hidden bg-gradient-to-br from-lime-200 via-green-200 to-emerald-200`}>
         <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-green-300 opacity-20"
         ></motion.div>
         <div className="flex items-end justify-center h-full pb-4">
            <motion.div animate={{ scale: [0.9, 1, 0.9] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
               <TreePine className="w-24 h-24 text-green-700" />
            </motion.div>
         </div>
         <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute top-8 left-8"
         >
            <Leaf className="w-8 h-8 text-lime-600" />
         </motion.div>
         <motion.div
            animate={{ rotate: -360, scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute top-8 right-8"
         >
            <Leaf className="w-6 h-6 text-green-600" />
         </motion.div>
         <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-4 left-4">
            <Flower2 className="w-8 h-8 text-pink-500" />
         </motion.div>
         <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} className="absolute bottom-4 right-4">
            <Recycle className="w-8 h-8 text-emerald-600" />
         </motion.div>
         <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, type: 'spring', stiffness: 200 }}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg"
         >
            <Sprout className="w-5 h-5 text-green-700" />
         </motion.div>
      </div>
   );
};
export default Environment;
