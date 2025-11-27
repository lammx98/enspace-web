import { motion } from 'motion/react';
import { Smartphone, Wifi, Cpu, Zap, Monitor } from 'lucide-react';
import { TopicCardProps } from './TopicCard';

const Technology: React.FC<TopicCardProps> = ({ index }: TopicCardProps) => {
   return (
      <div className={`relative h-[180px] overflow-hidden bg-gradient-to-br from-cyan-200 via-teal-200 to-emerald-200`}>
         <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
               <motion.div
                  key={i}
                  animate={{ pathLength: [0, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
                  className="absolute bg-cyan-400 opacity-30"
                  style={{
                     width: '2px',
                     height: '100%',
                     left: `${20 + i * 15}%`,
                  }}
               />
            ))}
         </div>
         <div className="flex items-center justify-center h-full gap-4">
            <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
               <Cpu className="w-16 h-16 text-cyan-600" />
            </motion.div>
         </div>
         <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-4 left-4">
            <Smartphone className="w-8 h-8 text-teal-600" />
         </motion.div>
         <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute bottom-4 right-4"
         >
            <Monitor className="w-8 h-8 text-cyan-600" />
         </motion.div>
         <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-8 right-8"
         >
            <Wifi className="w-8 h-8 text-teal-500" />
         </motion.div>
         <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, type: 'spring', stiffness: 200 }}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg"
         >
            <Zap className="w-5 h-5 text-cyan-600" />
         </motion.div>
      </div>
   );
}
export default Technology;