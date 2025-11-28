import { motion } from 'motion/react';
import { Star, Music, Palette, Gamepad2, Film, Dumbbell } from 'lucide-react';
import { TopicCardProps } from './TopicCard';

const HobbiesLeisure: React.FC<TopicCardProps> = ({ index }: TopicCardProps) => {
   return (
      <div data-slot="topic-banner" className={`relative overflow-hidden bg-gradient-to-br from-violet-200 via-purple-200 to-fuchsia-200`}>
         <motion.div
            animate={{ y: [0, -100, 0], rotate: [0, 360] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="absolute top-full left-8"
         >
            <Music className="w-10 h-10 text-violet-500" />
         </motion.div>
         <motion.div
            animate={{ y: [0, -100, 0], rotate: [0, -360] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear', delay: 1 }}
            className="absolute top-full left-1/2 -translate-x-1/2"
         >
            <Palette className="w-10 h-10 text-purple-500" />
         </motion.div>
         <motion.div
            animate={{ y: [0, -100, 0], rotate: [0, 360] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'linear', delay: 2 }}
            className="absolute top-full right-8"
         >
            <Gamepad2 className="w-10 h-10 text-fuchsia-500" />
         </motion.div>
         <motion.div
            animate={{ y: [0, -100, 0], rotate: [0, -360] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'linear', delay: 3 }}
            className="absolute top-full left-16"
         >
            <Film className="w-10 h-10 text-pink-500" />
         </motion.div>
         <motion.div
            animate={{ y: [0, -100, 0], rotate: [0, 360] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: 'linear', delay: 1.5 }}
            className="absolute top-full right-16"
         >
            <Dumbbell className="w-10 h-10 text-violet-600" />
         </motion.div>
         <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute top-4 right-4">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 opacity-60" />
         </motion.div>
         <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, type: 'spring', stiffness: 200 }}
            className="absolute top-3 left-3 bg-white rounded-full p-2 shadow-lg"
         >
            <Music className="w-5 h-5 text-violet-600" />
         </motion.div>
      </div>
   );
}
export default HobbiesLeisure;