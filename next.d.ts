// next.d.ts
import { Server } from 'socket.io';

// Extend global types
declare global {
  namespace NodeJS {
    interface IncomingMessage {
      socket: {
        server: {
          io: Server;
        };
      };
    }
  }
}
