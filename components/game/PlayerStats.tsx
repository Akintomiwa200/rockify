
import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext/page';

interface PlayerStats {
  totalGames: number;
  humanGames: number;
  computerGames: number;
  humanWins: number;
  computerWins: number;
  winRate: number;
}

export default function PlayerStats() {
  const [stats, setStats] = useState<PlayerStats>({
    totalGames: 0,
    humanGames: 0,
    computerGames: 0,
    humanWins: 0,
    computerWins: 0,
    winRate: 0,
  });
  const { user } = useUser();

  useEffect(() => {
    // In a real app, fetch stats from API
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/stats/${user?.username}`);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    if (user?.username) {
      fetchStats();
    }
  }, [user?.username]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Your Gaming Stats</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="stat-card bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Total Games</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalGames}</p>
        </div>
        <div className="stat-card bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Win Rate</h3>
          <p className="text-3xl font-bold text-green-600">{stats.winRate}%</p>
        </div>
        <div className="stat-card bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">VS Human</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.humanWins}/{stats.humanGames}</p>
        </div>
        <div className="stat-card bg-orange-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">VS Computer</h3>
          <p className="text-3xl font-bold text-orange-600">{stats.computerWins}/{stats.computerGames}</p>
        </div>
      </div>
    </div>
  );
}
