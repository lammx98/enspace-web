import { motion } from 'motion/react';
import { Cloud, Sun, CloudRain, Snowflake } from 'lucide-react';
import { TopicCardProps } from './TopicCard';

const Weather: React.FC<TopicCardProps> = ({ index }: TopicCardProps) => {
   return (
      <div data-slot="topic-banner" className={`relative overflow-hidden bg-gradient-to-br from-blue-200 via-sky-200 to-cyan-200`}>
         <motion.div animate={{ x: [-20, 220], scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} className="absolute top-4">
            <Cloud className="w-16 h-16 text-white fill-white opacity-70" />
         </motion.div>
         <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-8 right-8"
         >
            <Sun className="w-14 h-14 text-yellow-400 fill-yellow-400" />
         </motion.div>
         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
               <motion.div
                  key={i}
                  animate={{ y: [0, 40], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeIn', delay: i * 0.2 }}
                  className="w-1 h-4 bg-blue-400 rounded-full"
               />
            ))}
         </div>
         <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="absolute bottom-4 left-4">
            <Snowflake className="w-8 h-8 text-cyan-300" />
         </motion.div>
         <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, type: 'spring', stiffness: 200 }}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg"
         >
            <CloudRain className="w-5 h-5 text-sky-600" />
         </motion.div>
      </div>
   );
}
export default Weather;