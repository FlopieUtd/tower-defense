import { CANVAS, TILE_SIZE } from "../consts";
import { renderEnemies, spawnEnemies, updateEnemies } from "../enemies";
import { levelCreator, levels, renderBuildings, renderMap } from "../levels"; // eslint-disable-line
import { construction } from "../state/Construction";
import { engine } from "../state/Engine";
import { game } from "../state/Game";
import { Level } from "../state/Level"; // eslint-disable-line
import { renderActiveTowerUI, renderConstructionUI, renderTowers, updateTowers } from "../towers";
import { handleEscape, registerEventHandlers } from "./event_handlers";

const checkGameState = (health: number) => {
  if (health <= 0) {
    const { setIsGameOver, setIsGameStarted } = engine;
    handleEscape();
    setIsGameStarted(false);
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
  const { towers, enemies } = game;
  incrementTick();
  spawnEnemies();
  updateEnemies(enemies);
  updateTowers(towers, enemies);
};

const render = () => {
  const { activeTower } = construction;
  const { towers, level, enemies } = game;
  renderMap(level.map);
  renderTowers(towers);
  renderEnemies(enemies);
  renderConstructionUI();
  renderActiveTowerUI(activeTower);
  renderBuildings(level.map);
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
  const { resetHealth, setCurrentWave, resetTowers, resetEnemies } = game;
  const { resetTicks, setIsFastForward } = engine;

  resetTowers();
  resetEnemies();

  setIsFastForward(false);
  setCurrentWave(0);
  resetHealth();
  resetTicks();
};

export const startLevel = (level: Level) => {
  const { startingMoney } = level;
  const { setCurrentWave, setMoney, setLevel } = game;
  const { setIsGameOver, setIsGameWon, setIsMenuActive } = engine;

  resetGameState();

  setLevel(level);
  setCurrentWave(0);
  setMoney(startingMoney);

  setIsGameOver(false);
  setIsGameWon(false);
  setIsMenuActive(false);

  requestAnimationFrame(frame);
};

export const restartLevel = (level: Level) => {
  startLevel(level);
};

export const initializeGame = () => {
  initializeCanvas(CANVAS);
  registerEventHandlers();
  // startLevel(levelCreator(1));
};
