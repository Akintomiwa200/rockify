'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { initializeSocket, getSocket, GameResult, GameChoice } from '../../../lib/socket';

export default function MultiplayerGameRoom() {
  const params = useParams();
  const router = useRouter();
  const roomCode = Array.isArray(params.roomCode) ? params.roomCode[0] : params.roomCode;

  const [playerName, setPlayerName] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [players, setPlayers] = useState<string[]>([]);
  const [yourChoice, setYourChoice] = useState<GameChoice | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [result, setResult] = useState<string>('');
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    const socket = initializeSocket();
    socket.connect();

    socket.on('connect', () => {
      setPlayerId(socket.id);
      setSocketConnected(true);
      console.log('Connected to socket:', socket.id);
    });

    socket.on('room-joined', (roomId: string) => {
      console.log(`Joined room: ${roomId}`);
    });

    socket.on('room-error', (error: string) => {
      alert(error);
      router.push('/game/multiplayer');
    });

    socket.on('player-connected', (newPlayerId: string) => {
      setPlayers((prev) => [...new Set([...prev, newPlayerId])]);
    });

    socket.on('player-disconnected', (disconnectedId: string) => {
      setPlayers((prev) => prev.filter((id) => id !== disconnectedId));
    });

    socket.on('game-start', (playerIds: string[]) => {
      setPlayers(playerIds);
      setGameStarted(true);
    });

    socket.on('game-result', (resultData: GameResult) => {
      setResult(resultData.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [router]);

  const joinGame = () => {
    if (!playerName.trim()) return;
    const socket = getSocket();
    if (!socketConnected || !socket) return;

    socket.emit('join-room', roomCode, playerName);
    socket.emit('player-ready', socket.id);
  };

  const startGame = () => {
    const socket = getSocket();
    if (socket) socket.emit('player-ready', socket.id);
  };

  const makeChoice = (choice: GameChoice) => {
    setYourChoice(choice);
    const socket = getSocket();
    if (socket) socket.emit('player-choice', choice);
  };

  const choices: GameChoice[] = ['rock', 'paper', 'scissors'];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => router.push('/game/multiplayer')} className="text-gray-600 hover:text-gray-800">← Back</button>
          <h1 className="text-xl font-bold">Room: {roomCode}</h1>
        </div>

        {!playerId ? (
          <p>Connecting to server...</p>
        ) : players.length === 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-2">Enter your name</h2>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Your name"
              className="w-full p-3 border rounded-lg mb-4"
            />
            <button
              onClick={joinGame}
              className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Join Game
            </button>
          </div>
        ) : !gameStarted ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Waiting for players...</h2>
            <ul className="space-y-2 mb-6">
              {players.map((id) => (
                <li key={id} className="p-2 bg-gray-100 rounded">
                  {id === playerId ? 'You' : 'Player'}
                </li>
              ))}
            </ul>
            {players.length > 1 && (
              <button
                onClick={startGame}
                className="w-full py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Start Game
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center">Make your choice</h2>
            <div className="flex justify-center space-x-4 mb-8">
              {choices.map((choice) => (
                <button
                  key={choice}
                  onClick={() => makeChoice(choice)}
                  disabled={yourChoice !== null}
                  className={`p-4 rounded-full hover:bg-blue-200 transition-colors ${yourChoice === choice ? 'bg-blue-300' : 'bg-blue-100'} ${yourChoice !== null ? 'opacity-50' : ''}`}
                >
                  {choice === 'rock' ? '✊' : choice === 'paper' ? '✋' : '✌️'}
                </button>
              ))}
            </div>

            <div className="space-y-4 text-center">
              <p className="font-medium">Players in game:</p>
              {players.map((id) => (
                <p key={id}>
                  {id === playerId ? 'You' : 'Opponent'}: {id}
                </p>
              ))}
              {result && (
                <p
                  className={`text-xl font-bold ${result.includes('wins') ? result.includes('You') ? 'text-green-600' : 'text-red-600' : 'text-yellow-600'}`}
                >
                  {result}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
