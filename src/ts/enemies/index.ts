import { CTX, HEADQUARTERS, SPAWN_LOCATION, TILE_SIZE } from "../consts";
import { finishLevel } from "../engine";
// eslint-disable-next-line
import { level01, Position } from "../levels";
import { hqHealth, id, money, tick, waves } from "../state";
// eslint-disable-next-line
import { Color } from "../towers";
import { arePositionsEqual, breadthFirstSearch, getUniquePosition, move } from "../utils";

export type Route = Position[];

export type EnemyType = "normal" | "heavy";

export interface EnemyBlueprint {
  type: EnemyType;
  color: Color;
  originalHealth: number;
  health: number;
  radius: number;
  reward: number;
  speed: number;
  intervalInTicks: number;
}

export interface Enemy extends EnemyBlueprint {
  id: number;
  position: Position;
  route: Route;
  isUnderFire: boolean;
}

const callNextWave = () => {
  if (waves.value < level01.waves.length - 1) {
    waves.increase();
  }
};

export const spawnEnemy = (enemyBlueprint: EnemyBlueprint) => {
  activeEnemies.push({
    ...enemyBlueprint,
    id: id.get(),
    isUnderFire: false,
    position: getUniquePosition(level01.map, 2),
    route: breadthFirstSearch({
      end: HEADQUARTERS,
      map: level01.map,
      start: SPAWN_LOCATION,
    }),
  });
};

export const spawnEnemies = () => {
  if (tick.value % 30 === 0) {
    if (level01.waves[waves.value]) {
      if (level01.waves[waves.value].amount) {
        level01.waves[waves.value].amount--;
        const blueprint = enemyBlueprints.find(
          enemy => enemy.type === level01.waves[waves.value].type,
        );
        spawnEnemy(blueprint);
      }
    }
  }
  if (level01.waves[waves.value].amount < 1) {
    tick.increaseWaveTick();
    if (tick.waveTick % 1200 === 0) {
      callNextWave();
      tick.waveTick = 0;
    }
  }
};

export const updateEnemies = (enemies: Enemy[]) => {
  enemies.forEach(enemy => {
    const { position, route, health, reward, speed } = enemy;
    if (health <= 0) {
      money.increaseBy(reward);
    }
    if (arePositionsEqual(position, HEADQUARTERS)) {
      hqHealth.decrease();
    }
    if (arePositionsEqual(position, HEADQUARTERS) || health <= 0) {
      enemies.splice(enemies.indexOf(enemy), 1);
      if (waves.value === level01.waves.length - 1 && enemies.length === 0) {
        finishLevel();
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
    health: 75,
    reward: 2,
    speed: 2.5,
    intervalInTicks: 30,
  },
  {
    type: "heavy",
    color: "pink",
    radius: 0.05,
    originalHealth: 150,
    health: 150,
    reward: 3,
    speed: 2,
    intervalInTicks: 25,
  },
];
export const activeEnemies: Enemy[] = [];
