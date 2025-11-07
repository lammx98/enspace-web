import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { CheckCircle2, Circle } from "lucide-react";

export function DailyGoal() {
  const goals = [
    { id: 1, text: "Complete 3 lessons", completed: true },
    { id: 2, text: "Practice for 15 minutes", completed: true },
    { id: 3, text: "Learn 10 new words", completed: true },
    { id: 4, text: "Take a quiz", completed: false },
    { id: 5, text: "Review yesterday's words", completed: false },
  ];

  const completed = goals.filter((g) => g.completed).length;
  const total = goals.length;
  const progress = (completed / total) * 100;

  return (
    <Card className="p-6 bg-white border-0 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-gray-900 mb-1">Daily Goals</h2>
          <p className="text-sm text-gray-600">Keep the momentum going! 🚀</p>
        </div>
        <div className="text-2xl">
          {completed}/{total}
        </div>
      </div>

      <Progress value={progress} className="mb-4 h-3" />

      <div className="space-y-3">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              goal.completed ? "bg-green-50" : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            {goal.completed ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-300" />
            )}
            <span className={goal.completed ? "text-gray-600 line-through" : "text-gray-900"}>
              {goal.text}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
