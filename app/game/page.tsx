"use client"



import { useRouter } from 'next/navigation';

export default function GameModePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8">Select Game Mode</h1>
        <div className="space-y-4">
          <button
            onClick={() => router.push('/game/computer')}
            className="w-full py-4 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-between"
          >
            <span>Play vs Computer</span>
            <span>🤖</span>
          </button>
          <button
            onClick={() => router.push('/game/multiplayer')}
            className="w-full py-4 px-6 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-between"
          >
            <span>Multiplayer</span>
            <span>👥</span>
          </button>
        </div>
      </div>
    </div>
  );
}