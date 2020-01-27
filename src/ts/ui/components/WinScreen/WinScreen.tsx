import { observer } from "mobx-react";
import React from "react";
import { restartLevel } from "../../../engine";
import { levelCreator } from "../../../levels";
import { engine } from "../../../state/Engine";
import { game } from "../../../state/Game";

export const WinScreen = observer(() => {
  const handleTryAgain = () => {
    const { level } = game;
    const { levelNumber } = level;
    restartLevel(levelCreator(levelNumber));
  };

  const handleContinue = () => {
    const { setIsGameWon, setIsGameOver, setIsMenuActive } = engine;
    setIsGameWon(false);
    setIsGameOver(false);
    setIsMenuActive(true);
  };

  return (
    <div className="win-screen">
      <h1>Game won!</h1>
      <div className="stars">
        {[...Array(game.starsWon)].map(() => "★")}
        {[...Array(3 - game.starsWon)].map(() => "☆")}
      </div>
      <button onClick={handleTryAgain}>Try again</button>
      <button onClick={handleContinue}>Continue</button>
    </div>
  );
});
