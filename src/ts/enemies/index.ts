import { CTX, HEADQUARTERS, TILE_SIZE } from "../consts";
import { PositionType } from "../state/models/Position"; // eslint-disable-line
import { store } from "../state/RootStore";
import { arePositionsEqual, breadthFirstSearch, move } from "../utils";

import { uuid } from "uuidv4";
import { enemies } from "../state/v2/Enemies";
import { Enemy } from "../state/v2/Enemy"; // eslint-disable-line
import { EnemyBlueprint } from "../state/v2/EnemyBlueprint"; // eslint-disable-line

export type Route = Position[];

export type EnemyType = "normal" | "heavy";

const callNextWave = () => {
  const { game } = store;
  const { currentWave, setCurrentWave, level } = game;
  if (currentWave < level.waves.length - 1) {
    setCurrentWave(currentWave + 1);
  }
};

export const spawnEnemy = (enemyBlueprint: EnemyBlueprint, spawnLocation: PositionType) => {
  const { game } = store;
  const { level } = game;
  const newEnemy = {
    ...enemyBlueprint,
    id: uuid(),
    isUnderFire: false,
    position: { x: spawnLocation.x, y: spawnLocation.y },
    health: enemyBlueprint.originalHealth,
    route: breadthFirstSearch({
      end: HEADQUARTERS,
      map: level.map,
      start: { x: spawnLocation.x, y: spawnLocation.y },
    }),
  };
  enemies.push(newEnemy);
};
//
export const spawnEnemies = () => {
  const { engine, game } = store;
  const { tick, waveTick, incrementWaveTick } = engine;
  const { currentWave, level } = game;
  if (tick % 30 === 0) {
    if (level.waves[currentWave]) {
      const wave = level.waves[currentWave];
      wave.forEach(subWave => {
        if (subWave.amount) {
          subWave.decreaseAmount();
          const blueprint = enemyBlueprints.find(enemy => enemy.type === subWave.type);
          spawnEnemy(blueprint, subWave.spawnLocation);
        }
      });
    }
  }
  if (level.waves[currentWave].every(subWave => subWave.amount < 1)) {
    incrementWaveTick();
    if (waveTick > 1 && waveTick % 1200 === 0) {
      callNextWave();
    }
  }
};

export const updateEnemies = (enemies: Enemy[]) => {
  enemies.forEach(enemy => {
    const { position, route, health, reward, speed } = enemy;
    const { game } = store;
    const { increaseMoneyBy, decreaseHealth, currentWave, level } = game;
    if (health <= 0) {
      increaseMoneyBy(reward);
    }
    if (arePositionsEqual(position, HEADQUARTERS)) {
      decreaseHealth();
    }
    if (arePositionsEqual(position, HEADQUARTERS) || health <= 0) {
      enemies.splice(enemies.indexOf(enemy), 1);
      if (currentWave === level.waves.length - 1 && enemies.length === 0) {
        // console.log("game won!");
      }
      return null;
    }
    if (arePositionsEqual(position, route[0])) {
      route.shift();
    }

    enemy.position = move(position, route[0], speed);
    enemy.isUnderFire = false;
  });
};

export const renderEnemies = (enemies: Enemy[]) => {
  enemies.forEach(enemy => {
    const { position, isUnderFire, health, originalHealth, color } = enemy;
    CTX.fillStyle = isUnderFire ? "white" : color;
    CTX.beginPath();
    CTX.arc(
      position.x * TILE_SIZE + 0.5 * TILE_SIZE,
      position.y * TILE_SIZE + 0.5 * TILE_SIZE,
      5,
      0,
      2 * Math.PI,
    );
    CTX.fill();
    if (health / originalHealth < 1) {
      // Health bar background
      CTX.fillStyle = "black";
      CTX.fillRect(position.x * TILE_SIZE + 17.5, position.y * TILE_SIZE + 35, 15, 2);

      // Health bar foreground
      CTX.fillStyle = "lime";
      CTX.fillRect(
        position.x * TILE_SIZE + 17.5,
        position.y * TILE_SIZE + 35,
        15 * (health / originalHealth),
        2,
      );
    }
  });
};

export const enemyBlueprints: EnemyBlueprint[] = [
  {
    type: "normal",
    color: "red",
    radius: 0.05,
    originalHealth: 75,
    reward: 2,
    speed: 2.5,
    intervalInTicks: 5,
  },
  {
    type: "heavy",
    color: "pink",
    radius: 0.05,
    originalHealth: 150,
    reward: 3,
    speed: 2,
    intervalInTicks: 25,
  },
];
