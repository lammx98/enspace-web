import { CheckCircle, Lock, Star, Play } from "lucide-react";
import { motion } from "motion/react";

interface LessonNodeProps {
  title: string;
  subtitle: string;
  type: "lesson" | "practice" | "story" | "test";
  status: "completed" | "current" | "locked";
  xp: number;
  position: "left" | "right" | "center";
  icon: string;
  delay: number;
  onClick?: () => void;
}

export function LessonNode({
  title,
  subtitle,
  type,
  status,
  xp,
  position,
  icon,
  delay,
  onClick,
}: LessonNodeProps) {
  const getColor = () => {
    if (status === "locked") return "bg-gray-300 border-gray-400";
    
    switch (type) {
      case "lesson":
        return "bg-gradient-to-br from-blue-400 to-blue-600 border-blue-700";
      case "practice":
        return "bg-gradient-to-br from-purple-400 to-purple-600 border-purple-700";
      case "story":
        return "bg-gradient-to-br from-pink-400 to-pink-600 border-pink-700";
      case "test":
        return "bg-gradient-to-br from-yellow-400 to-orange-500 border-orange-600";
      default:
        return "bg-blue-500 border-blue-700";
    }
  };

  const getSize = () => {
    if (type === "test") return "w-28 h-28";
    if (type === "practice" || type === "story") return "w-20 h-20";
    return "w-24 h-24";
  };

  const getPositionClass = () => {
    if (position === "center") return "justify-center";
    if (position === "left") return "justify-start ml-8 md:ml-16";
    return "justify-end mr-8 md:mr-16";
  };

  const isClickable = status !== "locked";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`flex ${getPositionClass()}`}
    >
      <div className="relative flex flex-col items-center">
        {/* Lesson Circle */}
        <motion.button
          whileHover={isClickable ? { scale: 1.1 } : {}}
          whileTap={isClickable ? { scale: 0.95 } : {}}
          disabled={!isClickable}
          onClick={onClick}
          className={`${getSize()} ${getColor()} rounded-full flex items-center justify-center shadow-2xl border-b-8 transition-all relative overflow-hidden ${
            isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-60"
          } ${status === "current" ? "ring-4 ring-white ring-offset-4 ring-offset-purple-400 animate-pulse" : ""}`}
        >
          {/* Icon or Status */}
          {status === "completed" && (
            <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white fill-white" />
            </div>
          )}
          
          {status === "locked" && (
            <Lock className="w-8 h-8 text-gray-500" />
          )}

          {status !== "locked" && (
            <span className={`${type === "test" ? "text-5xl" : "text-4xl"}`}>
              {icon}
            </span>
          )}

          {/* Play indicator for current */}
          {status === "current" && (
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center border-4 border-blue-600">
              <Play className="w-4 h-4 text-blue-600 fill-blue-600" />
            </div>
          )}
        </motion.button>

        {/* Label */}
        <div className="mt-3 text-center max-w-[150px]">
          <div className="text-white drop-shadow-lg">{title}</div>
          <div className="text-sm text-white/90 drop-shadow">{subtitle}</div>
          
          {/* XP Badge */}
          {status !== "locked" && (
            <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full shadow-lg">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="text-xs text-gray-700">+{xp} XP</span>
            </div>
          )}
        </div>

        {/* Stars for completed */}
        {status === "completed" && (
          <div className="flex gap-1 mt-2">
            {[1, 2, 3].map((i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
