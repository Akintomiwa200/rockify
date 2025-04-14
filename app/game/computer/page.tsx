"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Choice = 'rock' | 'paper' | 'scissors';

export default function ComputerGamePage() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string>('');
  const [score, setScore] = useState(0);
  const router = useRouter();

  const choices: Choice[] = ['rock', 'paper', 'scissors'];

  const playGame = (choice: Choice) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);
    
    if (choice === computerChoice) {
      setResult("It's a tie!");
    } else if (
      (choice === 'rock' && computerChoice === 'scissors') ||
      (choice === 'paper' && computerChoice === 'rock') ||
      (choice === 'scissors' && computerChoice === 'paper')
    ) {
      setResult('You win!');
      setScore(score + 1);
    } else {
      setResult('Computer wins!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => router.push('/')}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold">Score: {score}</h1>
        </div>
        
        <h2 className="text-xl font-semibold mb-4 text-center">Choose your move</h2>
        
        <div className="flex justify-center space-x-4 mb-8">
          {choices.map((choice) => (
            <button
              key={choice}
              onClick={() => playGame(choice)}
              className="p-4 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
            >
              {choice === 'rock' ? '✊' : 
               choice === 'paper' ? '✋' : '✌️'}
            </button>
          ))}
        </div>

        {playerChoice && computerChoice && (
          <div className="text-center space-y-4">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">Your choice:</p>
                <p className="text-4xl">
                  {playerChoice === 'rock' ? '✊' : 
                   playerChoice === 'paper' ? '✋' : '✌️'}
                </p>
              </div>
              <div>
                <p className="font-medium">Computer:</p>
                <p className="text-4xl">
                  {computerChoice === 'rock' ? '✊' : 
                   computerChoice === 'paper' ? '✋' : '✌️'}
                </p>
              </div>
            </div>
            <p className={`text-xl font-bold ${
              result.includes('win') ? 
                (result.includes('You') ? 'text-green-600' : 'text-red-600') : 
                'text-yellow-600'
            }`}>
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}