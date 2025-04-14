'use client'; // ✅ Required for App Router client-side components

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Correct for App Router client-side routing
import { useUser } from '@/context/UserContext/page';

export default function UsernamePage() {
  const [username, setUsername] = useState('');
  const router = useRouter();
  const { setUsername: setGlobalUsername } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setGlobalUsername(username);
      router.push('/avatar'); // ✅ Navigates to /avatar
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Choose Your Username</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
