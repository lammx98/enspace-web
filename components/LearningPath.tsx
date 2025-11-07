import { LessonNode } from "./LessonNode";
import { Lock } from "lucide-react";
import { TopicHeader } from "./TopicHeader";

interface LearningPathProps {
  topicId: string;
  onStartLesson?: () => void;
  onBack?: () => void;
}

interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  type: "lesson" | "practice" | "story" | "test";
  status: "completed" | "current" | "locked";
  xp: number;
  position: "left" | "right" | "center";
  icon: string;
}

export function LearningPath({ topicId, onStartLesson, onBack }: LearningPathProps) {
  // Topic data
  const topicData: { [key: string]: { name: string; emoji: string; lessons: Lesson[] } } = {
    basics: {
      name: "Basics",
      emoji: "📚",
      lessons: [
        {
          id: 1,
          title: "Unit 1",
          subtitle: "Basic Greetings",
          type: "lesson",
          status: "completed",
          xp: 50,
          position: "left",
          icon: "👋",
        },
        {
          id: 2,
          title: "Unit 2",
          subtitle: "Introduce Yourself",
          type: "lesson",
          status: "completed",
          xp: 50,
          position: "right",
          icon: "🙋",
        },
        {
          id: 3,
          title: "Practice",
          subtitle: "Time to practice!",
          type: "practice",
          status: "current",
          xp: 30,
          position: "center",
          icon: "💪",
        },
        {
          id: 4,
          title: "Unit 3",
          subtitle: "Numbers & Counting",
          type: "lesson",
          status: "locked",
          xp: 50,
          position: "left",
          icon: "🔢",
        },
        {
          id: 5,
          title: "Unit 4",
          subtitle: "Colors & Shapes",
          type: "lesson",
          status: "locked",
          xp: 50,
          position: "right",
          icon: "🎨",
        },
      ],
    },
    conversation: {
      name: "Conversation",
      emoji: "💬",
      lessons: [
        {
          id: 1,
          title: "Unit 1",
          subtitle: "Small Talk",
          type: "lesson",
          status: "completed",
          xp: 50,
          position: "left",
          icon: "☕",
        },
        {
          id: 2,
          title: "Unit 2",
          subtitle: "Making Friends",
          type: "lesson",
          status: "current",
          xp: 50,
          position: "right",
          icon: "🤝",
        },
        {
          id: 3,
          title: "Story",
          subtitle: "Coffee Shop Chat",
          type: "story",
          status: "locked",
          xp: 40,
          position: "center",
          icon: "📖",
        },
        {
          id: 4,
          title: "Unit 3",
          subtitle: "Phone Calls",
          type: "lesson",
          status: "locked",
          xp: 50,
          position: "left",
          icon: "📱",
        },
      ],
    },
    vocabulary: {
      name: "Vocabulary",
      emoji: "💡",
      lessons: [
        {
          id: 1,
          title: "Unit 1",
          subtitle: "Common Words",
          type: "lesson",
          status: "completed",
          xp: 50,
          position: "left",
          icon: "📝",
        },
        {
          id: 2,
          title: "Practice",
          subtitle: "Word Match",
          type: "practice",
          status: "completed",
          xp: 30,
          position: "center",
          icon: "🎯",
        },
        {
          id: 3,
          title: "Unit 2",
          subtitle: "Synonyms",
          type: "lesson",
          status: "current",
          xp: 50,
          position: "right",
          icon: "🔄",
        },
        {
          id: 4,
          title: "Unit 3",
          subtitle: "Antonyms",
          type: "lesson",
          status: "locked",
          xp: 50,
          position: "left",
          icon: "↔️",
        },
      ],
    },
    grammar: {
      name: "Grammar",
      emoji: "✍️",
      lessons: [
        {
          id: 1,
          title: "Unit 1",
          subtitle: "Present Tense",
          type: "lesson",
          status: "completed",
          xp: 50,
          position: "left",
          icon: "⏰",
        },
        {
          id: 2,
          title: "Unit 2",
          subtitle: "Past Tense",
          type: "lesson",
          status: "current",
          xp: 50,
          position: "right",
          icon: "📅",
        },
        {
          id: 3,
          title: "Practice",
          subtitle: "Tense Mix",
          type: "practice",
          status: "locked",
          xp: 30,
          position: "center",
          icon: "🔀",
        },
        {
          id: 4,
          title: "Unit 3",
          subtitle: "Future Tense",
          type: "lesson",
          status: "locked",
          xp: 50,
          position: "left",
          icon: "🔮",
        },
        {
          id: 5,
          title: "Unit Test",
          subtitle: "Grammar Master",
          type: "test",
          status: "locked",
          xp: 100,
          position: "center",
          icon: "⭐",
        },
      ],
    },
    travel: {
      name: "Travel",
      emoji: "✈️",
      lessons: [
        {
          id: 1,
          title: "Unit 1",
          subtitle: "At the Airport",
          type: "lesson",
          status: "completed",
          xp: 50,
          position: "left",
          icon: "🛫",
        },
        {
          id: 2,
          title: "Unit 2",
          subtitle: "Hotel Check-in",
          type: "lesson",
          status: "current",
          xp: 50,
          position: "right",
          icon: "🏨",
        },
        {
          id: 3,
          title: "Story",
          subtitle: "Lost Luggage",
          type: "story",
          status: "locked",
          xp: 40,
          position: "center",
          icon: "🧳",
        },
        {
          id: 4,
          title: "Unit 3",
          subtitle: "Asking Directions",
          type: "lesson",
          status: "locked",
          xp: 50,
          position: "left",
          icon: "🗺️",
        },
      ],
    },
    business: {
      name: "Business",
      emoji: "💼",
      lessons: [
        {
          id: 1,
          title: "Unit 1",
          subtitle: "Email Writing",
          type: "lesson",
          status: "current",
          xp: 50,
          position: "left",
          icon: "📧",
        },
        {
          id: 2,
          title: "Unit 2",
          subtitle: "Meetings",
          type: "lesson",
          status: "locked",
          xp: 50,
          position: "right",
          icon: "👔",
        },
        {
          id: 3,
          title: "Practice",
          subtitle: "Presentations",
          type: "practice",
          status: "locked",
          xp: 30,
          position: "center",
          icon: "📊",
        },
      ],
    },
    culture: {
      name: "Culture",
      emoji: "🎭",
      lessons: [
        {
          id: 1,
          title: "Unit 1",
          subtitle: "Holidays",
          type: "lesson",
          status: "current",
          xp: 50,
          position: "left",
          icon: "🎉",
        },
        {
          id: 2,
          title: "Unit 2",
          subtitle: "Food Culture",
          type: "lesson",
          status: "locked",
          xp: 50,
          position: "right",
          icon: "🍔",
        },
        {
          id: 3,
          title: "Story",
          subtitle: "Thanksgiving",
          type: "story",
          status: "locked",
          xp: 40,
          position: "center",
          icon: "🦃",
        },
      ],
    },
    idioms: {
      name: "Idioms & Slang",
      emoji: "🤙",
      lessons: [
        {
          id: 1,
          title: "Unit 1",
          subtitle: "Common Idioms",
          type: "lesson",
          status: "current",
          xp: 50,
          position: "left",
          icon: "💭",
        },
        {
          id: 2,
          title: "Practice",
          subtitle: "Guess the Meaning",
          type: "practice",
          status: "locked",
          xp: 30,
          position: "center",
          icon: "🤔",
        },
        {
          id: 3,
          title: "Unit 2",
          subtitle: "Modern Slang",
          type: "lesson",
          status: "locked",
          xp: 50,
          position: "right",
          icon: "😎",
        },
      ],
    },
  };

  const currentTopic = topicData[topicId] || topicData.basics;
  const lessons = currentTopic.lessons;

  return (
    <div className="relative pb-20">
      {/* Topic Header */}
      {onBack && (
        <TopicHeader
          topicName={currentTopic.name}
          topicEmoji={currentTopic.emoji}
          onBack={onBack}
        />
      )}

      {/* Learning Path */}
      <div className="relative max-w-2xl mx-auto px-4">
        {/* Path Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 transform -translate-x-1/2 -z-10" />

        <div className="space-y-8">
          {lessons.map((lesson, index) => (
            <LessonNode
              key={lesson.id}
              {...lesson}
              delay={index * 0.1}
              onClick={lesson.status !== "locked" ? onStartLesson : undefined}
            />
          ))}
        </div>

        {/* Bottom message */}
        <div className="text-center mt-16 mb-8">
          <div className="inline-block bg-white rounded-3xl px-8 py-4 shadow-xl border-4 border-gray-200">
            <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Complete more lessons to unlock!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
