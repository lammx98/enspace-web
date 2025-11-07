import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, Star, Play } from "lucide-react";

export function LessonCards() {
  const lessons = [
    {
      id: 1,
      title: "Business English Basics",
      category: "Professional",
      duration: "15 min",
      progress: 75,
      difficulty: "Intermediate",
      color: "from-purple-500 to-pink-500",
      icon: "💼",
    },
    {
      id: 2,
      title: "Everyday Conversations",
      category: "Speaking",
      duration: "20 min",
      progress: 45,
      difficulty: "Beginner",
      color: "from-blue-500 to-cyan-500",
      icon: "💬",
    },
    {
      id: 3,
      title: "Phrasal Verbs Mastery",
      category: "Grammar",
      duration: "25 min",
      progress: 0,
      difficulty: "Advanced",
      color: "from-orange-500 to-red-500",
      icon: "📚",
    },
    {
      id: 4,
      title: "Slang & Internet Speak",
      category: "Culture",
      duration: "10 min",
      progress: 30,
      difficulty: "Intermediate",
      color: "from-green-500 to-teal-500",
      icon: "🌐",
    },
  ];

  return (
    <Card className="p-6 bg-white border-0 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-900 mb-1">Continue Learning</h2>
          <p className="text-sm text-gray-600">Pick up where you left off</p>
        </div>
        <Button variant="ghost" className="text-purple-600">View All</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="group p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${lesson.color} rounded-xl flex items-center justify-center text-2xl`}>
                {lesson.icon}
              </div>
              <Badge variant="secondary" className="text-xs">
                {lesson.difficulty}
              </Badge>
            </div>

            <h3 className="text-gray-900 mb-2">{lesson.title}</h3>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {lesson.duration}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                {lesson.category}
              </span>
            </div>

            {lesson.progress > 0 && (
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{lesson.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${lesson.color}`}
                    style={{ width: `${lesson.progress}%` }}
                  />
                </div>
              </div>
            )}

            <Button 
              className={`w-full bg-gradient-to-r ${lesson.color} hover:opacity-90 text-white border-0 group-hover:shadow-lg transition-all`}
            >
              <Play className="w-4 h-4 mr-2" />
              {lesson.progress > 0 ? "Continue" : "Start"}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
