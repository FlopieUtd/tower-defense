import { observer } from "mobx-react";
import React, { useCallback } from "react";
import { TILE_SIZE } from "../../../consts";
import { construction } from "../../../state/Construction";
import { sellTower } from "../../../towers/update";

export const ActiveTowerDialog = observer(() => {
  const { activeTower } = construction;

  const handleSellTower = useCallback(() => {
    sellTower(activeTower);
  }, [activeTower]);

  if (!activeTower) {
    return null;
  }

  const { position, label } = activeTower;

  return (
    <div
      className="active-tower-dialog"
      style={{ left: position.x * TILE_SIZE + TILE_SIZE, top: position.y * TILE_SIZE + 10 }}
    >
      <div className="active-tower-title">{label}</div>
      <div className="active-tower-button" onClick={handleSellTower}>
        Sell
      </div>
    </div>
  );
});
