
import { useState, useEffect, useRef } from 'react';
import { useSocket } from '@/context/SocketContext.tsx/page';
import { useUser } from '@/context/UserContext/page';

interface Message {
  sender: string;
  text: string;
  timestamp: number;
}

export default function ChatBox({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = useSocket();
  const { user } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socket) return;

    socket.on('chat-message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socket.off('chat-message');
    };
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket || !user) return;

    const message = {
      sender: user.username,
      text: newMessage.trim(),
      timestamp: Date.now()
    };

    socket.emit('send-message', { message, roomId });
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-[300px] flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.sender === user?.username ? 'text-right' : ''}`}>
            <span className="text-sm font-semibold text-gray-600">{msg.sender}: </span>
            <span className="text-gray-800">{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}
