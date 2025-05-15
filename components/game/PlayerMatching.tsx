
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function PlayerMatching() {
  const [searching, setSearching] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulating player matching for demo
    const timer = setTimeout(() => {
      setSearching(false);
      router.push('/game/multiplayer/random');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="mb-8"
      >
        <div className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </motion.div>
      <h2 className="text-2xl font-semibold text-gray-800">
        {searching ? "Searching for players..." : "Player found!"}
      </h2>
    </div>
  );
}
