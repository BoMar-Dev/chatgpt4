import { useState } from 'react';
import GameBoard from './components/GameBoard/GameBoard';
import StartScreen from './components/StartScreen/StartScreen';
import DifficultySelector from './components/DifficultySelector';
import './styles/App.module.scss';

const App = () => {
  const [gameMode, setGameMode] = useState(''); // Lagrar vilket spel-läge som användaren väljer
  const [difficulty, setDifficulty] = useState('medium'); // Standard svårighetsgrad
  const [isGameStarted, setIsGameStarted] = useState(false); // Spårar om spelet är startat

  const handleStartGame = (mode) => {
      setGameMode(mode);
      setIsGameStarted(true);
  };

  const handleDifficultyChange = (newDifficulty) => {
      setDifficulty(newDifficulty);
  };

  const handleBackToMenu = () => {
      setIsGameStarted(false);
      setGameMode('');
      setDifficulty('medium'); // Återställer till standardvärdet eller behåller användarens val
  };

  return (
      <div className="app-container"> {/* Klassnamn tillagt om du vill applicera specifika stilar */}
          {!isGameStarted ? (
              <>
                  <StartScreen onStartGame={handleStartGame} />
                  <DifficultySelector onDifficultyChange={handleDifficultyChange} />
              </>
          ) : (
              <GameBoard mode={gameMode} difficulty={difficulty} onBackToMenu={handleBackToMenu} />
          )}
      </div>
  );
};

export default App;