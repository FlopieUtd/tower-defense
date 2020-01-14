import React from "react";
import { towerBlueprints } from "../../../towers";
import { TowerSlot } from "../TowerSlot/TowerSlot";

export const BottomBar = () => {
  return (
    <div className="bottom-bar">
      {towerBlueprints.map(tower => (
        <TowerSlot key={tower.type} {...tower} />
      ))}
    </div>
  );
};
