import { Wave } from "../state/Wave";

export interface PositionType {
  x: number;
  y: number;
}
export type Map = number[][];

export interface LevelType {
  levelNumber: number;
  map: Map;
  waves: WaveGroup[];
  startingMoney: number;
}

export interface WaveType {
  amount: number;
  type: string;
  spawnLocation: number;
}

export type WaveGroup = Wave[];
