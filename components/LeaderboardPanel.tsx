import { Trophy, Medal, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";

export function LeaderboardPanel() {
  const users = [
    { rank: 1, name: "Sarah Chen", xp: 2847, avatar: "👩", change: "up" },
    { rank: 2, name: "Mike Ross", xp: 2654, avatar: "👨", change: "same" },
    { rank: 3, name: "Emma Stone", xp: 2431, avatar: "👧", change: "up" },
    { rank: 4, name: "You", xp: 2198, avatar: "😊", change: "up", isCurrentUser: true },
    { rank: 5, name: "John Doe", xp: 2087, avatar: "🧑", change: "down" },
    { rank: 6, name: "Lisa Park", xp: 1965, avatar: "👩", change: "up" },
    { rank: 7, name: "Tom Brady", xp: 1843, avatar: "👨", change: "same" },
  ];

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-600" />;
    return <span className="text-gray-500">#{rank}</span>;
  };

  return (
    <Card className="bg-white rounded-3xl border-4 border-gray-200 shadow-xl overflow-hidden sticky top-24">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-6 h-6" />
          <h2 className="text-white">Leaderboard</h2>
        </div>
        <p className="text-sm text-purple-100">Weekly Competition</p>
      </div>

      <div className="p-4">
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.rank}
              className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
                user.isCurrentUser
                  ? "bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 shadow-md"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="w-8 flex items-center justify-center">
                {getMedalIcon(user.rank)}
              </div>

              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center border-2 border-white shadow">
                <span className="text-xl">{user.avatar}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className={`text-sm truncate ${user.isCurrentUser ? "text-purple-900" : "text-gray-900"}`}>
                  {user.name}
                </div>
                <div className="text-xs text-gray-500">{user.xp.toLocaleString()} XP</div>
              </div>

              <div>
                {user.change === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                {user.change === "down" && <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-200">
          <div className="text-xs text-gray-600 mb-1">Time left</div>
          <div className="text-sm text-gray-900">3 days 14 hours</div>
        </div>
      </div>
    </Card>
  );
}
