import React from "react";
import { levels } from "../../../levels";
import { LevelButton } from "../LevelButton/LevelButton";

export const MenuScreen = () => {
  const iterableLevels = Object.keys(levels).map(key => levels[key]);

  return (
    <div className="lose-screen">
      <h1>Menu</h1>
      <div className="level-grid">
        {iterableLevels.map(level => (
          <LevelButton levelNumber={level.levelNumber} key={level.levelNumber} />
        ))}
      </div>
    </div>
  );
};
