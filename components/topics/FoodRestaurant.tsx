import { motion } from 'motion/react';
import {
   Coffee,
   Star,
   UtensilsCrossed,
   Wine,
   ChefHat,
} from 'lucide-react';
import { TopicCardProps } from './TopicCard';

const FoodRestaurant: React.FC<TopicCardProps> = ({ index }: TopicCardProps) => {
   return (
      <div data-slot="topic-banner" className={`relative overflow-hidden bg-gradient-to-br from-orange-200 via-amber-200 to-yellow-200`}>
         <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute top-3 left-3">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 opacity-60" />
         </motion.div>
         <div className="flex items-center justify-center h-full">
            <div className="relative">
               <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-32 h-32 bg-white rounded-full shadow-2xl border-4 border-orange-300"
               ></motion.div>
               <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
               >
                  <UtensilsCrossed className="w-16 h-16 text-orange-500" />
               </motion.div>
               <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-2 -right-2">
                  <ChefHat className="w-10 h-10 text-amber-600" />
               </motion.div>
               <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-2 -left-2"
               >
                  <Wine className="w-8 h-8 text-red-500" />
               </motion.div>
            </div>
         </div>
         <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, type: 'spring', stiffness: 200 }}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg"
         >
            <Coffee className="w-5 h-5 text-orange-600" />
         </motion.div>
      </div>
   );
}
export default FoodRestaurant;