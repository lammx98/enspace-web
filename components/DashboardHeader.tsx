import { Bell, Search, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export function DashboardHeader() {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <button className="md:hidden p-2 hover:bg-white/50 rounded-lg">
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="hidden md:block">
          <h1 className="text-gray-900 mb-1">Hey Alex! 👋</h1>
          <p className="text-gray-600 text-sm">Ready to level up your English?</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search lessons..."
              className="pl-10 pr-4 py-2 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
            />
          </div>

          <button className="relative p-2 hover:bg-white/50 rounded-lg">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
          </button>

          <Avatar>
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
            <AvatarFallback>AX</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Badge className="bg-gradient-to-r from-orange-400 to-pink-500 text-white border-0">
          🔥 7 Day Streak
        </Badge>
        <Badge className="bg-gradient-to-r from-purple-400 to-blue-500 text-white border-0">
          ⚡ Level 12
        </Badge>
        <Badge className="bg-gradient-to-r from-green-400 to-teal-500 text-white border-0">
          🎯 Daily Goal: 3/5
        </Badge>
      </div>
    </header>
  );
}
