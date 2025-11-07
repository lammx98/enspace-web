import { Card } from "./ui/card";
import { Trophy, Lock } from "lucide-react";

export function Achievements() {
  const achievements = [
    {
      id: 1,
      title: "Week Warrior",
      description: "7 day streak",
      icon: "🔥",
      unlocked: true,
      color: "from-orange-500 to-red-500",
    },
    {
      id: 2,
      title: "Word Wizard",
      description: "1000+ words",
      icon: "🧙",
      unlocked: true,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "Early Bird",
      description: "Study before 8am",
      icon: "🌅",
      unlocked: true,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 4,
      title: "Perfect Score",
      description: "100% on quiz",
      icon: "🎯",
      unlocked: false,
      color: "from-green-500 to-teal-500",
    },
  ];

  return (
    <Card className="p-6 bg-white border-0 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <h3 className="text-gray-900">Achievements</h3>
      </div>

      <div className="space-y-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`flex items-center gap-3 p-3 rounded-lg ${
              achievement.unlocked
                ? "bg-gradient-to-r from-gray-50 to-white border border-gray-200"
                : "bg-gray-50 opacity-50"
            }`}
          >
            <div
              className={`w-10 h-10 bg-gradient-to-br ${achievement.color} rounded-lg flex items-center justify-center text-xl ${
                !achievement.unlocked && "grayscale"
              }`}
            >
              {achievement.unlocked ? achievement.icon : <Lock className="w-5 h-5 text-gray-400" />}
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-900">{achievement.title}</div>
              <div className="text-xs text-gray-500">{achievement.description}</div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-sm text-purple-600 hover:text-purple-700 py-2">
        View All Achievements →
      </button>
    </Card>
  );
}
