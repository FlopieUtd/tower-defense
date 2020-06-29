import { CTX, TILE_SIZE } from "../consts";
import { game } from "../state/Game";
import { Level } from "../state/Level";
import { Wave } from "../state/Wave"; // eslint-disable-line

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

export const levelCreator = (level: number) => new Level(levels[level]);

export const levels = {
  1: {
    levelNumber: 1,
    map: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 6, 1, 1, 1, 6, 6, 6, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 1, 1, 6, 1, 6, 1, 1, 4, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 6, 6, 6, 1, 1, 1, 6, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    waves: [
      [{ amount: 1, type: "spawner", spawnLocation: 2 }],
      [{ amount: 8, type: "runner", spawnLocation: 2 }],
      [{ amount: 8, type: "heavy", spawnLocation: 2 }],
      [{ amount: 16, type: "runner", spawnLocation: 2 }],
      [{ amount: 16, type: "heavy", spawnLocation: 2 }],
      [{ amount: 24, type: "runner", spawnLocation: 2 }],
    ],
    startingMoney: 200,
  },
  2: {
    levelNumber: 2,
    map: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 4, 0, 0, 0, 2, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 6, 6, 0, 0, 0, 0, 0, 6, 6, 1, 0, 0, 0],
      [0, 0, 0, 1, 6, 6, 0, 1, 1, 1, 0, 6, 6, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 6, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    waves: [
      [{ amount: 20, type: "runner", spawnLocation: 2 }],
      [{ amount: 20, type: "heavy", spawnLocation: 2 }],
      [
        { amount: 16, type: "runner", spawnLocation: 2 },
        { amount: 16, type: "heavy", spawnLocation: 2 },
      ],
      [
        { amount: 24, type: "runner", spawnLocation: 2 },
        { amount: 24, type: "heavy", spawnLocation: 2 },
      ],
    ],
    startingMoney: 200,
  },
  3: {
    levelNumber: 3,
    map: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 4, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    waves: [[{ amount: 1, type: "spawner", spawnLocation: 2 }]],
    startingMoney: 200,
  },
  4: {
    levelNumber: 4,
    map: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 1, 1, 0, 1, 0, 1, 1, 4, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    waves: [[{ amount: 500, type: "runner", spawnLocation: 2 }]],
    startingMoney: 1200,
  },
};
