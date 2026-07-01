import { useState } from "react";
import "./App.css";
import GameScreen from "./components/GameScreen";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return <GameScreen />;
  }

  return (
    <div className="menu">
      <div className="menu-card">
        <h1>Survivor Game</h1>

        <p className="subtitle">
          A Vampire Survivors Inspired Game
        </p>

        <button
          className="start-button"
          onClick={() => setIsPlaying(true)}
        >
          START GAME
        </button>

        <p className="version">Version 0.1</p>
      </div>
    </div>
  );
}

export default App;