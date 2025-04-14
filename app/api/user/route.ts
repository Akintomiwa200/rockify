import type { NextApiRequest, NextApiResponse } from 'next';

type UserData = {
  username: string;
  avatar: number;
  score: number;
};

// Mock database
const users: UserData[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, avatar } = req.body;
    
    if (!username || avatar === undefined) {
      return res.status(400).json({ error: 'Username and avatar are required' });
    }
    
    const existingUser = users.find(user => user.username === username);
    
    if (existingUser) {
      return res.status(200).json(existingUser);
    }
    
    const newUser = { username, avatar, score: 0 };
    users.push(newUser);
    return res.status(201).json(newUser);
  }
  
  if (req.method === 'GET') {
    return res.status(200).json(users.sort((a, b) => b.score - a.score));
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}