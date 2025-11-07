import { Home, BookOpen, Trophy, Settings, Users, Sparkles } from "lucide-react";

export function Sidebar() {
  const menuItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: BookOpen, label: "Lessons", active: false },
    { icon: Trophy, label: "Achievements", active: false },
    { icon: Users, label: "Community", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="font-bold text-gray-900">EngLingo</div>
          <div className="text-xs text-gray-500">Learn & Vibe</div>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              item.active
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-200"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="absolute bottom-6 left-6 right-6 p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl text-white">
        <div className="text-xs mb-1">Upgrade to Pro</div>
        <div className="text-xs opacity-90 mb-3">Unlock all features!</div>
        <button className="w-full bg-white text-purple-600 py-2 rounded-lg text-sm hover:shadow-lg transition-shadow">
          Get Pro ✨
        </button>
      </div>
    </aside>
  );
}
