import { observer } from "mobx-react";
import React from "react";
import { user } from "../../../state/User";
import { LevelButton } from "../LevelButton/LevelButton";

export const MenuScreen = observer(() => {
  return (
    <div className="lose-screen">
      <p>Money: {user.money}</p>
      <div className="level-grid">
        {user.progress.map(level => (
          <LevelButton level={level} key={level.levelNumber} />
        ))}
      </div>
    </div>
  );
});
