import React from "react";
import { restartLevel } from "../../../engine";
import { level01 } from "../../../levels";
import { Level } from "../../../state/models/Level";

export const LoseScreen = () => {
  const handleTryAgain = () => {
    restartLevel(Level.create(level01));
  };

  return (
    <div className="lose-screen">
      <h1>Game Over</h1>
      <button onClick={handleTryAgain}>Try again</button>
    </div>
  );
};
