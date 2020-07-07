import React, { useState } from "react";
import { ResearchType } from "../../../research";
import { ResearchItem } from "../ResearchItem/ResearchItem";

interface Props {
  researchType: ResearchType;
  towerType: string;
}

export const ResearchLine = ({ researchType, towerType }: Props) => {
  return (
    <div className="research-line">
      <div className="research-label"> {researchType.label}</div>
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
