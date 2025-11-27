import { motion } from 'motion/react';
import { Coffee, Briefcase, Laptop, Clock, FileText } from 'lucide-react';
import { TopicCardProps } from './TopicCard';

const WorkplaceEnglish: React.FC<TopicCardProps> = ({ index }: TopicCardProps) => {
   return (
      <div className={`relative h-[180px] overflow-hidden bg-gradient-to-br from-slate-200 via-gray-200 to-blue-200`}>
         <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} className="absolute top-3 left-3">
            <Clock className="w-6 h-6 text-blue-500 opacity-60" />
         </motion.div>
         <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-3xl"></div>
         <div className="flex items-end justify-center h-full gap-4 pb-8">
            <motion.div
               animate={{ y: [0, -5, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
               className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg p-3 shadow-xl"
            >
               <Briefcase className="w-10 h-10 text-white" />
            </motion.div>
            <motion.div
               animate={{ y: [0, -5, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
               className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 shadow-xl"
            >
               <Laptop className="w-10 h-10 text-white" />
            </motion.div>
            <motion.div
               animate={{ y: [0, -5, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
               className="bg-white rounded-lg p-2 shadow-xl"
            >
               <Coffee className="w-8 h-8 text-amber-600" />
            </motion.div>
         </div>
         <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, type: 'spring', stiffness: 200 }}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg"
         >
            <FileText className="w-5 h-5 text-gray-700" />
         </motion.div>
      </div>
   );
};
export default WorkplaceEnglish;
