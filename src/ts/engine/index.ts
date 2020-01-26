import { CANVAS, TILE_SIZE } from "../consts";
import { renderEnemies, spawnEnemies, updateEnemies } from "../enemies";
import { levelCreator, levels, renderBuildings, renderMap } from "../levels"; // eslint-disable-line
import { construction } from "../state/Construction";
import { enemies } from "../state/Enemy";
import { engine } from "../state/Engine";
import { game } from "../state/Game";
import { Level } from "../state/Level"; // eslint-disable-line
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
    return [1, 1, 1];
  }
  if (health >= 12) {
    return [1, 1, 0];
  }
  if (health >= 6) {
    return [1, 0, 0];
  }
  return [0, 0, 0];
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
  const { activeLevel } = engine;
  renderMap(levels[activeLevel].map);
  renderTowers(towers);
  renderEnemies(enemies);
  renderConstructionUI();
  renderActiveTowerUI(activeTower);
  renderBuildings(levels[activeLevel].map);
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
  const { activeLevel } = engine;
  canvas.width = levels[activeLevel].map[0].length * TILE_SIZE;
  canvas.style.width = `${levels[activeLevel].map[0].length * TILE_SIZE}px`;
  canvas.height = levels[activeLevel].map.length * TILE_SIZE;
  canvas.style.height = `${levels[activeLevel].map.length * TILE_SIZE}px`;
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
  const { setCurrentWave, setMoney, setLevel, resetTowers } = game;
  const { setIsGameOver, setIsGameWon } = engine;

  setLevel(level);
  setCurrentWave(0);
  setMoney(startingMoney);
  resetTowers();

  setIsGameOver(false);
  setIsGameWon(false);

  requestAnimationFrame(frame);
};

export const restartLevel = (level: Level) => {
  resetGameState();
  startLevel(level);
};

export const initializeGame = () => {
  initializeCanvas(CANVAS);
  registerEventHandlers();
  startLevel(levelCreator(1));
};
