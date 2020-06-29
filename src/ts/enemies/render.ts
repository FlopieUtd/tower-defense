import { CTX, TILE_SIZE } from "../consts";
import { Enemy } from "../state/Enemy";
import { clamp } from "../utils";

export const renderEnemies = (enemies: Enemy[]) => {
  enemies.forEach(enemy => {
    const { position, isUnderFire, health, originalHealth, color, radius, deviation } = enemy;
    CTX.fillStyle = isUnderFire ? "white" : color;
    CTX.beginPath();
    CTX.arc(
      position.x * TILE_SIZE + 0.5 * TILE_SIZE + deviation.x,
      position.y * TILE_SIZE + 0.5 * TILE_SIZE + deviation.y,
      radius * 100,
      0,
      2 * Math.PI,
    );
    CTX.fill();
    if (health / originalHealth < 1 && health > 0) {
      // Health bar background
      CTX.fillStyle = "black";
      CTX.fillRect(
        position.x * TILE_SIZE + deviation.x + 17.5,
        position.y * TILE_SIZE + deviation.y + 35,
        15,
        2,
      );
      // Health bar foreground
      CTX.fillStyle = "lime";
      CTX.fillRect(
        position.x * TILE_SIZE + deviation.x + 17.5,
        position.y * TILE_SIZE + deviation.y + 35,
        15 * clamp(health / originalHealth, 0, 999999),
        2,
      );
    }
  });
};
