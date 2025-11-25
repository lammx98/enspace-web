import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart, Zap, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { WordsService, WordDto } from "@/api/enspace-content";
import { StudyService } from "@/api/enspace-progress";

interface Question {
  id: number;
  wordId: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizGameProps {
  lessonId?: number;
  onExit?: () => void;
  onComplete?: (score: number, total: number, xp: number) => void;
}

export function QuizGame({ lessonId, onExit, onComplete }: QuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [xp, setXp] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (lessonId) {
      fetchWords();
    } else {
      // Use default questions
      setQuestions(defaultQuestions);
      setIsLoading(false);
    }
  }, [lessonId]);

  const fetchWords = async () => {
    try {
      const response = await WordsService.getWords({
        lessonId: lessonId,
      });

      if (response.result && response.result.length > 0) {
        const quizQuestions = response.result.slice(0, 5).map((word, index) => {
          // Generate wrong answers
          const wrongAnswers = response.result!
            .filter(w => w.id !== word.id)
            .slice(0, 3)
            .map(w => w.meaningVi || '');
          
          const options = [word.meaningVi || '', ...wrongAnswers].sort(() => Math.random() - 0.5);
          const correctIndex = options.indexOf(word.meaningVi || '');

          return {
            id: index + 1,
            wordId: word.id!,
            question: `What does "${word.text}" mean?`,
            options,
            correctAnswer: correctIndex,
            explanation: `${word.text} means "${word.meaningVi}". ${word?.examples?.[0] || ''}`,
          };
        });

        setQuestions(quizQuestions);
      } else {
        setQuestions(defaultQuestions);
      }
    } catch (error) {
      console.error('Failed to fetch words:', error);
      setQuestions(defaultQuestions);
    } finally {
      setIsLoading(false);
    }
  };

  const defaultQuestions: Question[] = [
    {
      id: 1,
      wordId: 0,
      question: "What does 'serendipity' mean?",
      options: [
        "A type of dessert",
        "Happy accidents or fortunate discoveries",
        "A feeling of sadness",
        "A place in Italy",
      ],
      correctAnswer: 1,
      explanation: "Serendipity means finding something good without looking for it!",
    },
    {
      id: 2,
      wordId: 0,
      question: "Choose the correct sentence:",
      options: [
        "She don't like pizza",
        "She doesn't likes pizza",
        "She doesn't like pizza",
        "She not like pizza",
      ],
      correctAnswer: 2,
      explanation: "Use 'doesn't' with third person singular (he, she, it).",
    },
    {
      id: 3,
      wordId: 0,
      question: "What is the past tense of 'go'?",
      options: ["Goed", "Went", "Gone", "Going"],
      correctAnswer: 1,
      explanation: "'Went' is the simple past tense of 'go'.",
    },
    {
      id: 4,
      wordId: 0,
      question: "Which word means 'very hungry'?",
      options: ["Thirsty", "Starving", "Sleepy", "Angry"],
      correctAnswer: 1,
      explanation: "'Starving' is an informal way to say you're very hungry!",
    },
    {
      id: 5,
      wordId: 0,
      question: "Complete: 'I ___ coffee every morning.'",
      options: ["drinks", "drinking", "drink", "drank"],
      correctAnswer: 2,
      explanation: "Use 'drink' for simple present tense with 'I'.",
    },
  ];

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = async () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
      setXp(xp + 10);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1000);

      // Track progress via API
      if (questions[currentQuestion].wordId) {
        try {
          await StudyService.postStudyLearn({
            requestBody: {
              wordId: questions[currentQuestion].wordId,
            },
          });
        } catch (error) {
          console.error('Failed to track progress:', error);
        }
      }
    } else {
      setHearts(Math.max(0, hearts - 1));
      
      // Track incorrect answer (still track to update statistics)
      if (questions[currentQuestion].wordId) {
        try {
          await StudyService.postStudyLearn({
            requestBody: {
              wordId: questions[currentQuestion].wordId,
            },
          });
        } catch (error) {
          console.error('Failed to track progress:', error);
        }
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      // Quiz completed
      if (onComplete) {
        onComplete(score, questions.length, xp);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400">
        <div className="text-white text-2xl font-bold">Loading quiz...</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400">
        <div className="text-white text-2xl font-bold mb-4">No questions available</div>
        <Button onClick={onExit} variant="outline">Go Back</Button>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 p-4">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onExit}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="flex-1 mx-4">
            <Progress value={progress} className="h-4" />
          </div>

          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-6 h-6 ${
                  i < hearts
                    ? "text-red-500 fill-red-500"
                    : "text-gray-300 fill-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* XP Badge */}
        <div className="flex justify-end">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm">{xp} XP</span>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl shadow-2xl border-4 border-gray-200 overflow-hidden"
          >
            {/* Question */}
            <div className="p-8 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="text-sm text-purple-600 mb-2">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <h2 className="text-gray-900">{questions[currentQuestion].question}</h2>
            </div>

            {/* Options */}
            <div className="p-8 space-y-4">
              {questions[currentQuestion].options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer =
                  index === questions[currentQuestion].correctAnswer;
                const showCorrect = showFeedback && isCorrectAnswer;
                const showIncorrect = showFeedback && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={index}
                    whileHover={!showFeedback ? { scale: 1.02 } : {}}
                    whileTap={!showFeedback ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                    className={`w-full p-6 rounded-2xl border-4 text-left transition-all ${
                      showCorrect
                        ? "bg-green-100 border-green-500"
                        : showIncorrect
                        ? "bg-red-100 border-red-500"
                        : isSelected
                        ? "bg-blue-100 border-blue-500"
                        : "bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100"
                    } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 pr-4">{option}</span>
                      {showCorrect && (
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                      )}
                      {showIncorrect && (
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className={`overflow-hidden ${
                    isCorrect
                      ? "bg-green-100 border-t-4 border-green-500"
                      : "bg-red-100 border-t-4 border-red-500"
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      {isCorrect ? (
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <XCircle className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3
                          className={
                            isCorrect ? "text-green-900 mb-2" : "text-red-900 mb-2"
                          }
                        >
                          {isCorrect ? "Awesome! 🎉" : "Not quite! 😅"}
                        </h3>
                        <p
                          className={
                            isCorrect ? "text-green-700" : "text-red-700"
                          }
                        >
                          {questions[currentQuestion].explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Button */}
            <div className="p-8 bg-gray-50">
              {!showFeedback ? (
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="w-full py-6 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  size="lg"
                >
                  Check Answer
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="w-full py-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                  size="lg"
                >
                  {isLastQuestion ? (
                    "See Results 🎊"
                  ) : (
                    <>
                      Continue <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Celebration Effect */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 pointer-events-none flex items-center justify-center z-50"
          >
            <div className="text-9xl animate-bounce">🎉</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Encouragement */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-8 left-8 hidden lg:block"
      >
        <div className="bg-white rounded-3xl p-4 shadow-2xl border-4 border-gray-200 max-w-xs">
          <div className="flex gap-3">
            <div className="text-5xl">🦉</div>
            <div>
              <p className="text-sm text-gray-700">
                {showFeedback && isCorrect
                  ? "Great job! Keep it up! 🌟"
                  : showFeedback && !isCorrect
                  ? "Don't worry, you'll get the next one! 💪"
                  : "Take your time and think carefully! 🤔"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
