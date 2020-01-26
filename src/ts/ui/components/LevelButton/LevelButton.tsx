import React from "react";
import { startLevel } from "../../../engine";
import { levelCreator } from "../../../levels";

export const LevelButton = ({ levelNumber }: { levelNumber: number }) => {
  const handleClick = () => {
    startLevel(levelCreator(levelNumber));
  };

  return (
    <div className="level-button" onClick={handleClick}>
      {levelNumber}
    </div>
  );
};
