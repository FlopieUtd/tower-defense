import { PositionType } from ".";
import { CTX, TILE_SIZE } from "../consts";
import { game } from "../state/Game";
import { Map } from "./index";

export const renderConstructionTile = (position: PositionType) => {
  const { x, y } = position;
  CTX.fillStyle = "#1A1A1A";
  CTX.fillRect(x * TILE_SIZE + 2, y * TILE_SIZE + 2, TILE_SIZE - 4, TILE_SIZE - 4);
};

export const renderMap = (map: Map) => {
  CTX.fillStyle = "black";
  CTX.fillRect(0, 0, map[0].length * TILE_SIZE, map.length * TILE_SIZE);
  map.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile > 0 && tile < 5) {
        CTX.fillStyle = "#333";
        CTX.fillRect(x * TILE_SIZE + 2, y * TILE_SIZE + 2, TILE_SIZE - 4, TILE_SIZE - 4);
      }
      if (tile === 6) {
        renderConstructionTile({ x, y });
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
        CTX.fillStyle = "#333";
        CTX.fillRect(x * TILE_SIZE + 2, y * TILE_SIZE + 2, TILE_SIZE - 4, TILE_SIZE - 4);
        CTX.font = "20px monospace";
        CTX.fillStyle = "white";
        CTX.textAlign = "center";
        CTX.fillText("S", x * TILE_SIZE + TILE_SIZE * 0.5, y * TILE_SIZE + TILE_SIZE * 0.6);
      }
      // HQ
      if (tile === 4) {
        CTX.fillStyle = "#333";
        CTX.fillRect(x * TILE_SIZE + 2, y * TILE_SIZE + 2, TILE_SIZE - 4, TILE_SIZE - 4);
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
