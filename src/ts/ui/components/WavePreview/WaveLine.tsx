import React from "react";
import { WaveType } from "../../../levels/types";

export interface Props extends WaveType {
  color: string;
}

export const WaveLine = ({ amount, type, color }: Props) => {
  return (
    <div className="wave-line" style={{ color }}>
      {amount} x {type}
    </div>
  );
};
