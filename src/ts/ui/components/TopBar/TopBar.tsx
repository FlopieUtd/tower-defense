import { observer } from "mobx-react";
import React from "react"; // eslint-disable-line
import { store } from "../../../state/RootStore";

export const TopBar = observer(() => {
  const { engine, game } = store;
  const { isFastForward, setIsFastForward, waveTick } = engine;
  const { money, currentWave } = game;
  const handleFastForwardToggle = () => {
    setIsFastForward(!isFastForward);
  };

  return (
    <div className="top-bar">
      <div>
        <div>Wave: {currentWave + 1}</div>
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
