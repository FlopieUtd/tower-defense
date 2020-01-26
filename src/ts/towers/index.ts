import { uuid } from "uuidv4";
import { CTX, TILE_SIZE } from "../consts";
import { construction } from "../state/Construction";
import { Enemy } from "../state/Enemy"; // eslint-disable-line
import { game } from "../state/Game";
import { mouse } from "../state/Mouse";
import { Tower } from "../state/Tower"; // eslint-disable-line
import { TowerBlueprint } from "../state/TowerBlueprint"; // eslint-disable-line
import { areColliding, getValueAtPosition } from "../utils";

export type TowerType = "turret" | "flamethrower";
export type Color = "blue" | "red" | "pink";

export const towerBlueprints: TowerBlueprint[] = [
  {
    type: "turret",
    damagePerShot: 8,
    shootsEveryNthTick: 8,
    radius: 1.5,
    cost: 100,
    color: "blue",
    armorPiercing: false,
    targetsAir: true,
    targetsGround: true, //
  },
  {
    type: "flamethrower",
    damagePerShot: 2,
    shootsEveryNthTick: 1,
    radius: 1.2,
    cost: 150,
    color: "red",
    armorPiercing: false,
    targetsAir: false,
    targetsGround: true,
  },
  {
    type: "sniper",
    damagePerShot: 150,
    shootsEveryNthTick: 120,
    radius: 3,
    cost: 150,
    color: "cyan",
    armorPiercing: false,
    targetsAir: false,
    targetsGround: true,
  },
  {
    type: "canon",
    damagePerShot: 200,
    shootsEveryNthTick: 120,
    radius: 2,
    cost: 150,
    color: "purple",
    armorPiercing: true,
    targetsAir: false,
    targetsGround: true,
  },
  {
    type: "anti-air",
    damagePerShot: 50,
    shootsEveryNthTick: 20,
    radius: 2,
    cost: 150,
    color: "yellow",
    armorPiercing: false,
    targetsGround: false,
    targetsAir: true,
  },
];

export const constructTower = (blueprint: TowerBlueprint) => {
  const { position } = mouse;
  const { addTower, level } = game;
  level.setValueOnMap(position, 5);
  const ticksUntilNextShot = blueprint.shootsEveryNthTick;
  const tower = {
    ...blueprint,
    id: uuid(),
    position: { x: position.x, y: position.y },
    isFiring: false,
    originalTicksUntilNextShot: ticksUntilNextShot,
    ticksUntilNextShot,
  };
  addTower(new Tower(tower));
};

export const updateTowers = (towers: Tower[], enemies: Enemy[]) => {
  towers.forEach(tower => {
    const { setIsFiring, decrementTicksUntilNextshot, setTicksUntilNextShot } = tower;
    setIsFiring(false);
    const enemiesInReach: Enemy[] = [];
    if (tower.ticksUntilNextShot > 0) {
      decrementTicksUntilNextshot();
    }
    if (tower.ticksUntilNextShot === 0) {
      setTicksUntilNextShot(tower.shootsEveryNthTick);
      enemies.forEach(enemy => {
        if (areColliding(tower, enemy)) {
          enemiesInReach.push(enemy);
        }
      });
      enemiesInReach.sort((a, b) => a.route.length - b.route.length);
      if (enemiesInReach.length) {
        setIsFiring(true);
        const { damagePerShot } = tower;
        const target = enemiesInReach[0];
        target.isUnderFire = true;
        target.health -= damagePerShot;
      }
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
  const { isVisible, blueprint } = construction;
  const { level, money } = game;
  if (!blueprint) {
    return;
  }
  const { cost, color, radius } = blueprint;
  const { position } = mouse;
  if (isVisible && position && getValueAtPosition(position, level.map) === 0 && cost <= money) {
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
  if (cost > money) {
    construction.setIsVisible(false);
  }
};
