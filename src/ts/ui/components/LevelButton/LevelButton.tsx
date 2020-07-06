import { observer } from "mobx-react";
import React from "react";
import { startLevel } from "../../../engine";
import { levelCreator } from "../../../levels";
import { LevelStatus } from "../../../state/User";

export const LevelButton = observer(({ level }: { level: LevelStatus }) => {
  const { levelNumber, isUnlocked, wavesWon } = level;
  const handleClick = () => {
    startLevel(levelCreator(levelNumber));
  };

  return (
    <div
      className={"level-button " + (isUnlocked ? "level-button-is-unlocked" : "")}
      onClick={isUnlocked ? handleClick : null}
    >
      {levelNumber}
      <div>{wavesWon ?? 0}/40</div>
    </div>
  );
});
