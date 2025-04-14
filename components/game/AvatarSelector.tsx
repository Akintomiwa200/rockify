import { useState } from 'react';
import { useUser } from '@/context/UserContext/page';
import { useRouter } from 'next/router';

const AVATARS = [
  { id: 1, emoji: '👨', name: 'Man' },
  { id: 2, emoji: '👩', name: 'Woman' },
  { id: 3, emoji: '🧙', name: 'Wizard' },
  { id: 4, emoji: '🦸', name: 'Hero' },
  { id: 5, emoji: '🧛', name: 'Vampire' },
  { id: 6, emoji: '🧝', name: 'Elf' },
  { id: 7, emoji: '👨‍🚀', name: 'Astronaut' },
  { id: 8, emoji: '👨‍🍳', name: 'Chef' },
  { id: 9, emoji: '🦹', name: 'Supervillain' },
  { id: 10, emoji: '🧟', name: 'Zombie' },
  { id: 11, emoji: '🧚', name: 'Fairy' },
  { id: 12, emoji: '👽', name: 'Alien' },
];

export default function AvatarSelector() {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const { setAvatar } = useUser();
  const router = useRouter();

  const handleAvatarSelect = (avatarId: number) => {
    setSelectedAvatar(avatarId);
  };

  const handleConfirm = () => {
    if (selectedAvatar) {
      setAvatar(selectedAvatar);
      router.push('/game');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Avatar</h1>
          <p className="text-gray-600">Select an avatar that represents you in the game</p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-8">
          {AVATARS.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => handleAvatarSelect(avatar.id)}
              className={`flex flex-col items-center p-4 rounded-lg transition-all duration-200 ${
                selectedAvatar === avatar.id
                  ? 'bg-blue-100 ring-2 ring-blue-500 scale-105'
                  : 'bg-gray-50 hover:bg-gray-100 hover:scale-105'
              }`}
              aria-label={`Select ${avatar.name} avatar`}
            >
              <span className="text-4xl mb-1">{avatar.emoji}</span>
              <span className="text-xs text-gray-600">{avatar.name}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleConfirm}
            disabled={!selectedAvatar}
            className={`px-8 py-3 rounded-full font-medium text-white transition-colors ${
              selectedAvatar
                ? 'bg-blue-600 hover:bg-blue-700 shadow-md'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {selectedAvatar ? 'Confirm Avatar' : 'Select an Avatar'}
          </button>
        </div>

        {selectedAvatar && (
          <div className="mt-8 text-center">
            <div className="inline-block p-6 bg-blue-50 rounded-full">
              <span className="text-6xl">
                {AVATARS.find(a => a.id === selectedAvatar)?.emoji}
              </span>
            </div>
            <p className="mt-2 text-lg font-medium text-gray-700">
              {AVATARS.find(a => a.id === selectedAvatar)?.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}