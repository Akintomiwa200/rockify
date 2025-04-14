// pages/api/socket.ts

import { Server } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for WebSocket requests
  },
};

const playersInRoom: { [key: string]: { id: string; name: string }[] } = {}; // Stores players per room

const ioHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    // Socket.IO setup for WebSocket communication
    const io = new Server(res.socket.server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log('New client connected:', socket.id);

      socket.on('join-room', (roomId: string, playerName: string) => {
        console.log(`${playerName} joining room: ${roomId}`);
        socket.join(roomId);
        playersInRoom[roomId] = playersInRoom[roomId] || [];
        playersInRoom[roomId].push({ id: socket.id, name: playerName });
        io.to(roomId).emit('player-connected', socket.id);
        io.to(roomId).emit('game-start', playersInRoom[roomId].map(player => player.id));
      });

      socket.on('player-ready', (playerId: string) => {
        console.log(`Player ${playerId} is ready`);
        // Handle player readiness logic (start the game when all players are ready)
      });

      socket.on('player-choice', (choiceData: { playerId: string; choice: string; roomId: string }) => {
        console.log(`Player ${choiceData.playerId} chose ${choiceData.choice}`);
        // Handle choices and decide the game result
        io.to(choiceData.roomId).emit('game-result', {
          winner: 'player1',  // Placeholder
          reason: 'Player 1 won!',  // Placeholder
        });
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        // Remove player from rooms if necessary
        // Emit player-disconnected event to other players in the room
      });
    });

    // Attach the io instance to the Next.js server
    res.socket.server.io = io;
    res.end();
  }
};

export default ioHandler;
