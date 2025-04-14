import { GameChoice } from "@/app/lib/gameLogic";

interface PlayerDashboardProps {
  name: string;
  avatar: string;
  score: number;
  choice: GameChoice | null;
  isPlayer?: boolean;
}

export default function PlayerDashboard({ 
  name, 
  avatar, 
  score, 
  choice, 
  isPlayer = false 
}: PlayerDashboardProps) {
  const choiceEmoji = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️',
  };

  return (
    <div className={`text-center p-4 rounded-lg ${isPlayer ? 'bg-blue-50' : 'bg-gray-50'}`}>
      <div className="text-4xl mb-2">{avatar}</div>
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-gray-600">Score: {score}</p>
      
      {choice ? (
        <div className="mt-4">
          <div className="text-5xl">{choiceEmoji[choice]}</div>
          <p className="text-sm text-gray-500 mt-1 capitalize">{choice}</p>
        </div>
      ) : (
        <div className="mt-4 h-16 flex items-center justify-center">
          <p className="text-gray-400 text-sm">Waiting for choice...</p>
        </div>
      )}
    </div>
  );
}