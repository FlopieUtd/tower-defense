import React from "react";
import { restartLevel } from "../../../engine";
import { levelCreator } from "../../../levels";

export const LoseScreen = () => {
  const handleTryAgain = () => {
    restartLevel(levelCreator(1));
  };

  return (
    <div className="lose-screen">
      <h1>Game over</h1>
      <button onClick={handleTryAgain}>Try again</button>
    </div>
  );
};
