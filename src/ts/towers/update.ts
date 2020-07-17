import { uuid } from "uuidv4";
import { TILE_SIZE } from "../consts";
import { Enemy } from "../state/Enemy";
import { game } from "../state/Game";
import { mouse } from "../state/Mouse";
import { Tower } from "../state/Tower";
import { TowerBlueprint } from "../state/TowerBlueprint";
import { areColliding, clamp } from "../utils";

import { addResearchEffects } from "../research";

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
    let enemiesInReach: Enemy[] = [];
    if (tower.ticksUntilNextShot > 0) {
      decrementTicksUntilNextshot();
    }
    enemies.forEach(enemy => {
      if (areColliding(tower, enemy)) {
        enemiesInReach = [...enemiesInReach, enemy];
      }
    });

    const targetableEnemies = enemiesInReach.filter(enemy =>
      tower.targets.includes(enemy.movement),
    );

    // The array is copied before sorting
    // eslint-disable-next-line fp/no-mutating-methods
    const sortedTargetableEnemies = [...targetableEnemies].sort(
      (a, b) => a.route.length - b.route.length,
    );

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
    const targetBarrelDifference =
      typeof targetAngle === "number" ? Math.abs(targetAngle - barrelAngle) : null;

    if (sortedTargetableEnemies.length) {
      const target = sortedTargetableEnemies[0];
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

      const targetPositionWithDeviation = {
        x: target.position.x + target.deviation.x / TILE_SIZE,
        y: target.position.y + target.deviation.y / TILE_SIZE,
      };

      setTargetPosition(targetPositionWithDeviation);
    } else {
      setTargetPosition(null);
    }
  });
};

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
  const newTower = new Tower(tower);
  const newTowerWithResearchEffects = addResearchEffects(newTower);
  addTower(new Tower(newTowerWithResearchEffects));
};
