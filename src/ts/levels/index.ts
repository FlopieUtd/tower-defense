import { CTX, TILE_SIZE } from "../consts";
import { hqHealth } from "../state";

export interface Position {
  x: number;
  y: number;
}
export type Map = number[][];

export const level01 = {
  map: [
    [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  waves: [
    { amount: 15, type: "normal" },
    { amount: 20, type: "normal" },
    { amount: 5, type: "heavy" },
    { amount: 10, type: "heavy" },
    { amount: 25, type: "normal" },
    { amount: 15, type: "heavy" },
    { amount: 20, type: "heavy" },
  ],
};

export const renderMap = (map: Map) => {
  CTX.fillStyle = "black";
  CTX.fillRect(0, 0, map[0].length * TILE_SIZE, map.length * TILE_SIZE);
  map.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile > 0 && tile < 4) {
        CTX.fillStyle = "#444";
        CTX.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    });
  });
};

export const renderBuildings = (map: Map) => {
  map.forEach((row, y) => {
    row.forEach((tile, x) => {
      // Spawn Camps
      if (tile === 2) {
        CTX.fillStyle = "#222";
        CTX.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        CTX.font = "20px monospace";
        CTX.fillStyle = "white";
        CTX.textAlign = "center";
        CTX.fillText("S", x * TILE_SIZE + TILE_SIZE * 0.5, y * TILE_SIZE + TILE_SIZE * 0.6);
      }
      // HQ
      if (tile === 3) {
        CTX.fillStyle = "#222";
        CTX.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        CTX.font = "20px monospace";
        CTX.fillStyle = "white";
        CTX.textAlign = "center";
        CTX.fillText(
          hqHealth.value.toString(),
          x * TILE_SIZE + TILE_SIZE * 0.5,
          y * TILE_SIZE + TILE_SIZE * 0.6,
        );
      }
    });
  });
};
