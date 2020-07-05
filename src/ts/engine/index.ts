import { CANVAS, TILE_SIZE } from "../consts";
import { renderEnemies } from "../enemies/render";
import { spawnEnemies, updateEnemies } from "../enemies/update";
import { levels } from "../levels";
import { renderBuildings, renderMap } from "../levels/render";
import { construction } from "../state/Construction";
import { engine, Screen } from "../state/Engine";
import { game } from "../state/Game";
import { Level } from "../state/Level";
import { user } from "../state/User";
import { renderActiveTowerUI, renderConstructionUI, renderTowers } from "../towers/render";
import { updateTowers } from "../towers/update";
import { handleEscape, registerEventHandlers } from "./event_handlers";

import { PositionType } from "../levels/types";
import { research } from "../state/Research";
import { towerBlueprints } from "../towers/blueprints";

import { researchTypes } from "../research";

const checkGameState = (health: number) => {
  if (health <= 0) {
    const { setActiveScreen } = engine;
    handleEscape();
    setActiveScreen(Screen.Lose);
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
  renderBuildings(level.map);
  renderTowers(towers);
  renderEnemies(enemies);
  renderConstructionUI();
  renderActiveTowerUI(activeTower);
};

const timestamp = () =>
  window.performance && window.performance.now ? window.performance.now() : new Date().getTime();

// eslint-disable-next-line
let last = timestamp();
let delta = 0;

export const frame = () => {
  const { isPaused, isFastForward, activeScreen } = engine;
  const { health } = game;
  const now = timestamp();
  const step = isFastForward ? 1 / 240 : 1 / 60;
  delta = delta + Math.min(1, (now - last) / 1000);
  while (delta > step) {
    delta = delta - step;
    if (!isPaused && activeScreen === Screen.Game) {
      update();
    }
  }
  last = now;

  render();
  checkGameState(health);
  if (activeScreen === Screen.Game) {
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
  const { resetTicks, setIsFastForward, setIsGameStarted } = engine;

  resetTowers();
  resetEnemies();

  setIsGameStarted(false);
  setIsFastForward(false);
  setCurrentWave(0);
  resetHealth();
  resetTicks();
};

export const instantiateResearch = () => {
  const researchObject = researchTypes.reduce((a, b) => ((a[b.name] = 0), a), {});
  const rootResearchObject = towerBlueprints.reduce(
    (a, b) => ((a[b.type] = researchObject), a),
    {},
  );
  research.setResearch(rootResearchObject);
  console.log("research instantiated!", rootResearchObject);
};

export const startLevel = (level: Level) => {
  const { startingMoney } = level;
  const { setCurrentWave, setMoney, setLevel } = game;
  const { setActiveScreen } = engine;

  instantiateResearch();

  resetGameState();

  setLevel(level);
  setCurrentWave(0);
  setMoney(startingMoney);

  setActiveScreen(Screen.Game);

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

export const callNextWave = () => {
  const { currentWaveGroup, setCurrentWave, level } = game;
  if (currentWaveGroup < level.waves.length - 1) {
    setCurrentWave(currentWaveGroup + 1);
  }
};

export const handleGameWon = () => {
  const { setActiveScreen } = engine;
  handleEscape();
  setActiveScreen(Screen.Win);
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

export const getDistanceBetweenPositions = (positionA: PositionType, positionB: PositionType) =>
  Math.abs(positionA.x !== positionB.x ? positionB.x - positionA.x : positionB.y - positionA.y);

export const checkForGameWin = () => {
  const { currentWaveGroup, level, enemies } = game;
  if (currentWaveGroup === level.waves.length - 1 && enemies.length === 0 && game.health > 0) {
    handleGameWon();
  }
};
