import { uuid } from "uuidv4";
import { CTX, TILE_SIZE } from "../consts";
import { PositionType, renderConstructionTile } from "../levels"; // eslint-disable-line
import { construction } from "../state/Construction";
import { Enemy } from "../state/Enemy"; // eslint-disable-line
import { game } from "../state/Game";
import { mouse } from "../state/Mouse";
import { Tower } from "../state/Tower"; // eslint-disable-line
import { TowerBlueprint } from "../state/TowerBlueprint"; // eslint-disable-line
import { areColliding, clamp, getValueAtPosition } from "../utils";

export type TowerType = "turret" | "flamethrower";

export const towerBlueprints: TowerBlueprint[] = [
  {
    type: "turret",
    damagePerShot: 50,
    shootsEveryNthTick: 50,
    radius: 1.5,
    cost: 50,
    colors: ["#008A7B", "#4DB5AC"],
    armorPiercing: false,
    targets: ["air", "ground"],
    rotationSpeed: 4,
    barrelWidth: 4,
    barrelLength: 10,
  },
  {
    type: "flamethrower",
    damagePerShot: 1.6,
    shootsEveryNthTick: 1,
    radius: 1.2,
    cost: 60,
    colors: ["#E53734", "#E37370"],
    armorPiercing: false,
    targets: ["ground"],
    rotationSpeed: 4,
    barrelWidth: 4,
    barrelLength: 8,
  },
  {
    type: "sniper",
    damagePerShot: 250,
    shootsEveryNthTick: 150,
    radius: 3,
    cost: 80,
    colors: ["#49A550", "#7DC584"],
    armorPiercing: false,
    targets: ["ground"],
    rotationSpeed: 8,
    barrelWidth: 3,
    barrelLength: 12,
  },
  {
    type: "canon",
    damagePerShot: 400,
    shootsEveryNthTick: 150,
    radius: 2,
    cost: 100,
    colors: ["#2086E4", "#64B5F5"],
    armorPiercing: true,
    targets: ["ground"],
    rotationSpeed: 3,
    barrelWidth: 5,
    barrelLength: 12,
  },
  {
    type: "anti-air",
    damagePerShot: 50,
    shootsEveryNthTick: 20,
    radius: 2,
    cost: 60,
    colors: ["#0EBBBF", "#4DD0E1"],
    armorPiercing: false,
    targets: ["air"],
    rotationSpeed: 4,
    barrelWidth: 6,
    barrelLength: 6,
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
    const {
      setIsFiring,
      decrementTicksUntilNextshot,
      setTicksUntilNextShot,
      setTargetPosition,
      targetPosition,
      barrelAngle,
      setBarrelAngle,
      position,
      rotationSpeed,
      setTargetAngle,
      targetAngle,
    } = tower;

    const { x, y } = position;

    setIsFiring(false);
    const enemiesInReach: Enemy[] = [];
    if (tower.ticksUntilNextShot > 0) {
      decrementTicksUntilNextshot();
    }
    enemies.forEach(enemy => {
      if (areColliding(tower, enemy)) {
        enemiesInReach.push(enemy);
      }
    });
    const targetableEnemies = enemiesInReach.filter(enemy =>
      tower.targets.includes(enemy.movement),
    );
    targetableEnemies.sort((a, b) => a.route.length - b.route.length);

    // Turn barrel
    if (targetPosition) {
      let targetAngle = (Math.atan2(targetPosition.y - y, targetPosition.x - x) * 180) / Math.PI;
      if (targetAngle < 0) {
        targetAngle = 360 - Math.abs(targetAngle);
      }
      setTargetAngle(targetAngle);
      const difference = targetAngle - barrelAngle;

      const clampedDifference = clamp(difference, -rotationSpeed, rotationSpeed);
      setBarrelAngle(barrelAngle + clampedDifference);
      if (difference < -180) {
        setBarrelAngle(barrelAngle - 360);
      }
      if (difference > 180) {
        setBarrelAngle(barrelAngle + 360);
      }
    } else {
      setTargetAngle(null);
    }

    const targetBarrelDifference = targetAngle ? Math.abs(targetAngle - barrelAngle) : null;

    if (targetableEnemies.length) {
      const target = targetableEnemies[0];
      if (
        tower.ticksUntilNextShot === 0 &&
        typeof targetBarrelDifference === "number" &&
        targetBarrelDifference < 1 &&
        targetPosition
      ) {
        setTicksUntilNextShot(tower.shootsEveryNthTick);
        setIsFiring(true);
        const { damagePerShot } = tower;
        target.isUnderFire = true;
        target.health -= damagePerShot;
      }
      setTargetPosition(target.position);
    } else {
      setTargetPosition(null);
    }
  });
};

export const renderTowers = (towers: Tower[]) => {
  towers.forEach(tower => {
    const { position } = tower;

    renderConstructionTile(position);
    renderTower(tower);
  });
};

export const renderTower = (tower: Tower) => {
  const { position, targetPosition, isFiring, barrelAngle, barrelWidth, barrelLength } = tower;
  const { x, y } = position;

  CTX.fillStyle = tower.colors[0];
  CTX.fillRect(x * TILE_SIZE + 10, y * TILE_SIZE + 10, TILE_SIZE - 20, TILE_SIZE - 20);

  CTX.fillStyle = tower.colors[1];
  CTX.beginPath();
  CTX.arc(x * TILE_SIZE + 0.5 * TILE_SIZE, y * TILE_SIZE + 0.5 * TILE_SIZE, 5, 0, 2 * Math.PI);
  CTX.fill();

  if (isFiring) {
    CTX.beginPath();
    CTX.strokeStyle = "white";
    CTX.lineWidth = 1;
    CTX.moveTo(x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2);
    CTX.lineTo(
      targetPosition.x * TILE_SIZE + TILE_SIZE / 2,
      targetPosition.y * TILE_SIZE + TILE_SIZE / 2,
    );
    CTX.stroke();
  }

  // Barrel
  CTX.beginPath();
  CTX.moveTo(x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2);
  CTX.lineTo(
    x * TILE_SIZE + TILE_SIZE / 2 + barrelLength * Math.cos((Math.PI * barrelAngle) / 180),
    y * TILE_SIZE + TILE_SIZE / 2 + barrelLength * Math.sin((Math.PI * barrelAngle) / 180),
  );
  CTX.strokeStyle = tower.colors[1];
  CTX.lineWidth = barrelWidth;
  CTX.stroke();
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
  const { cost, radius } = blueprint;
  const { position } = mouse;
  if (isVisible && position && getValueAtPosition(position, level.map) === 6 && cost <= money) {
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

    renderTower(new Tower({ ...blueprint, position }));
  }
  if (cost > money) {
    construction.setIsVisible(false);
  }
};
