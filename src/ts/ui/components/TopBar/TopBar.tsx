import { observer } from "mobx-react";
import React from "react"; // eslint-disable-line
import { engine } from "../../../state/Engine";
import { game } from "../../../state/Game";

export const TopBar = observer(() => {
  const {
    isFastForward,
    setIsFastForward,
    isGameStarted,
    nextWaveInNSeconds,
    callNextWave,
    setIsGameStarted,
  } = engine;
  const { money, currentWaveGroup } = game;
  const handleFastForwardToggle = () => {
    setIsFastForward(!isFastForward);
  };

  const handleGameStart = () => {
    setIsGameStarted(true);
  };

  const handleCallNextWave = () => {
    callNextWave();
  };

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        {isGameStarted ? (
          <div
            className="topbar-button"
            onClick={nextWaveInNSeconds === 0 ? null : handleCallNextWave}
          >
            {nextWaveInNSeconds === 0 ? "..." : nextWaveInNSeconds}
          </div>
        ) : (
          <div className="topbar-button" onClick={handleGameStart}>
            go
          </div>
        )}

        <div className="game-status">
          <div>Wave: {currentWaveGroup + 1}</div>
          <div>
            Money: <span className="coin-num">{money}</span>
          </div>
        </div>
      </div>
      <div className="topbar-button" onClick={handleFastForwardToggle}>
        {isFastForward ? ">" : ">>"}
      </div>
    </div>
  );
});
