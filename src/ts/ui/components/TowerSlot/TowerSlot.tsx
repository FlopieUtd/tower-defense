import React from "react";
import { handleConstructionPreview } from "../../../engine/event_handlers";
import { TowerBlueprint } from "../../../state/TowerBlueprint"; // eslint-disable-line
import { towerBlueprints } from "../../../towers";

export const TowerSlot = ({ blueprint, index }: { blueprint: TowerBlueprint; index: number }) => {
  const handleClick = () => {
    handleConstructionPreview(towerBlueprints[index]);
  };

  return (
    <div className="tower-slot" onClick={handleClick}>
      <div className="preview" style={{ background: blueprint.colors[0] }}></div>
    </div>
  );
};
