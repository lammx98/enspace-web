'use client';

import { motion } from 'motion/react';
import { Trophy, Star, Zap, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface LearningSummaryProps {
   score: number;
   total: number;
   onRestart?: () => void;
   onExit?: () => void;
}

export function LearningSummary({ score, total, onRestart, onExit }: LearningSummaryProps) {
   const percentage = total > 0 ? (score / total) * 100 : 0;
   const isPerfect = score === total && total > 0;
   const isGood = percentage >= 80;
   const isOkay = percentage >= 60;

   const getMessage = () => {
      if (isPerfect) return 'Hoàn hảo! Bạn thật xuất sắc! 🌟';
      if (isGood) return 'Tuyệt vời! Tiếp tục phát huy! 🎉';
      if (isOkay) return 'Khá tốt! Luyện thêm nhé! 💪';
      return 'Cố lên! Bạn sẽ tiến bộ! 🚀';
   };

   const getEmoji = () => {
      if (isPerfect) return '🏆';
      if (isGood) return '😄';
      if (isOkay) return '😊';
      return '💪';
   };

   const xpEarned = score * 10;

   return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
         <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-2xl w-full"
         >
            <div className="bg-white rounded-3xl shadow-2xl border-4 border-gray-200 overflow-hidden">
               <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-center text-white">
                  <motion.div
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                     className="text-8xl mb-4"
                  >
                     {getEmoji()}
                  </motion.div>
                  <h1 className="text-white mb-2">Hoàn thành!</h1>
                  <p className="text-purple-100">{getMessage()}</p>
               </div>

               <div className="p-8">
                  <div className="flex justify-center mb-8">
                     <div className="relative">
                        <svg className="w-48 h-48 transform -rotate-90">
                           <circle
                              cx="96"
                              cy="96"
                              r="88"
                              stroke="#e5e7eb"
                              strokeWidth="12"
                              fill="none"
                           />
                           <motion.circle
                              cx="96"
                              cy="96"
                              r="88"
                              stroke="url(#gradient-summary)"
                              strokeWidth="12"
                              fill="none"
                              strokeLinecap="round"
                              strokeDasharray={`${2 * Math.PI * 88}`}
                              initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                              animate={{
                                 strokeDashoffset:
                                    2 * Math.PI * 88 - (percentage / 100) * 2 * Math.PI * 88,
                              }}
                              transition={{ duration: 1, delay: 0.5 }}
                           />
                           <defs>
                              <linearGradient
                                 id="gradient-summary"
                                 x1="0%"
                                 y1="0%"
                                 x2="100%"
                                 y2="100%"
                              >
                                 <stop offset="0%" stopColor="#8b5cf6" />
                                 <stop offset="100%" stopColor="#ec4899" />
                              </linearGradient>
                           </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <div className="text-5xl text-gray-900 mb-1">
                              {score}/{total}
                           </div>
                           <div className="text-sm text-gray-600">Đúng</div>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                     <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 text-center border-2 border-yellow-200">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                           <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-sm text-gray-600 mb-1">Độ chính xác</div>
                        <div className="text-2xl text-gray-900">{Math.round(percentage)}%</div>
                     </div>

                     <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center border-2 border-purple-200">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                           <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-sm text-gray-600 mb-1">XP nhận được</div>
                        <div className="text-2xl text-gray-900">{xpEarned}</div>
                     </div>

                     <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 text-center border-2 border-blue-200">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                           <Star className="w-6 h-6 text-white fill-white" />
                        </div>
                        <div className="text-sm text-gray-600 mb-1">Sao</div>
                        <div className="text-2xl text-gray-900">
                           {isPerfect ? '3' : isGood ? '2' : isOkay ? '1' : '0'}
                        </div>
                     </div>
                  </div>

                  <div className="space-y-3">
                     {onRestart && (
                        <Button
                           onClick={onRestart}
                           className="w-full py-6 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white border-0"
                           size="lg"
                        >
                           <RotateCcw className="w-5 h-5 mr-2" />
                           Làm lại
                        </Button>
                     )}
                     <Button
                        onClick={onExit}
                        variant="outline"
                        className="w-full py-6 border-2"
                        size="lg"
                     >
                        <Home className="w-5 h-5 mr-2" />
                        Về trang chủ
                     </Button>
                  </div>
               </div>
            </div>
         </motion.div>
      </div>
   );
}
