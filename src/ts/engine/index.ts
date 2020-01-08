import { CANVAS, STARTING_HQ_HEALTH, STARTING_MONEY, TILE_SIZE } from "../consts";
import { activeEnemies, renderEnemies, spawnEnemies, updateEnemies } from "../enemies";
import { level01, renderBuildings, renderMap } from "../levels";
import { activeTower, game, hqHealth, money, tick, waves } from "../state";
import {
  renderActiveTowerUI,
  renderConstructionUI,
  renderTowers,
  towers,
  updateTowers,
} from "../towers";
import { initializeUI } from "../ui";
import { registerEventHandlers } from "./event_handlers";

const checkGameState = () => {
  if (hqHealth.value <= 0) {
    // tslint:disable-next-line
    console.log("game over!");
    game.setGameOver(true);
  }
};

export const finishLevel = () => {
  // tslint:disable-next-line
  console.log("level won!");
};

const update = () => {
  tick.increase();
  spawnEnemies();
  updateEnemies(activeEnemies);
  updateTowers(towers, activeEnemies);
};

const render = () => {
  renderMap(level01.map);
  renderTowers(towers);
  renderEnemies(activeEnemies);
  renderConstructionUI();
  renderActiveTowerUI(activeTower.value);
  renderBuildings(level01.map);
};

const timestamp = () =>
  window.performance && window.performance.now ? window.performance.now() : new Date().getTime();

// eslint-disable-next-line
let last = timestamp();
let delta = 0;

export const frame = () => {
  const now = timestamp();
  const step = game.isFastForward ? 1 / 240 : 1 / 60;
  delta = delta + Math.min(1, (now - last) / 1000);
  while (delta > step) {
    delta = delta - step;
    if (!game.isPaused && !game.isGameOver) {
      update();
    }
  }
  last = now;

  render();
  checkGameState();
  if (!game.isGameOver) {
    requestAnimationFrame(frame);
  }
};

const initializeCanvas = canvas => {
  canvas.width = level01.map[0].length * TILE_SIZE;
  canvas.style.width = `${level01.map[0].length * TILE_SIZE}px`;
  canvas.height = level01.map.length * TILE_SIZE;
  canvas.style.height = `${level01.map.length * TILE_SIZE}px`;
};

export const startGame = () => {
  initializeCanvas(CANVAS);
  initializeUI();
  registerEventHandlers();

  money.set(STARTING_MONEY);
  hqHealth.set(STARTING_HQ_HEALTH);
  waves.set(0);

  requestAnimationFrame(frame);
};
