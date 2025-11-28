import { motion } from 'motion/react';
import { Bus, Train, Car, Bike, Navigation } from 'lucide-react';
import { TopicCardProps } from './TopicCard';

const Transportation: React.FC<TopicCardProps> = ({ index }: TopicCardProps) => {
   return (
      <div data-slot="topic-banner" className={`relative overflow-hidden bg-gradient-to-br from-emerald-200 via-green-200 to-lime-200`}>
         <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-400 to-gray-300"></div>
         <motion.div animate={{ x: [-50, 250] }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} className="absolute bottom-12">
            <Bus className="w-12 h-12 text-emerald-600" />
         </motion.div>
         <motion.div animate={{ x: [250, -50] }} transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: 1 }} className="absolute bottom-28">
            <Bike className="w-10 h-10 text-green-600" />
         </motion.div>
         <motion.div animate={{ x: [-50, 250] }} transition={{ duration: 7, repeat: Infinity, ease: 'linear', delay: 2 }} className="absolute bottom-12">
            <Car className="w-10 h-10 text-lime-700" />
         </motion.div>
         <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
               <Navigation className="w-10 h-10 text-emerald-600" />
            </motion.div>
         </div>
         <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, type: 'spring', stiffness: 200 }}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg"
         >
            <Train className="w-5 h-5 text-emerald-600" />
         </motion.div>
      </div>
   );
}
export default Transportation;