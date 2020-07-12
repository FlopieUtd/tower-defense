import React from "react";
import { handleGameOver } from "../../../engine";
import { engine, Screen } from "../../../state/Engine";

export const PauseDialog = () => {
  const handleContinue = () => {
    const { setIsPaused } = engine;
    setIsPaused(false);
  };

  const handleMenu = () => {
    handleGameOver();
    const { setActiveScreen } = engine;
    setActiveScreen(Screen.GameOver);
  };

  return (
    <div className="pause-dialog">
      <div className="margin-bottom">Game is paused!</div>
      <div className="button-wrapper">
        <div className="button" onClick={handleMenu}>
          Menu
        </div>
        <div className="button" onClick={handleContinue}>
          Continue
        </div>
      </div>
    </div>
  );
};
