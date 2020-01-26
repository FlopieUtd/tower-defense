import React from "react";
import { restartLevel } from "../../../engine";
import { levelCreator } from "../../../levels";
import { game } from "../../../state/Game";

export const LoseScreen = () => {
  const handleTryAgain = () => {
    const { level } = game;
    const { levelNumber } = level;
    restartLevel(levelCreator(levelNumber));
  };

  return (
    <div className="lose-screen">
      <h1>Game over</h1>
      <button onClick={handleTryAgain}>Try again</button>
    </div>
  );
};
