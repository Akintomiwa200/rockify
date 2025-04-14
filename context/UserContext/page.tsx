"use client";


import { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  username: string;
  avatar: number | null;
  score: number;
};

type UserContextType = {
  user: User | null;
  setUsername: (username: string) => void;
  setAvatar: (avatarId: number) => void;
  updateScore: (points: number) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUsername: () => {},
  setAvatar: () => {},
  updateScore: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const setUsername = (username: string) => {
    setUser(prev => ({
      ...(prev || { avatar: null, score: 0 }),
      username
    }));
  };

  const setAvatar = (avatarId: number) => {
    setUser(prev => ({
      ...(prev || { username: '', score: 0 }),
      avatar: avatarId
    }));
  };

  const updateScore = (points: number) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        score: prev.score + points
      };
    });
  };

  return (
    <UserContext.Provider value={{ user, setUsername, setAvatar, updateScore }}>
      {children}
    </UserContext.Provider>
  );
};