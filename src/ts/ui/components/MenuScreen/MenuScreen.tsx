import React from "react";
import { levels } from "../../../levels";
import { LevelButton } from "../LevelButton/LevelButton";

export const MenuScreen = () => {
  console.log(levels);
  const iterableLevels = Object.keys(levels).map(key => levels[key]);

  return (
    <div className="lose-screen">
      <h1>Menu</h1>
      {iterableLevels.map((level, index) => (
        <LevelButton levelNumber={index} key={level} />
      ))}
    </div>
  );
};
