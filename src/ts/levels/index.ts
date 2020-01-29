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
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 1, 1, 0, 1, 0, 1, 1, 4, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    waves: [
      [{ amount: 16, type: "runner", spawnLocation: 2 }],
      [{ amount: 20, type: "runner", spawnLocation: 2 }],
      [{ amount: 24, type: "runner", spawnLocation: 2 }],
      [{ amount: 16, type: "heavy", spawnLocation: 2 }],
      [{ amount: 20, type: "heavy", spawnLocation: 2 }],
      [{ amount: 24, type: "heavy", spawnLocation: 2 }],
    ],
    startingMoney: 300,
  },
  2: {
    levelNumber: 2,
    map: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
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
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 1, 1, 0, 1, 0, 1, 1, 4, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    waves: [[{ amount: 20, type: "heavy", spawnLocation: 2 }]],
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

export const renderMap = (map: Map) => {
  CTX.fillStyle = "black";
  CTX.fillRect(0, 0, map[0].length * TILE_SIZE, map.length * TILE_SIZE);
  map.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile > 0 && tile < 5) {
        CTX.fillStyle = "#444";
        CTX.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    });
  });
};

export const renderBuildings = (map: Map) => {
  const { health } = game;
  map.forEach((row, y) => {
    row.forEach((tile, x) => {
      // Spawn Camps
      if (tile === 2 || tile === 3) {
        CTX.fillStyle = "#222";
        CTX.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        CTX.font = "20px monospace";
        CTX.fillStyle = "white";
        CTX.textAlign = "center";
        CTX.fillText("S", x * TILE_SIZE + TILE_SIZE * 0.5, y * TILE_SIZE + TILE_SIZE * 0.6);
      }
      // HQ
      if (tile === 4) {
        CTX.fillStyle = "#222";
        CTX.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        CTX.font = "20px monospace";
        CTX.fillStyle = "white";
        CTX.textAlign = "center";
        CTX.fillText(
          health.toString(),
          x * TILE_SIZE + TILE_SIZE * 0.5,
          y * TILE_SIZE + TILE_SIZE * 0.6,
        );
      }
    });
  });
};
