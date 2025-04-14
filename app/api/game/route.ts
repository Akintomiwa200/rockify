import type { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';

let io: any = null;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!io) {
    console.log('Initializing Socket.io');
    
    // @ts-ignore
    io = new Server(res.socket.server);
    
    io.on('connection', (socket: any) => {
      console.log('A user connected');
      
      socket.on('join-room', (room: string) => {
        socket.join(room);
      });
      
      socket.on('player-choice', (data: { choice: string, room: string }) => {
        socket.to(data.room).emit('opponent-choice', data.choice);
      });
      
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
    
    // @ts-ignore
    res.socket.server.io = io;
  }
  res.end();
}