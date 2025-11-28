import { motion } from 'motion/react';
import { Plane, Map, Camera, Compass, Globe, Cloud } from 'lucide-react';
import { TopicCardProps } from './TopicCard';

const TravelTourism: React.FC<TopicCardProps> = ({ index }: TopicCardProps) => {
   return (
      <div data-slot="topic-banner" className={`relative overflow-hidden bg-gradient-to-br from-sky-200 via-blue-200 to-cyan-200`}>
         <motion.div animate={{ x: [-20, 220], y: [20, 80] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} className="absolute">
            <Plane className="w-12 h-12 text-sky-600 rotate-45" />
         </motion.div>
         <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-10 left-10"
         >
            <Cloud className="w-16 h-16 text-white fill-white" />
         </motion.div>
         <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute bottom-10 right-10"
         >
            <Cloud className="w-12 h-12 text-white fill-white" />
         </motion.div>
         <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
               <Camera className="w-8 h-8 text-cyan-600" />
            </motion.div>
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}>
               <Map className="w-8 h-8 text-sky-700" />
            </motion.div>
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}>
               <Globe className="w-8 h-8 text-blue-600" />
            </motion.div>
         </div>
         <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, type: 'spring', stiffness: 200 }}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg"
         >
            <Compass className="w-5 h-5 text-sky-600" />
         </motion.div>
      </div>
   );
};
export default TravelTourism;
