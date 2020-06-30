import { observer } from "mobx-react";
import React from "react";
import { startLevel } from "../../../engine";
import { levelCreator } from "../../../levels";
import { LevelStatus } from "../../../state/User";

export const LevelButton = observer(({ level }: { level: LevelStatus }) => {
  const { levelNumber, isGameWon, isUnlocked } = level;
  const handleClick = () => {
    startLevel(levelCreator(levelNumber));
  };

  return (
    <div
      className={"level-button " + (isUnlocked ? "level-button-is-unlocked" : "")}
      onClick={isUnlocked ? handleClick : null}
      style={{ color: isGameWon ? "#fff" : "#999" }}
    >
      {levelNumber}
      {isGameWon && (
        <div>
          {[...Array(level.stars)].map(() => "★")}
          {[...Array(3 - level.stars)].map(() => "☆")}
        </div>
      )}
    </div>
  );
});
