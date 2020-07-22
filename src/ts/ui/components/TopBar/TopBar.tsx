import { observer } from "mobx-react";
import React from "react";
import { startGame } from "../../../engine";
import { engine } from "../../../state/Engine";
import { game } from "../../../state/Game";

export const TopBar = observer(() => {
  const { isFastForward, setIsFastForward, nextWaveInNSeconds, startNextWave } = engine;
  const { money, currentWaveNumber, level } = game;
  const handleFastForwardToggle = () => {
    setIsFastForward(!isFastForward);
  };

  const handleEscape = () => {
    const { setIsPaused } = engine;
    setIsPaused(true);
  };

  const handleStartNextWave = () => {
    startNextWave();
  };

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <div className="topbar-button" onClick={handleEscape}>
          esc
        </div>
        <div className="game-status">
          <div>{level && `Wave: ${currentWaveNumber} / ${level.waves.length}`}</div>
          <div>
            Money: <span className="coin-num">{money}</span>
          </div>
        </div>
      </div>
      <div className="top-bar-right">
        <div className="topbar-button" onClick={handleFastForwardToggle}>
          {isFastForward ? ">" : ">>"}
        </div>
        {currentWaveNumber ? (
          <div
            className="topbar-button"
            onClick={nextWaveInNSeconds === 0 ? null : handleStartNextWave}
          >
            {nextWaveInNSeconds === 0 ? "..." : nextWaveInNSeconds}
          </div>
        ) : (
          <div className="topbar-button" onClick={startGame}>
            go
          </div>
        )}
      </div>
    </div>
  );
});
