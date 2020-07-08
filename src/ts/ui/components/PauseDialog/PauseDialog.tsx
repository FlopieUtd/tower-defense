import React from "react";
import { engine } from "../../../state/Engine";

export const PauseDialog = () => {
  const handleContinue = () => {
    const { setIsPaused } = engine;
    setIsPaused(false);
  };

  return (
    <div className="pause-dialog">
      <div className="margin-bottom">Game is paused!</div>
      <div className="button-wrapper">
        <div className="button">Menu</div>
        <div className="button" onClick={handleContinue}>
          Continue
        </div>
      </div>
    </div>
  );
};
