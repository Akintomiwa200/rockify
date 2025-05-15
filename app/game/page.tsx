
"use client"

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function GameModePage() {
  const router = useRouter();

  const handleMultiplayerClick = () => {
    router.push('/game/multiplayer/matching');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      <motion.div 
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-8">Select Game Mode</h1>
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/game/computer')}
            className="w-full py-4 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-between"
          >
            <span>Play vs Computer</span>
            <span>🤖</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMultiplayerClick}
            className="w-full py-4 px-6 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-between"
          >
            <span>Play vs Human</span>
            <span>👥</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
