import { observer } from "mobx-react";
import React from "react";
import { engine, Screen } from "../../../state/Engine";
import { user } from "../../../state/User";
import { LevelButton } from "../LevelButton/LevelButton";

export const MenuScreen = observer(() => {
  const handleResearch = () => {
    const { setActiveScreen } = engine;
    setActiveScreen(Screen.Research);
  };

  return (
    <div className="menu-screen">
      <div>
        <div className="research-button" onClick={handleResearch}>
          Research
        </div>
      </div>
      <br />
      <div className="level-grid">
        {user.progress.map(level => (
          <LevelButton level={level} key={level.levelNumber} />
        ))}
      </div>
    </div>
  );
});
