import { observer } from "mobx-react";
import React from "react";
import { engine, Screen } from "../../../state/Engine";
import { game } from "../../../state/Game";

export const GameWonScreen = observer(() => {
  const { defeatedWaveNumber, level } = game;

  const handleContinue = () => {
    const { setActiveScreen } = engine;
    setActiveScreen(Screen.Menu);
  };

  return (
    <div className="win-screen">
      <h1>Game won!</h1>
      <div className="waves-won">
        {defeatedWaveNumber}/{level.waves.length}
      </div>
      <div className="button-wrapper">
        <button onClick={handleContinue}>Menu</button>
      </div>
    </div>
  );
});
