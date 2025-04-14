import { GameChoice } from "@/app/lib/gameLogic";

interface ChoiceSelectionProps {
  onSelect: (choice: GameChoice) => void;
  disabled?: boolean;
}

export default function ChoiceSelection({ onSelect, disabled = false }: ChoiceSelectionProps) {
  const choices = [
    { value: 'rock', emoji: '✊', label: 'Rock' },
    { value: 'paper', emoji: '✋', label: 'Paper' },
    { value: 'scissors', emoji: '✌️', label: 'Scissors' },
  ] as const;

  return (
    <div className="mt-8">
      <h3 className="text-center text-lg font-medium text-gray-700 mb-4">
        Make your choice
      </h3>
      <div className="flex justify-center space-x-4">
        {choices.map((choice) => (
          <button
            key={choice.value}
            onClick={() => onSelect(choice.value)}
            disabled={disabled}
            className={`p-4 text-4xl rounded-full transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'} bg-white shadow-md`}
            aria-label={choice.label}
          >
            {choice.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}