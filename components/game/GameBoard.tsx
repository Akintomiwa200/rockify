import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSocket } from '@/context/SocketContext.tsx/page';
import { useUser } from '@/context/UserContext/page';
import Timer from './Timer';
import Leaderboard from './Leaderboard';
import PlayerDashboard from './PlayerDashboard';
import ChoiceSelection from './ChoiceSelection';

type GameChoice = 'rock' | 'paper' | 'scissors' | null;
type GameResult = 'win' | 'lose' | 'draw' | null;

export default function GameBoard({ mode }: { mode: 'computer' | 'multiplayer' }) {
  const [playerChoice, setPlayerChoice] = useState<GameChoice>(null);
  const [opponentChoice, setOpponentChoice] = useState<GameChoice>(null);
  const [result, setResult] = useState<GameResult>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted] = useState(false);
  const { user } = useUser();
  const socket = useSocket();
  const router = useRouter();

  // Game logic to determine winner
  const determineWinner = (player: GameChoice, opponent: GameChoice): GameResult => {
    if (!player || !opponent) return null;
    if (player === opponent) return 'draw';
    
    const winningConditions = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper'
    };

    return winningConditions[player] === opponent ? 'win' : 'lose';
  };

  // Handle player choice selection
  const handleChoice = (choice: GameChoice) => {
    if (mode === 'computer') {
      setPlayerChoice(choice);
      const choices: GameChoice[] = ['rock', 'paper', 'scissors'];
      const computerChoice = choices[Math.floor(Math.random() * choices.length)];
      setOpponentChoice(computerChoice);
      
      const gameResult = determineWinner(choice, computerChoice);
      setResult(gameResult);
      
      if (gameResult === 'win') {
        setScore(prev => prev + 1);
      }
    } else {
      // Multiplayer logic using socket.io
      socket?.emit('player-choice', { choice, room: 'default' });
      setPlayerChoice(choice);
    }
  };

  // Timer logic
  useEffect(() => {
    if (!gameStarted) return;
    
    const timer = timeLeft > 0 && setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    if (timeLeft === 0) {
      // Handle time out
      if (mode === 'computer' && !playerChoice) {
        // Auto-select if player didn't choose
        handleChoice('rock');
      }
      // Reset timer for next round
      setTimeout(() => {
        setTimeLeft(30);
        setPlayerChoice(null);
        setOpponentChoice(null);
        setResult(null);
      }, 2000);
    }

    return () => clearInterval(timer as NodeJS.Timeout);
  }, [timeLeft, gameStarted]);

  // Multiplayer socket listeners
  useEffect(() => {
    if (mode !== 'multiplayer' || !socket) return;

    socket.on('opponent-choice', (choice: GameChoice) => {
      setOpponentChoice(choice);
      
      if (playerChoice) {
        const gameResult = determineWinner(playerChoice, choice);
        setResult(gameResult);
        
        if (gameResult === 'win') {
          setScore(prev => prev + 1);
        }
      }
    });

    socket.on('game-reset', () => {
      setPlayerChoice(null);
      setOpponentChoice(null);
      setResult(null);
      setTimeLeft(30);
    });

    return () => {
      socket.off('opponent-choice');
      socket.off('game-reset');
    };
  }, [socket, playerChoice, mode]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <button 
            onClick={() => router.push('/game')}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Back
          </button>
          <h1 className="text-2xl font-bold">
            {mode === 'computer' ? 'vs Computer' : 'Multiplayer'}
          </h1>
          <button 
            onClick={() => router.push('/leaderboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Leaderboard
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <Timer timeLeft={timeLeft} />
              
              <div className="flex justify-between items-center my-8">
                <PlayerDashboard 
                  name={user?.username || 'Player'} 
                  avatar={user?.avatar || '👤'}
                  score={score}
                  choice={playerChoice}
                  isPlayer
                />
                
                {result && (
                  <div className="text-2xl font-bold">
                    {result === 'win' && '🎉 You Win!'}
                    {result === 'lose' && '😢 You Lose'}
                    {result === 'draw' && '🤝 Draw'}
                  </div>
                )}

                <PlayerDashboard 
                  name={mode === 'computer' ? 'Computer' : 'Opponent'} 
                  avatar={mode === 'computer' ? '🤖' : '👤'}
                  score={0} // Would track opponent score in multiplayer
                  choice={opponentChoice}
                />
              </div>

              <ChoiceSelection 
                onSelect={handleChoice} 
                disabled={!!playerChoice || timeLeft === 0}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
}