import React from "react";
import { towerBlueprints } from "../../../towers";
import { TowerSlot } from "../TowerSlot/TowerSlot";

export const BottomBar = () => {
  return (
    <div className="bottom-bar">
      {towerBlueprints.map((tower, index) => (
        <TowerSlot key={tower.type} blueprint={tower} index={index} />
      ))}
    </div>
  );
};
