import { CTX, TILE_SIZE } from "../consts";
// eslint-disable-next-line
import { Enemy } from "../enemies";
// eslint-disable-next-line
import { level01, Position } from "../levels";
import { construction, money, mouse } from "../state";
import { areColliding, getValueAtPosition } from "../utils";

export type TowerType = "turret" | "flamethrower";
export type Color = "blue" | "red" | "pink";

export interface TowerBlueprint {
  radius: number;
  damagePerFrame: number;
  type: TowerType;
  cost: number;
  color: Color;
}

export interface Tower extends TowerBlueprint {
  id: number;
  position: Position;
  isFiring: boolean;
}

export const towerBlueprints: TowerBlueprint[] = [
  {
    type: "turret",
    damagePerFrame: 1,
    radius: 1.5,
    cost: 100,
    color: "blue",
  },
  {
    type: "flamethrower",
    damagePerFrame: 2,
    radius: 1.2,
    cost: 150,
    color: "red",
  },
];

export const updateTowers = (towers: Tower[], enemies: Enemy[]) => {
  towers.forEach(tower => {
    tower.isFiring = false;
    const enemiesInReach: Enemy[] = [];
    enemies.forEach(enemy => {
      if (areColliding(tower, enemy)) {
        enemiesInReach.push(enemy);
      }
    });
    enemiesInReach.sort((a, b) => a.id - b.id);
    if (enemiesInReach.length) {
      tower.isFiring = true;
      const { damagePerFrame } = tower;
      const target = enemiesInReach[0];
      target.isUnderFire = true;
      target.health -= damagePerFrame;
    }
  });
};

export const renderTowers = (towers: Tower[]) => {
  towers.forEach(tower => {
    const { position, isFiring } = tower;
    const { x, y } = position;
    CTX.fillStyle = tower.color;
    CTX.fillRect(x * TILE_SIZE + 10, y * TILE_SIZE + 10, TILE_SIZE - 20, TILE_SIZE - 20);
    if (isFiring) {
      CTX.fillStyle = "white";
      CTX.beginPath();
      CTX.arc(x * TILE_SIZE + 0.5 * TILE_SIZE, y * TILE_SIZE + 0.5 * TILE_SIZE, 5, 0, 2 * Math.PI);
      CTX.fill();
    }
  });
};

export const renderActiveTowerUI = (tower: Tower) => {
  if (!tower) {
    return;
  }
  const { position, radius } = tower;
  CTX.fillStyle = "rgba(255,255,255,.1)";
  CTX.beginPath();
  CTX.arc(
    position.x * TILE_SIZE + 0.5 * TILE_SIZE,
    position.y * TILE_SIZE + 0.5 * TILE_SIZE,
    radius * TILE_SIZE,
    0,
    2 * Math.PI,
  );
  CTX.fill();
};

export const renderConstructionUI = () => {
  const { displayPreview, blueprint } = construction;
  if (!blueprint) {
    return;
  }
  const { cost, color, radius } = blueprint;
  const { position } = mouse;
  const { value } = money;
  if (
    displayPreview &&
    position &&
    getValueAtPosition(position, level01.map) === 0 &&
    cost <= value
  ) {
    CTX.fillStyle = "rgba(255,255,255,.1)";
    CTX.beginPath();
    CTX.arc(
      position.x * TILE_SIZE + 0.5 * TILE_SIZE,
      position.y * TILE_SIZE + 0.5 * TILE_SIZE,
      radius * TILE_SIZE,
      0,
      2 * Math.PI,
    );
    CTX.fill();

    CTX.fillStyle = color;
    CTX.fillRect(
      position.x * TILE_SIZE + 10,
      position.y * TILE_SIZE + 10,
      TILE_SIZE - 20,
      TILE_SIZE - 20,
    );
  }
  if (cost > value) {
    construction.hidePreview();
  }
};

export const towers: Tower[] = [];
