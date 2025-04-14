export type GameChoice = 'rock' | 'paper' | 'scissors';
export type GameResult = 'win' | 'lose' | 'draw';

export const determineWinner = (playerChoice: GameChoice, opponentChoice: GameChoice): GameResult => {
  if (playerChoice === opponentChoice) return 'draw';
  
  const winningConditions = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  };

  return winningConditions[playerChoice] === opponentChoice ? 'win' : 'lose';
};

export const getRandomChoice = (): GameChoice => {
  const choices: GameChoice[] = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
};

export const updateScore = (result: GameResult, currentScore: number): number => {
  if (result === 'win') return currentScore + 1;
  return currentScore;
};