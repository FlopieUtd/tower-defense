import { observer } from "mobx-react";
import React from "react"; // eslint-disable-line
import { engine } from "../../../state/Engine";
import { game } from "../../../state/Game";

export const TopBar = observer(() => {
  const { isFastForward, setIsFastForward } = engine;
  const { money, currentWaveGroup } = game;
  const handleFastForwardToggle = () => {
    setIsFastForward(!isFastForward);
  };

  return (
    <div className="top-bar">
      <div>
        <div>Wave: {currentWaveGroup + 1}</div>
        <div>
          Money: <span className="coin-num">{money}</span>
        </div>
      </div>
      <div className="fast-forward" onClick={handleFastForwardToggle}>
        {isFastForward ? ">" : ">>"}
      </div>
    </div>
  );
});
