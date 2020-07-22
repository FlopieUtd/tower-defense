import { observer } from "mobx-react";
import React from "react";
import { enemyBlueprints } from "../../../enemies/blueprints";
import { game } from "../../../state/Game";
import { WaveLine } from "./WaveLine";

export const WavePreview = observer(() => {
  const { waves } = game.level;
  const { defeatedWaveNumber } = game;

  return (
    <div className="wave-preview-container">
      <div className="wave-preview">
        {waves[defeatedWaveNumber].map((wave, index) => {
          const color = enemyBlueprints.find(enemy => enemy.type === wave.type).color;
          return <WaveLine {...wave} color={color} key={index} />;
        })}
      </div>
      <div className="wave-preview-dropdown">
        {waves.slice(defeatedWaveNumber + 1).map((waveGroup, i) => (
          <div className="wave-preview" key={i}>
            {waveGroup.map((wave, j) => {
              const typeColor =
                enemyBlueprints.find(enemy => enemy.type === wave.type).color ?? "white";
              return (
                <div className="wave-line" key={j} style={{ color: typeColor }}>
                  {wave.amount} x {wave.type}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
});
