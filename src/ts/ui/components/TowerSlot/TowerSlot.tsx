import React from "react";
import { TowerBlueprint } from "../../../state/models/TowerBlueprint";

export const TowerSlot = (blueprint: TowerBlueprint) => {
  const handleClick = () => {
    //
  };

  return (
    <div className="tower-slot" onClick={handleClick}>
      <div className="preview" style={{ background: blueprint.color }}></div>
    </div>
  );
};
