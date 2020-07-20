import { uuid } from "uuidv4";
import { TILE_SIZE } from "../consts";
import { checkForGameWin, getDistanceBetweenPositions, startNextWave } from "../engine";
import { Enemy } from "../state/Enemy";
import { EnemyBlueprint } from "../state/EnemyBlueprint";
import { engine, Screen } from "../state/Engine";
import { game } from "../state/Game";
import { Level } from "../state/Level";
import { arePositionsEqual, breadthFirstSearch, getUniquePosition } from "../utils";
import { enemyBlueprints } from "./blueprints";

import { PositionType } from "../levels/types";

const ADDITIONAL_HEALTH_PER_WAVE_IN_PERCENTS = 5;

const removeEnemy = (enemy: Enemy) => {
  const { enemies, setEnemies } = game;
  setEnemies(enemies.filter(e => e !== enemy));
};

export const enemyReachedHq = (enemyPosition: PositionType, level: Level) =>
  arePositionsEqual(enemyPosition, getUniquePosition(level.map, 4));

export const updateEnemies = (enemies: Enemy[]) => {
  enemies.forEach(enemy => {
    const { position, route, setRoute, health, reward, speed, drops } = enemy;
    const { increaseMoneyBy, decreaseHealth, level } = game;
    if (health <= 0) {
      increaseMoneyBy(reward);
    }

    if (enemyReachedHq(position, level)) {
      decreaseHealth();
      removeEnemy(enemy);
      checkForGameWin();
      return null;
    }

    if (health <= 0) {
      drops.forEach(drop => {
        const blueprint = enemyBlueprints.find(enemy => enemy.type === drop);
        spawnEnemy(blueprint, [...route], position);
      });
      removeEnemy(enemy);
      checkForGameWin();
      return null;
    }

    if (arePositionsEqual(enemy.position, route[0])) {
      setRoute(route.slice(1, route.length));
    }
    const distanceToNextPosition = getDistanceBetweenPositions(position, route[0]);
    const moveDistance = speed / 100;

    if (distanceToNextPosition > moveDistance) {
      enemy.position = move(position, route[0], moveDistance);
    } else {
      // Enemy reaches HQ
      if (!route[1]) {
        decreaseHealth();
        removeEnemy(enemy);
        checkForGameWin();
        return null;
      }

      const excessMovement = Number((moveDistance - distanceToNextPosition).toFixed(3));
      enemy.position = move(route[0], route[1], excessMovement);

      setRoute(route.slice(1, route.length));
    }

    enemy.isUnderFire = false;
  });
};

export const move = (current: PositionType, next: PositionType, moveDistance: number) => {
  if (current.x < next.x) {
    return { x: Number((current.x + moveDistance).toFixed(3)), y: current.y };
  }
  if (current.x > next.x) {
    return { x: Number((current.x - moveDistance).toFixed(3)), y: current.y };
  }
  if (current.y < next.y) {
    return { x: current.x, y: Number((current.y + moveDistance).toFixed(3)) };
  }
  if (current.y > next.y) {
    return { x: current.x, y: Number((current.y - moveDistance).toFixed(3)) };
  }
};

export const spawnEnemies = () => {
  const { isGameStarted, tick, waveTick, incrementWaveTick, resetTicks, activeScreen } = engine;
  const { currentWaveGroup, level } = game;
  if (level.waves[currentWaveGroup]) {
    const waveGroup = level.waves[currentWaveGroup];
    waveGroup.forEach(wave => {
      const { intervalInTicks } = wave;
      if (isGameStarted && tick % intervalInTicks === 0) {
        if (wave.amount) {
          wave.decreaseAmount();
          const blueprint = enemyBlueprints.find(enemy => enemy.type === wave.type);

          const route = breadthFirstSearch({
            end: getUniquePosition(level.map, 4),
            map: level.map,
            start: getUniquePosition(level.map, wave.spawnLocation),
          });

          spawnEnemy(blueprint, route, getUniquePosition(level.map, wave.spawnLocation));
        }
      }
    });
  }
  if (
    // All enemies in the current wave are spawned
    level.waves[currentWaveGroup].every(wave => wave.amount < 1) &&
    // There is a next wave
    level.waves[currentWaveGroup + 1]
  ) {
    incrementWaveTick();
    if (waveTick > 1 && waveTick % 1200 === 0) {
      resetTicks();
      if (activeScreen === Screen.Game) {
        startNextWave();
      }
    }
  }
};

export const spawnEnemy = (
  enemyBlueprint: EnemyBlueprint,
  route: PositionType[],
  position: PositionType,
) => {
  const { addEnemy, currentWaveGroup } = game;
  const additionalHealth =
    (currentWaveGroup * ADDITIONAL_HEALTH_PER_WAVE_IN_PERCENTS * enemyBlueprint.originalHealth) /
    100;
  const newEnemy = {
    ...enemyBlueprint,
    id: uuid(),
    isUnderFire: false,
    position,
    health: enemyBlueprint.originalHealth + additionalHealth,
    route,
    deviation: {
      x: Math.floor(Math.random() * (TILE_SIZE / 2) - TILE_SIZE / 4),
      y: Math.floor(Math.random() * (TILE_SIZE / 2) - TILE_SIZE / 4),
    },
  };
  addEnemy(new Enemy(newEnemy));
};
