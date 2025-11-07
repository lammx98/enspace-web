import { Card } from "./ui/card";
import { Volume2, BookmarkPlus } from "lucide-react";
import { Button } from "./ui/button";

export function WordOfTheDay() {
  return (
    <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white">Word of the Day ✨</h3>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
          <BookmarkPlus className="w-5 h-5" />
        </Button>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-3xl">Serendipity</span>
          <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
        <div className="text-purple-100 text-sm mb-3">
          /ˌserənˈdɪpɪti/ • noun
        </div>
      </div>

      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
        <p className="text-sm text-white/90 mb-2">
          The occurrence of events by chance in a happy or beneficial way.
        </p>
        <p className="text-xs text-purple-100 italic">
          "A fortunate stroke of serendipity brought the two old friends together after many years."
        </p>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1 bg-white text-purple-600 hover:bg-purple-50">
          Practice
        </Button>
        <Button variant="ghost" className="flex-1 text-white border border-white/30 hover:bg-white/20">
          Examples
        </Button>
      </div>
    </Card>
  );
}
