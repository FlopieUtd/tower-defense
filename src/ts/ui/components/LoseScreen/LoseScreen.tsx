import React from "react";
import { restartLevel } from "../../../engine";
import { levelCreator } from "../../../levels";
import { game } from "../../../state/Game";

import { engine, Screen } from "../../../state/Engine";

export const LoseScreen = () => {
  const handleTryAgain = () => {
    const { level } = game;
    const { levelNumber } = level;
    restartLevel(levelCreator(levelNumber));
  };

  const handleContinue = () => {
    const { setActiveScreen } = engine;
    setActiveScreen(Screen.Menu);
  };

  return (
    <div className="lose-screen">
      <h1>Game over</h1>
      <div className="button-wrapper">
        <button onClick={handleTryAgain}>Try again</button>
        <button onClick={handleContinue}>To menu</button>
      </div>
    </div>
  );
};
