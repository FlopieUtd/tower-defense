import { CTX, TILE_SIZE } from "../consts";
import { store } from "../state/RootStore";
import { getUniquePosition } from "../utils";

export interface Position {
  x: number;
  y: number;
}
export type Map = number[][];

export interface Wave {
  amount: number;
  type: string;
  spawnLocation: Position;
}

export const maps = {
  1: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 2, 1, 1, 0, 1, 0, 1, 0, 1, 1, 4, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
};

export const waves = {
  1: [
    [{ amount: 120, type: "normal", spawnLocation: getUniquePosition(maps[1], 2) }],
    [{ amount: 120, type: "normal", spawnLocation: getUniquePosition(maps[1], 2) }],
    [{ amount: 8, type: "heavy", spawnLocation: getUniquePosition(maps[1], 2) }],
    [{ amount: 10, type: "heavy", spawnLocation: getUniquePosition(maps[1], 2) }],
    [{ amount: 15, type: "heavy", spawnLocation: getUniquePosition(maps[1], 2) }],
  ],
};

export const level01 = {
  map: maps[1],
  waves: waves[1],
  startingMoney: 200,
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
  const { game } = store;
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
