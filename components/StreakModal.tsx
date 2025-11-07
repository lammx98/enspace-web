import { useState } from "react";
import { X, Flame } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function StreakModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full shadow-2xl flex items-center justify-center border-4 border-white z-40 hover:shadow-orange-300"
      >
        <Flame className="w-8 h-8 text-white" />
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs border-2 border-white">
          7
        </div>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowModal(false)}
            />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50 overflow-hidden border-4 border-gray-200"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="bg-gradient-to-br from-orange-400 to-red-500 p-8 text-center text-white">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-8xl mb-4"
                >
                  🔥
                </motion.div>
                <h2 className="text-white mb-2">7 Day Streak!</h2>
                <p className="text-orange-100">You're on fire! Keep going!</p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-gray-500 mb-1">{day}</div>
                      <div
                        className={`w-full aspect-square rounded-lg flex items-center justify-center ${
                          index < 7
                            ? "bg-gradient-to-br from-orange-400 to-red-500 text-white"
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        {index < 7 ? "✓" : ""}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl">
                    <span className="text-gray-700">Current Streak</span>
                    <span className="text-orange-600">🔥 7 days</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-2xl">
                    <span className="text-gray-700">Longest Streak</span>
                    <span className="text-yellow-600">⭐ 14 days</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl">
                    <span className="text-gray-700">Total XP Earned</span>
                    <span className="text-purple-600">⚡ 8,420</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-2xl hover:shadow-lg transition-all"
                >
                  Keep Learning! 🚀
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
