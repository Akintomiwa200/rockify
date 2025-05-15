
import { NextResponse } from 'next/server';

// In a real app, this would be in a database
const playerStats = new Map();

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const username = params.username;
  
  // Mock data - in a real app, this would come from a database
  const stats = playerStats.get(username) || {
    totalGames: 0,
    humanGames: 0,
    computerGames: 0,
    humanWins: 0,
    computerWins: 0,
    winRate: 0,
  };

  return NextResponse.json(stats);
}

export async function POST(
  request: Request,
  { params }: { params: { username: string } }
) {
  const username = params.username;
  const data = await request.json();
  
  const currentStats = playerStats.get(username) || {
    totalGames: 0,
    humanGames: 0,
    computerGames: 0,
    humanWins: 0,
    computerWins: 0,
    winRate: 0,
  };

  const newStats = {
    ...currentStats,
    ...data,
    totalGames: currentStats.humanGames + currentStats.computerGames,
    winRate: Math.round(((currentStats.humanWins + currentStats.computerWins) / 
      (currentStats.humanGames + currentStats.computerGames)) * 100) || 0,
  };

  playerStats.set(username, newStats);
  return NextResponse.json(newStats);
}
