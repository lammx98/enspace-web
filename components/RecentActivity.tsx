import { Card } from "./ui/card";
import { Clock } from "lucide-react";

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      action: "Completed lesson",
      title: "Business English Basics",
      time: "2 hours ago",
      icon: "📖",
    },
    {
      id: 2,
      action: "Earned achievement",
      title: "Week Warrior",
      time: "5 hours ago",
      icon: "🏆",
    },
    {
      id: 3,
      action: "New high score",
      title: "Grammar Quiz - 95%",
      time: "Yesterday",
      icon: "⭐",
    },
    {
      id: 4,
      action: "Practice session",
      title: "Pronunciation Practice",
      time: "2 days ago",
      icon: "🎤",
    },
  ];

  return (
    <Card className="p-6 bg-white border-0 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-gray-600" />
        <h3 className="text-gray-900">Recent Activity</h3>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id}>
            <div className="flex gap-3">
              <div className="text-2xl">{activity.icon}</div>
              <div className="flex-1">
                <div className="text-sm text-gray-600 mb-1">{activity.action}</div>
                <div className="text-sm text-gray-900">{activity.title}</div>
                <div className="text-xs text-gray-400 mt-1">{activity.time}</div>
              </div>
            </div>
            {index < activities.length - 1 && (
              <div className="ml-6 mt-4 border-l-2 border-gray-100 h-4" />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
