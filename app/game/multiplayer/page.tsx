"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MultiplayerPage() {
  const [roomCode, setRoomCode] = useState('');
  const router = useRouter();

  const createRoom = () => {
    const code = Math.random().toString(36).substring(2, 6).toUpperCase();
    router.push(`/game/multiplayer/${code}`);
  };

  const joinRoom = () => {
    if (roomCode.trim()) {
      router.push(`/game/multiplayer/${roomCode.trim()}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <button 
          onClick={() => router.push('/game')}
          className="text-gray-600 hover:text-gray-800 mb-6"
        >
          ← Back
        </button>
        
        <h1 className="text-2xl font-bold mb-6 text-center">Multiplayer</h1>
        
        <div className="space-y-6">
          <button
            onClick={createRoom}
            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create New Room
          </button>
          
          <div className="space-y-2">
            <p className="text-center text-gray-600">- OR -</p>
            
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder="Enter room code"
              className="w-full p-3 border rounded-lg"
            />
            
            <button
              onClick={joinRoom}
              className="w-full py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Join Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}