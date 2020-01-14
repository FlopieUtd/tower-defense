import { CTX, SPAWN_LOCATION1, SPAWN_LOCATION2, TILE_SIZE } from "../consts";
import { store } from "../state/RootStore";

export interface Position {
  x: number;
  y: number;
}
export type Map = number[][];

export const level01 = {
  map: [
    [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  waves: [
    [
      { amount: 10, type: "normal", spawnLocation: () => SPAWN_LOCATION1 },
      { amount: 10, type: "normal", spawnLocation: () => SPAWN_LOCATION2 },
    ],
    [
      { amount: 20, type: "normal", spawnLocation: () => SPAWN_LOCATION1 },
      { amount: 10, type: "normal", spawnLocation: () => SPAWN_LOCATION2 },
    ],
    [
      { amount: 8, type: "heavy", spawnLocation: () => SPAWN_LOCATION1 },
      { amount: 8, type: "heavy", spawnLocation: () => SPAWN_LOCATION2 },
    ],
    [
      { amount: 10, type: "heavy", spawnLocation: () => SPAWN_LOCATION1 },
      { amount: 25, type: "normal", spawnLocation: () => SPAWN_LOCATION2 },
    ],
    [
      { amount: 15, type: "heavy", spawnLocation: () => SPAWN_LOCATION1 },
      { amount: 15, type: "heavy", spawnLocation: () => SPAWN_LOCATION2 },
    ],
  ],
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
