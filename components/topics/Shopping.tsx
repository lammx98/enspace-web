import { motion } from 'motion/react';
import { Star, ShoppingBag, CreditCard, Tag, Gift, ShoppingCart } from 'lucide-react';
import { TopicCardProps } from './TopicCard';

const Shopping: React.FC<TopicCardProps> = ({ index }: TopicCardProps) => {
   return (
      <div data-slot="topic-banner" className={`relative overflow-hidden bg-gradient-to-br from-pink-200 via-rose-200 to-red-200`}>
         <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute top-2 right-8">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 opacity-60" />
         </motion.div>
         <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-4 left-4">
            <Tag className="w-6 h-6 text-red-500" />
         </motion.div>
         <div className="flex items-center justify-center h-full gap-4">
            <motion.div
               animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
               transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
               className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl p-4 shadow-xl"
            >
               <ShoppingBag className="w-12 h-12 text-white" />
            </motion.div>
            <motion.div
               animate={{ y: [0, -10, 0], rotate: [5, -5, 5] }}
               transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
               className="bg-gradient-to-br from-rose-400 to-rose-500 rounded-2xl p-4 shadow-xl"
            >
               <Gift className="w-12 h-12 text-white" />
            </motion.div>
         </div>
         <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2"
         >
            <ShoppingCart className="w-10 h-10 text-pink-600" />
         </motion.div>
         <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, type: 'spring', stiffness: 200 }}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg"
         >
            <CreditCard className="w-5 h-5 text-pink-600" />
         </motion.div>
      </div>
   );
};
export default Shopping;
