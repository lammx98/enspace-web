import { motion } from 'motion/react';
import {
   MessageCircle,
   Users,
   Coffee,
   Smile,
   Heart,
   Star,
   Briefcase,
   Laptop,
   Clock,
   FileText,
   Pen,
   Plane,
   Map,
   Camera,
   Compass,
   Globe,
   ShoppingBag,
   CreditCard,
   Tag,
   Gift,
   ShoppingCart,
   UtensilsCrossed,
   Wine,
   ChefHat,
   Activity,
   Pill,
   Cross,
   Stethoscope,
   Siren,
   BookOpen,
   GraduationCap,
   Pencil,
   Apple,
   Book,
   Smartphone,
   Wifi,
   Cpu,
   Zap,
   Monitor,
   Home,
   Baby,
   HeartHandshake,
   Music,
   Palette,
   Gamepad2,
   Film,
   Dumbbell,
   Cloud,
   Sun,
   CloudRain,
   Snowflake,
   CloudDrizzle,
   Bus,
   Train,
   Car,
   Bike,
   Navigation,
   DollarSign,
   PiggyBank,
   TrendingUp,
   Wallet,
   Coins,
   Bed,
   Key,
   Building,
   DoorOpen,
   Leaf,
   TreePine,
   Recycle,
   Flower2,
   Sprout,
} from 'lucide-react';
import DailyConversation from './DailyConversation';
import WorkplaceEnglish from './WorkplaceEnglish';
import Shopping from './Shopping';
import FoodRestaurant from './FoodRestaurant';
import HealthMedicine from './HealthMedicine';
import TravelTourism from './TravelTourism';
import EducationSchool from './EducationSchool';
import Technology from './Technology';
import FamilyRelationships from './FamilyRelationships';
import HobbiesLeisure from './HobbiesLeisure';
import Weather from './Weather';
import Transportation from './Transportation';
import MoneyFinance from './MoneyFinance';
import Accommodation from './Accommodation';
import Environment from './Environment';
import { TopicDto } from '@/api/enspace-content';

export interface TopicProps {
   topic: TopicDto;
   index: number;
   onClick?: () => void;
}

export interface TopicCardProps {
   index: number;
}

export const TOPIC_CARDS: Record<number, React.ComponentType<TopicCardProps>> = {
   1: DailyConversation,
   2: WorkplaceEnglish,
   3: TravelTourism,
   4: Shopping,
   5: FoodRestaurant,
   6: HealthMedicine,
   7: EducationSchool,
   8: Technology,
   9: FamilyRelationships,
   10: HobbiesLeisure,
   11: Weather,
   12: Transportation,
   13: MoneyFinance,
   14: Accommodation,
   15: Environment,
};

export function TopicCard({ topic, index, onClick }: TopicProps) {
   const Comp: React.ComponentType<TopicCardProps> | null = TOPIC_CARDS[topic.id!];
   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         // transition={{ duration: 0.5, delay: index * 0.05 }}
         className="w-full h-[350px] bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer"
         whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
         onClick={onClick}
      >
         <Comp index={index} />

         {/* Content Section */}
         <div className="p-4 flex flex-col justify-between h-[40%]">
            <div>
               <h3 className="mb-1 font-semibold bg-gradient-to-r from-indigo-900 to-pink-900 bg-clip-text text-transparent">{topic.name}</h3>
               <p className="text-gray-600 text-sm">{topic.description}</p>
            </div>

            {/* Animated Indicator */}
            <motion.div
               animate={{ x: [0, 5, 0] }}
               transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
               className="flex items-center gap-1 text-indigo-600 text-sm"
            >
               <span>Start learning</span>
               <span>→</span>
            </motion.div>
         </div>
      </motion.div>
   );
}
