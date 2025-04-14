"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/auth/username');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-purple-900">
      <h1 className="text-6xl font-bold text-white mb-4">Rock Paper Scissors</h1>
      <p className="text-xl text-white opacity-80">The ultimate showdown</p>
    </div>
  );
}