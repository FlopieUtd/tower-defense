import { observer } from "mobx-react";
import React from "react";
import { restartLevel } from "../../../engine";
import { levelCreator } from "../../../levels";
import { engine, Screen } from "../../../state/Engine";
import { game } from "../../../state/Game";

export const GameOverScreen = observer(() => {
  const { currentWaveGroup } = game;

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
      <h1>Game over!</h1>
      <div className="waves-won">{currentWaveGroup}/40</div>
      <div className="button-wrapper">
        <button onClick={handleTryAgain}>Try again</button>
        <button onClick={handleContinue}>Menu</button>
      </div>
    </div>
  );
});
