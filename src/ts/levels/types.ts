import { SubWave } from "../state/Wave";

export interface PositionType {
  x: number;
  y: number;
}
export type Map = number[][];

export type Wave = SubWave[];

export interface LevelType {
  levelNumber: number;
  map: Map;
  waves: Wave[];
  startingMoney: number;
}

export interface SubWaveBlueprint {
  amount: number;
  type: string;
  spawnLocation: number;
}
