// "use client" not required here because this is not a React component

import { io, Socket } from 'socket.io-client';

// Types for game choices and result
export type GameChoice = 'rock' | 'paper' | 'scissors';
export type GameResult = {
  winner: string; 
  reason: string;
};


// Define types for socket events (incoming)
type GameEvents = {
  'player-connected': (playerId: string) => void;
  'player-disconnected': (playerId: string) => void;
  'player-choice': (data: { playerId: string; choice: GameChoice }) => void;
  'game-start': (players: string[]) => void;
  'game-result': (result: GameResult) => void;
  'room-joined': (roomId: string) => void;
  'room-error': (error: string) => void;
};

// Define types for emitting events (outgoing)
type EmitEvents = {
  'join-room': (roomId: string, playerName: string) => void;
  'leave-room': (roomId: string) => void;
  'player-ready': (playerId: string) => void;
  'player-choice': (choice: GameChoice) => void;
  'request-rematch': () => void;
};

// Strongly typed socket using Socket.IO generics
export type GameSocket = Socket<GameEvents, EmitEvents>;

// Singleton socket instance
let socket: GameSocket | null = null;

// ✅ Initializes socket (call this on first load)
export const initializeSocket = (): GameSocket => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
      autoConnect: false,
      transports: ['websocket'],
      withCredentials: true,
    });

    // Debug logs
    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket?.id);
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });

    socket.on('connect_error', (err) => {
      console.error('⚠️ Socket connection error:', err);
    });
  }

  return socket;
};

// ✅ Access the current socket instance
export const getSocket = (): GameSocket | null => socket;

// ✅ Gracefully disconnect and clear socket instance
export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
