import React from "react";
import { SubWaveBlueprint } from "../../../levels/types";

export interface Props extends SubWaveBlueprint {
  color: string;
}

export const WaveLine = ({ amount, type, color }: Props) => {
  return (
    <div className="wave-line" style={{ color }}>
      {amount} x {type}
    </div>
  );
};
