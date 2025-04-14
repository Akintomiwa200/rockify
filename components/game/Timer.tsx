import { useEffect, useState } from 'react';

interface TimerProps {
  timeLeft: number;
  className?: string;
}

export default function Timer({ timeLeft, className = '' }: TimerProps) {
  const [isLowTime, setIsLowTime] = useState(false);

  useEffect(() => {
    setIsLowTime(timeLeft <= 10);
  }, [timeLeft]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`text-center ${isLowTime ? 'animate-pulse' : ''}`}>
        <span className={`text-xs font-medium ${isLowTime ? 'text-red-500' : 'text-gray-500'}`}>
          TIME LEFT
        </span>
        <div className={`text-3xl font-bold ${isLowTime ? 'text-red-600' : 'text-gray-700'}`}>
          {timeLeft}s
        </div>
      </div>
    </div>
  );
}