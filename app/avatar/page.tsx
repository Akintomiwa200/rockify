"use client"


import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { useUser } from '@/context/UserContext/page';

const avatars = [
  { id: 1, emoji: '👨', name: 'Man' },
  { id: 2, emoji: '👩', name: 'Woman' },
  { id: 3, emoji: '🧙', name: 'Wizard' },
  { id: 4, emoji: '🦸', name: 'Hero' },
  { id: 5, emoji: '🧟', name: 'Zombie' },
  { id: 6, emoji: '👽', name: 'Alien' },
];

export default function AvatarPage() {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const router = useRouter();
  const { setAvatar } = useUser();

  const handleSubmit = () => {
    if (selectedAvatar) {
      setAvatar(selectedAvatar);
      router.push('/game');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Select Your Avatar</h1>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {avatars.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => setSelectedAvatar(avatar.id)}
              className={`p-4 text-4xl rounded-full transition-all ${selectedAvatar === avatar.id ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {avatar.emoji}
            </button>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!selectedAvatar}
          className={`w-full py-3 text-white font-semibold rounded-lg transition-colors ${selectedAvatar ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Continue to Game
        </button>
      </div>
    </div>
  );
}