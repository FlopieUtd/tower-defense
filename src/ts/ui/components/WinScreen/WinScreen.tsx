import React from "react";
import { getStars, restartLevel } from "../../../engine";
import { levelCreator } from "../../../levels";
import { game } from "../../../state/Game";

export const WinScreen = () => {
  const handleTryAgain = () => {
    restartLevel(levelCreator());
  };

  return (
    <div className="lose-screen">
      <h1>Game won!</h1>
      <div className="stars">{getStars(game.health).map(star => (star ? "★" : "☆"))}</div>
      <button onClick={handleTryAgain}>Try again</button>
    </div>
  );
};
