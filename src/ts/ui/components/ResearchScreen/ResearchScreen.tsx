import React, { useState } from "react";
import { researchTypes } from "../../../research";
import { engine, Screen } from "../../../state/Engine";
import { user } from "../../../state/User";
import { towerBlueprints } from "../../../towers/blueprints";
import { ResearchLine } from "./ResearchLine";

export const ResearchScreen = () => {
  const { credits } = user;

  const handleMenu = () => {
    const { setActiveScreen } = engine;
    setActiveScreen(Screen.Menu);
  };

  const [activeTab, setActiveTab] = useState("turret");

  return (
    <div className="research-screen">
      <h1>Research</h1>
      <div className="credits">Credits: {credits}</div>
      <div className="research-tabs">
        {towerBlueprints.map(tower => (
          <div
            className={`${tower.type === activeTab ? "active" : ""} research-tab`}
            onClick={() => {
              setActiveTab(tower.type);
            }}
            key={tower.type}
            style={{ background: tower.type === activeTab && tower.colors[0] }}
          >
            {tower.label}
          </div>
        ))}
      </div>
      <div className="research-container">
        {researchTypes.map(type => (
          <ResearchLine type={type} key={type.label} />
        ))}
      </div>
      <div className="research-button" onClick={handleMenu}>
        Menu
      </div>
    </div>
  );
};
