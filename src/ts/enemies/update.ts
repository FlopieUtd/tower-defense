import { uuid } from "uuidv4";
import { TILE_SIZE } from "../consts";
import {
  checkForGameOver,
  checkForGameWin,
  getDistanceBetweenPositions,
  startNextWave,
} from "../engine";
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

const checkIfWaveIsDefeated = (enemy: Enemy) => {
  const { enemies, setDefeatedWaveNumber } = game;
  if (enemies.filter(e => e.waveNumber === enemy.waveNumber).length === 0) {
    setDefeatedWaveNumber(enemy.waveNumber);
  }
};

const removeEnemyWithSideEffects = (enemy: Enemy) => {
  removeEnemy(enemy);
  checkIfWaveIsDefeated(enemy);
  checkForGameWin();
  checkForGameOver();
};

export const enemyReachedHq = (enemyPosition: PositionType, level: Level) =>
  arePositionsEqual(enemyPosition, getUniquePosition(level.map, 4));

export const updateEnemies = (enemies: Enemy[]) => {
  enemies.forEach(enemy => {
    const { position, route, setRoute, health, reward, speed, drops, damage } = enemy;
    const { setMoney, money, setHealth, health: hqHealth, level } = game;
    // Enemy is defeated
    if (health <= 0) {
      setMoney(money + reward);
      drops.forEach(drop => {
        const blueprint = enemyBlueprints.find(enemy => enemy.type === drop);
        spawnEnemy(blueprint, [...route], position);
      });
      removeEnemyWithSideEffects(enemy);
      return null;
    }

    // Enemy reached HQ
    if (enemyReachedHq(position, level)) {
      setHealth(Math.max(hqHealth - damage, 0));
      removeEnemyWithSideEffects(enemy);
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
        setHealth(hqHealth - damage);
        removeEnemyWithSideEffects(enemy);
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
  const { tick, waveTick, incrementWaveTick, resetTicks, activeScreen } = engine;
  const { currentWaveNumber, level } = game;
  if (level.waves[currentWaveNumber - 1]) {
    const wave = level.waves[currentWaveNumber - 1];
    wave.forEach(subWave => {
      const { intervalInTicks } = subWave;
      if (!!currentWaveNumber && tick % intervalInTicks === 0) {
        if (subWave.amount) {
          subWave.decreaseAmount();
          const blueprint = enemyBlueprints.find(enemy => enemy.type === subWave.type);

          const route = breadthFirstSearch({
            end: getUniquePosition(level.map, 4),
            map: level.map,
            start: getUniquePosition(level.map, subWave.spawnLocation),
          });

          spawnEnemy(blueprint, route, getUniquePosition(level.map, subWave.spawnLocation));
        }
      }
    });
    if (
      // All enemies in the current wave are spawned
      level.waves[currentWaveNumber - 1].every(wave => wave.amount < 1) &&
      // There is a next wave
      level.waves[currentWaveNumber]
    ) {
      incrementWaveTick();
      if (waveTick > 1 && waveTick % 1200 === 0) {
        resetTicks();
        if (activeScreen === Screen.Game) {
          startNextWave();
        }
      }
    }
  }
};

export const spawnEnemy = (
  enemyBlueprint: EnemyBlueprint,
  route: PositionType[],
  position: PositionType,
) => {
  const { setEnemies, enemies, currentWaveNumber } = game;
  const additionalHealth =
    ((currentWaveNumber - 1) *
      ADDITIONAL_HEALTH_PER_WAVE_IN_PERCENTS *
      enemyBlueprint.originalHealth) /
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
    waveNumber: currentWaveNumber,
  };
  setEnemies([...enemies, new Enemy(newEnemy)]);
};
