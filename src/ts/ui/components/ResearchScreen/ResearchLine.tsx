import React, { useState } from "react";
import { ResearchType, researchTypes } from "../../../research";
import { user } from "../../../state/User";
import { ResearchItem } from "../ResearchItem/ResearchItem";

interface Props {
  researchTypeName: string;
  towerType: string;
}

export const ResearchLine = ({ researchTypeName, towerType }: Props) => {
  const { research } = user;
  const researchLevel = research[towerType][researchTypeName];
  const researchType = researchTypes.find(type => type.name === researchTypeName);
  const effect = researchType.effects[researchLevel];

  return (
    <div className="research-line">
      <div className="research-label">
        {researchType.label} ({researchType.type === "increase" ? "+" : "-"}
        {effect}%)
      </div>
      <div className="research-items-container">
        {Array.from(Array(10).keys()).map(level => (
          <ResearchItem
            key={level}
            level={level + 1}
            researchType={researchType.name}
            towerType={towerType}
          ></ResearchItem>
        ))}
      </div>
    </div>
  );
};
