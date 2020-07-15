import { observer } from "mobx-react";
import React from "react";
import { researchCosts, researchTypes } from "../../../research";
import { user } from "../../../state/User";

interface Props {
  level: number;
  researchType: string;
  towerType: string;
}

export const ResearchItem = observer(({ level, researchType, towerType }: Props) => {
  const { credits, research, setResearch } = user;

  const currentResearchLevel: number = research[towerType][researchType].level ?? 0;
  const isResearched = level <= currentResearchLevel;
  const toBeResearched = researchCosts.slice(currentResearchLevel, level);
  const cost = toBeResearched.reduce((acc, curr) => acc + curr, 0);
  const isAvailable = cost <= credits;

  const handleResearch = () => {
    const newResearch = { ...research };
    newResearch[towerType][researchType] = {
      level,
      effect: researchTypes.find(type => type.name === researchType).effects[level],
    };
    user.setCredits(credits - cost);
    setResearch(newResearch);
  };

  return (
    <div
      className={`research-item
        ${isResearched ? "researched" : ""}
        ${isAvailable ? "is-available" : ""}`}
      onClick={isAvailable ? handleResearch : null}
    ></div>
  );
});
