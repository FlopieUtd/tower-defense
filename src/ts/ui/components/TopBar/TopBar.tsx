import { observer } from "mobx-react";
import React from "react";
import { engine } from "../../../state/Engine";
import { game } from "../../../state/Game";

export const TopBar = observer(() => {
  const {
    isFastForward,
    setIsFastForward,
    isGameStarted,
    nextWaveInNSeconds,
    startNextWave,
    setIsGameStarted,
  } = engine;
  const { money, currentWaveGroup, level } = game;
  const handleFastForwardToggle = () => {
    setIsFastForward(!isFastForward);
  };

  const handleGameStart = () => {
    setIsGameStarted(true);
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
          <div>{level && `Wave: ${currentWaveGroup + 1} / ${level.waves.length}`}</div>
          <div>
            Money: <span className="coin-num">{money}</span>
          </div>
        </div>
      </div>
      <div className="top-bar-right">
        <div className="topbar-button" onClick={handleFastForwardToggle}>
          {isFastForward ? ">" : ">>"}
        </div>
        {isGameStarted ? (
          <div
            className="topbar-button"
            onClick={nextWaveInNSeconds === 0 ? null : handleStartNextWave}
          >
            {nextWaveInNSeconds === 0 ? "..." : nextWaveInNSeconds}
          </div>
        ) : (
          <div className="topbar-button" onClick={handleGameStart}>
            go
          </div>
        )}
      </div>
    </div>
  );
});
