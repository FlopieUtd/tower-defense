import { CTX, TILE_SIZE } from "../consts";
import { arePositionsEqual, breadthFirstSearch, getUniquePosition } from "../utils";

import { uuid } from "uuidv4";
import { getStars } from "../engine";
import { handleEscape } from "../engine/event_handlers";
import { PositionType } from "../levels"; // eslint-disable-line
import { Enemy } from "../state/Enemy"; // eslint-disable-line
import { EnemyBlueprint } from "../state/EnemyBlueprint"; // eslint-disable-line
import { engine } from "../state/Engine";
import { game } from "../state/Game";
import { user } from "../state/User";

export type Route = PositionType[];

export type EnemyType = "runner" | "heavy";

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
  const {
    isGameStarted,
    tick,
    waveTick,
    incrementWaveTick,
    resetTicks,
    isGameWon,
    isGameOver,
  } = engine;
  const { currentWaveGroup, level } = game;
  if (level.waves[currentWaveGroup]) {
    const waveGroup = level.waves[currentWaveGroup];
    waveGroup.forEach(wave => {
      const { intervalInTicks } = wave;
      if (isGameStarted && tick % intervalInTicks === 0) {
        if (wave.amount) {
          wave.decreaseAmount();
          const blueprint = enemyBlueprints.find(enemy => enemy.type === wave.type);
          spawnEnemy(blueprint, wave.spawnLocation);
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
      if (!isGameOver && !isGameWon) {
        callNextWave();
      }
    }
  }
};

export const handleGameWon = () => {
  const { setIsGameStarted, setIsGameWon } = engine;
  handleEscape();
  setIsGameStarted(false);
  setIsGameWon(true);
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

const move = (current: PositionType, next: PositionType, speed: number) => {
  const moveSpeed = speed / 100;
  if (current.x < next.x) {
    return { x: Number((current.x += moveSpeed).toFixed(4)), y: current.y };
  }
  if (current.x > next.x) {
    return { x: Number((current.x -= moveSpeed).toFixed(4)), y: current.y };
  }
  if (current.y < next.y) {
    return { x: current.x, y: Number((current.y += moveSpeed).toFixed(4)) };
  }
  if (current.y > next.y) {
    return { x: current.x, y: Number((current.y -= moveSpeed).toFixed(4)) };
  }
};

const getDistanceBetweenPositions = (positionA: PositionType, positionB: PositionType) =>
  Math.abs(positionA.x !== positionB.x ? positionB.x - positionA.x : positionB.y - positionA.y);

const checkForGameWin = () => {
  const { currentWaveGroup, level, enemies } = game;
  if (currentWaveGroup === level.waves.length - 1 && enemies.length === 0 && game.health > 0) {
    handleGameWon();
  }
};

const removeEnemy = (enemy: Enemy) => {
  const { enemies } = game;
  enemies.splice(enemies.indexOf(enemy), 1);
};

export const updateEnemies = (enemies: Enemy[]) => {
  enemies.forEach(enemy => {
    const { position, route, health, reward, speed } = enemy;
    const { increaseMoneyBy, decreaseHealth, level } = game;

    if (health <= 0) {
      increaseMoneyBy(reward);
    }

    if (arePositionsEqual(position, getUniquePosition(level.map, 4))) {
      decreaseHealth();
    }

    if (arePositionsEqual(position, getUniquePosition(level.map, 4)) || health <= 0) {
      removeEnemy(enemy);
      checkForGameWin();
      return null;
    }

    if (arePositionsEqual(enemy.position, route[0])) {
      route.shift();
    }

    const distanceToNextPosition = getDistanceBetweenPositions(position, route[0]);

    if (distanceToNextPosition > speed / 100) {
      enemy.position = move(position, route[0], speed);
    } else {
      if (!route[1]) {
        decreaseHealth();
        removeEnemy(enemy);
        checkForGameWin();
        return null;
      }

      const excessMovement = speed - distanceToNextPosition;
      enemy.position = move(route[0], route[1], excessMovement);
      route.shift();
    }

    enemy.isUnderFire = false;
  });
};

export const renderEnemies = (enemies: Enemy[]) => {
  enemies.forEach(enemy => {
    const { position, isUnderFire, health, originalHealth, color, radius } = enemy;
    CTX.fillStyle = isUnderFire ? "white" : color;
    CTX.beginPath();
    CTX.arc(
      position.x * TILE_SIZE + 0.5 * TILE_SIZE,
      position.y * TILE_SIZE + 0.5 * TILE_SIZE,
      radius * 100,
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
    type: "runner",
    color: "red",
    radius: 0.045,
    originalHealth: 100,
    reward: 2,
    speed: 2.4,
    intervalInTicks: 20,
    movement: "ground",
  },
  {
    type: "heavy",
    color: "pink",
    radius: 0.05,
    originalHealth: 250,
    reward: 3,
    speed: 1.8,
    intervalInTicks: 50,
    movement: "ground",
  },
];
