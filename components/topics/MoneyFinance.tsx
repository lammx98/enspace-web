import { motion } from 'motion/react';
import { DollarSign, PiggyBank, TrendingUp, Wallet, Coins } from 'lucide-react';
import { TopicCardProps } from './TopicCard';

const MoneyFinance: React.FC<TopicCardProps> = ({ index }: TopicCardProps) => {
   return (
      <div data-slot="topic-banner" className={`relative overflow-hidden bg-gradient-to-br from-green-200 via-emerald-200 to-teal-200`}>
         {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
               key={i}
               animate={{ y: [180, -20], rotate: [0, 360] }}
               transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
               className="absolute"
               style={{ left: `${20 + i * 15}%` }}
            >
               <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-800" />
               </div>
            </motion.div>
         ))}
         <div className="flex items-center justify-center h-full">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
               <PiggyBank className="w-20 h-20 text-green-600" />
            </motion.div>
         </div>
         <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-4 left-4">
            <Wallet className="w-10 h-10 text-emerald-600" />
         </motion.div>
         <motion.div
            animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-8 right-8"
         >
            <TrendingUp className="w-10 h-10 text-green-600" />
         </motion.div>
         <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, type: 'spring', stiffness: 200 }}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg"
         >
            <Coins className="w-5 h-5 text-green-700" />
         </motion.div>
      </div>
   );
};
export default MoneyFinance;
