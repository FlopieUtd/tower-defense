import React from "react";
import { getStars, restartLevel } from "../../../engine";
import { levelCreator } from "../../../levels";
import { engine } from "../../../state/Engine";
import { game } from "../../../state/Game";

export const WinScreen = () => {
  const handleTryAgain = () => {
    restartLevel(levelCreator(1));
  };

  const handleContinue = () => {
    const { setIsGameWon, setIsGameOver, setIsMenuActive } = engine;
    setIsGameWon(false);
    setIsGameOver(false);
    setIsMenuActive(true);
  };

  return (
    <div className="lose-screen">
      <h1>Game won!</h1>
      <div className="stars">{getStars(game.health).map(star => (star ? "★" : "☆"))}</div>
      <button onClick={handleTryAgain}>Try again</button>
      <button onClick={handleContinue}>Continue</button>
    </div>
  );
};
