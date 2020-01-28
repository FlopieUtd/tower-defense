import { CTX, TILE_SIZE } from "../consts";
import { arePositionsEqual, breadthFirstSearch, getUniquePosition, move } from "../utils";

import { uuid } from "uuidv4";
import { getStars } from "../engine";
import { handleEscape } from "../engine/event_handlers";
import { levels, PositionType } from "../levels"; // eslint-disable-line
import { Enemy } from "../state/Enemy"; // eslint-disable-line
import { EnemyBlueprint } from "../state/EnemyBlueprint"; // eslint-disable-line
import { engine } from "../state/Engine";
import { game } from "../state/Game";
import { user } from "../state/User";

export type Route = PositionType[];

export type EnemyType = "normal" | "heavy";

const callNextWave = () => {
  const { currentWaveGroup, setCurrentWave, level } = game;
  if (currentWaveGroup < level.waves.length - 1) {
    setCurrentWave(currentWaveGroup + 1);
  }
};

export const spawnEnemy = (enemyBlueprint: EnemyBlueprint, spawnLocation: number) => {
  const { level, addEnemy } = game;
  const newEnemy = {
    ...enemyBlueprint,
    id: uuid(),
    isUnderFire: false,
    position: getUniquePosition(level.map, spawnLocation),
    health: enemyBlueprint.originalHealth,
    route: breadthFirstSearch({
      end: getUniquePosition(level.map, 4),
      map: level.map,
      start: getUniquePosition(level.map, spawnLocation),
    }),
  };
  addEnemy(newEnemy);
};

export const spawnEnemies = () => {
  const { tick, waveTick, incrementWaveTick } = engine;
  const { currentWaveGroup, level } = game;
  if (tick % 30 === 0) {
    if (level.waves[currentWaveGroup]) {
      const waveGroup = level.waves[currentWaveGroup];
      waveGroup.forEach(wave => {
        if (wave.amount) {
          wave.decreaseAmount();
          const blueprint = enemyBlueprints.find(enemy => enemy.type === wave.type);
          spawnEnemy(blueprint, wave.spawnLocation);
        }
      });
    }
  }
  if (level.waves[currentWaveGroup].every(wave => wave.amount < 1)) {
    incrementWaveTick();
    if (waveTick > 1 && waveTick % 1200 === 0) {
      callNextWave();
    }
  }
};

export const handleGameWon = () => {
  handleEscape();
  engine.setIsGameWon(true);
  game.setStarsWon(getStars(game.health));
  const levelStatus = {
    levelNumber: game.level.levelNumber,
    isUnlocked: true,
    isGameWon: true,
    stars: game.starsWon,
  };
  user.awardMoney(levelStatus);
  user.setLevelStatus(levelStatus);
  user.syncUserWithLocalStorage();
};

export const updateEnemies = (enemies: Enemy[]) => {
  enemies.forEach(enemy => {
    const { position, route, health, reward, speed } = enemy;
    const { increaseMoneyBy, decreaseHealth, currentWaveGroup, level } = game;
    if (health <= 0) {
      increaseMoneyBy(reward);
    }
    if (arePositionsEqual(position, getUniquePosition(level.map, 4))) {
      decreaseHealth();
    }
    if (arePositionsEqual(position, getUniquePosition(level.map, 4)) || health <= 0) {
      enemies.splice(enemies.indexOf(enemy), 1);
      if (currentWaveGroup === level.waves.length - 1 && enemies.length === 0 && game.health > 0) {
        handleGameWon();
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
