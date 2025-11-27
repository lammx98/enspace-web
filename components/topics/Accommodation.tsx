import { motion } from 'motion/react';
import { Star, Bed, Key, Building } from 'lucide-react';
import { TopicCardProps } from './TopicCard';
import { FC } from 'react';

const Accommodation: FC<TopicCardProps> = ({ index }: TopicCardProps) => {
   return (
      <div className={`relative h-[180px] overflow-hidden bg-gradient-to-br from-amber-200 via-yellow-200 to-orange-200`}>
         <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-amber-400 to-amber-300"></div>
         <div className="flex items-end justify-center h-full pb-8">
            <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
               <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-t-lg shadow-2xl">
                     <div className="grid grid-cols-3 gap-2 p-3">
                        {[...Array(9)].map((_, i) => (
                           <motion.div
                              key={i}
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                              className="w-6 h-6 bg-yellow-200 rounded"
                           />
                        ))}
                     </div>
                  </div>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                     <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                  </div>
               </div>
            </motion.div>
         </div>
         <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-4 left-4">
            <Key className="w-8 h-8 text-amber-600" />
         </motion.div>
         <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-4 right-4">
            <Bed className="w-8 h-8 text-orange-600" />
         </motion.div>
         <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, type: 'spring', stiffness: 200 }}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg"
         >
            <Building className="w-5 h-5 text-amber-700" />
         </motion.div>
      </div>
   );
};
export default Accommodation;
