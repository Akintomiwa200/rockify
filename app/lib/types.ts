// Game Types
export type GameChoice = 'rock' | 'paper' | 'scissors';
export type GameResult = 'win' | 'lose' | 'draw' | 'pending';

export interface Player {
  id: string;
  username: string;
  avatar: string;
  score: number;
  isReady: boolean;
  lastChoice?: GameChoice | null;
}

export interface GameRoom {
  id: string;
  players: Player[];
  currentRound: number;
  maxRounds: number;
  isGameOver: boolean;
  winner?: string | null;
}

export interface GameState {
  room: GameRoom | null;
  currentPlayer: Player | null;
  opponent: Player | null;
  result: GameResult;
  countdown: number;
  isWaiting: boolean;
}

// Socket Types
export interface ServerToClientEvents {
  'player-connected': (player: Player) => void;
  'player-disconnected': (playerId: string) => void;
  'player-ready': (playerId: string) => void;
  'player-choice': (data: { playerId: string; choice: GameChoice }) => void;
  'game-start': (room: GameRoom) => void;
  'game-update': (room: GameRoom) => void;
  'game-result': (result: { winner: string | null; players: Player[] }) => void;
  'room-joined': (room: GameRoom) => void;
  'room-error': (error: string) => void;
  'timer-update': (seconds: number) => void;
}

export interface ClientToServerEvents {
  'join-room': (roomId: string, player: Omit<Player, 'id'>, callback: (success: boolean) => void) => void;
  'leave-room': (roomId: string) => void;
  'player-ready': (roomId: string, playerId: string) => void;
  'player-choice': (roomId: string, playerId: string, choice: GameChoice) => void;
  'request-rematch': (roomId: string, playerId: string) => void;
}

// UI Types
export interface ModalConfig {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

// Context Types
export interface UserContextType {
  user: {
    id: string;
    username: string;
    avatar: string;
    score: number;
  } | null;
  setUser: (user: { username: string; avatar: string }) => void;
  updateScore: (points: number) => void;
  resetUser: () => void;
}