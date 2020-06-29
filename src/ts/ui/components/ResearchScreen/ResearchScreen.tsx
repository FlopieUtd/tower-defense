import React, { useCallback, useState } from "react";
import { engine, Screen } from "../../../state/Engine";
import { towerBlueprints } from "../../../towers/blueprints";

export const ResearchScreen = () => {
  const handleMenu = () => {
    const { setActiveScreen } = engine;
    setActiveScreen(Screen.Menu);
  };

  const [activeTab, setActiveTab] = useState("turret");

  return (
    <div className="research-screen">
      <h1>Research</h1>
      <div className="research-tabs">
        {towerBlueprints.map(tower => (
          <div
            className={`${tower.type === activeTab ? "active" : ""} research-tab`}
            onClick={() => {
              setActiveTab(tower.type);
            }}
          >
            {tower.type}
          </div>
        ))}
      </div>
      <div className="research-container">
        fire rate
        <br />
        range
        <br />
        damage
        <br />
        rotation speed
        <br />
        price
        <br />
      </div>
      <div className="research-button" onClick={handleMenu}>
        Menu
      </div>
    </div>
  );
};
