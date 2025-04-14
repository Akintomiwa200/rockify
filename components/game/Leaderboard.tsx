import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext/page';

interface LeaderboardPlayer {
  username: string;
  avatar: string;
  score: number;
  rank: number;
}

export default function Leaderboard() {
  const [players, setPlayers] = useState<LeaderboardPlayer[]>([]);
  const { user } = useUser();

  useEffect(() => {
    // In a real app, this would fetch from your API
    const mockPlayers: LeaderboardPlayer[] = [
      { username: 'Champion', avatar: '🏆', score: 42, rank: 1 },
      { username: 'ProPlayer', avatar: '🎮', score: 38, rank: 2 },
      { username: 'Rookie', avatar: '👶', score: 25, rank: 3 },
      ...(user ? [{ username: user.username, avatar: '👤', score: user.score || 0, rank: 4 }] : []),
    ].sort((a, b) => b.score - a.score)
     .map((p, i) => ({ ...p, rank: i + 1 }));

    setPlayers(mockPlayers);
  }, [user]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Leaderboard</h2>
      <div className="space-y-2">
        {players.map((player) => (
          <div 
            key={player.username}
            className={`flex items-center p-3 rounded-lg ${player.username === user?.username ? 'bg-blue-100' : 'bg-gray-100'}`}
          >
            <div className="text-2xl mr-3">{player.avatar}</div>
            <div className="flex-1">
              <div className="font-medium">{player.username}</div>
              <div className="text-sm text-gray-500">Score: {player.score}</div>
            </div>
            <div className="font-bold text-gray-700">#{player.rank}</div>
          </div>
        ))}
      </div>
    </div>
  );
}