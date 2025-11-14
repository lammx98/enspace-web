// Extended types for the application

export interface UserStats {
  streak: number;
  dailyXp: number;
  totalXp: number;
  level: number;
  rank: number;
  dailyGoal: number;
  completedToday: number;
  totalWordsLearned: number;
  totalLessonsCompleted: number;
}

export interface TopicProgress {
  topicId: number;
  topicName: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
}

export interface LessonProgress {
  lessonId: number;
  lessonName: string;
  wordsLearned: number;
  totalWords: number;
  lastStudied?: Date;
  completed: boolean;
}

export interface WordProgress {
  wordId: number;
  word: string;
  translation: string;
  timesReviewed: number;
  lastReview?: Date;
  nextReview?: Date;
  mastery: number; // 0-100
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  xpEarned: number;
  timeSpent: number;
  answers: {
    questionId: number;
    correct: boolean;
    selectedAnswer: number;
    correctAnswer: number;
  }[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  target?: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  avatar?: string;
  xp: number;
  level: number;
  streak: number;
}
