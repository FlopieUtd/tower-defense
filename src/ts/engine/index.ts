import { CANVAS, TILE_SIZE } from "../consts";
import { renderEnemies, spawnEnemies, updateEnemies } from "../enemies";
import { level01, renderBuildings, renderMap } from "../levels"; // eslint-disable-line
import { construction } from "../state/v2/Construction";
import { enemies } from "../state/v2/Enemy";
import { engine } from "../state/v2/Engine";
import { game } from "../state/v2/Game";
import { Level } from "../state/v2/Level";
import { renderActiveTowerUI, renderConstructionUI, renderTowers, updateTowers } from "../towers";
import { handleEscape, registerEventHandlers } from "./event_handlers";

const checkGameState = (health: number) => {
  if (health <= 0) {
    const { setIsGameOver } = engine;
    handleEscape();
    setIsGameOver(true);
  }
};

export const getStars = (health: number) => {
  if (health === 20) {
    return 3;
  }
  if (health >= 12) {
    return 2;
  }
  if (health >= 6) {
    return 1;
  }
  return 0;
};

const update = () => {
  const { incrementTick } = engine;
  const { towers } = game;
  incrementTick();
  spawnEnemies();
  updateEnemies(enemies);
  updateTowers(towers, enemies);
};

const render = () => {
  const { activeTower } = construction;
  const { towers } = game;
  renderMap(level01.map);
  renderTowers(towers);
  renderEnemies(enemies);
  renderConstructionUI();
  renderActiveTowerUI(activeTower);
  renderBuildings(level01.map);
};

const timestamp = () =>
  window.performance && window.performance.now ? window.performance.now() : new Date().getTime();

// eslint-disable-next-line
let last = timestamp();
let delta = 0;

export const frame = () => {
  const { isPaused, isFastForward, isGameOver } = engine;
  const { health } = game;
  const now = timestamp();
  const step = isFastForward ? 1 / 240 : 1 / 60;
  delta = delta + Math.min(1, (now - last) / 1000);
  while (delta > step) {
    delta = delta - step;
    if (!isPaused && !isGameOver) {
      update();
    }
  }
  last = now;

  render();
  checkGameState(health);
  if (!isGameOver) {
    requestAnimationFrame(frame);
  }
};

const initializeCanvas = canvas => {
  canvas.width = level01.map[0].length * TILE_SIZE;
  canvas.style.width = `${level01.map[0].length * TILE_SIZE}px`;
  canvas.height = level01.map.length * TILE_SIZE;
  canvas.style.height = `${level01.map.length * TILE_SIZE}px`;
};

export const resetGameState = () => {
  const { resetHealth, setCurrentWave } = game;
  const { resetTicks, setIsFastForward } = engine;

  setIsFastForward(false);
  setCurrentWave(0);
  resetHealth();
  resetTicks();
};

export const startLevel = (level: Level) => {
  const { startingMoney } = level;
  const { setCurrentWave, setMoney, setLevel } = game;
  const { setIsGameOver } = engine;

  setLevel(level);
  setCurrentWave(0);
  setMoney(startingMoney);
  setIsGameOver(false);

  requestAnimationFrame(frame);
};

export const restartLevel = (level: Level) => {
  resetGameState();
  startLevel(level);
};

export const initializeGame = () => {
  initializeCanvas(CANVAS);
  registerEventHandlers();
  startLevel(new Level(level01));
};
