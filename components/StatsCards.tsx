import { TrendingUp, Clock, Zap, Target } from "lucide-react";
import { Card } from "./ui/card";

export function StatsCards() {
  const stats = [
    {
      label: "Words Learned",
      value: "1,247",
      change: "+12%",
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      label: "Study Time",
      value: "24h 30m",
      change: "+8%",
      icon: Clock,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      label: "Current Streak",
      value: "7 days",
      change: "🔥",
      icon: Zap,
      gradient: "from-orange-500 to-red-500",
    },
    {
      label: "Accuracy",
      value: "94%",
      change: "+3%",
      icon: Target,
      gradient: "from-green-500 to-teal-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-lg">
              {stat.change}
            </span>
          </div>
          <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
          <div className="text-gray-900">{stat.value}</div>
        </Card>
      ))}
    </div>
  );
}
