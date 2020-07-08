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
import { towerBlueprints } from "../towers/blueprints";

import { researchTypes } from "../research";

const checkGameState = (health: number) => {
  const { activeScreen } = engine;
  if (health <= 0 && activeScreen !== Screen.GameOver) {
    const { setActiveScreen } = engine;
    setActiveScreen(Screen.GameOver);
    handleEscape();
    handleGameOver();
  }
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
  const { setResearch } = user;
  const researchObject = researchTypes.reduce((a, b) => ((a[b.name] = 0), a), {});
  const rootResearchObject = towerBlueprints.reduce(
    (a, b) => ((a[b.type] = researchObject), a),
    {},
  );
  setResearch(rootResearchObject);
};

export const startLevel = (level: Level) => {
  const { startingMoney } = level;
  const { setCurrentWave, setMoney, setLevel } = game;
  const { setActiveScreen } = engine;

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
  if (!user.research) {
    instantiateResearch();
  }
};

export const startNextWave = () => {
  const { currentWaveGroup, setCurrentWave, level } = game;
  if (currentWaveGroup < level.waves.length - 1) {
    setCurrentWave(currentWaveGroup + 1);
  }
};

export const handleGameOver = () => {
  handleEscape();
  const levelStatus = {
    levelNumber: game.level.levelNumber,
    isUnlocked: true,
    wavesWon: game.currentWaveGroup,
  };
  user.awardCredits(levelStatus);
  user.setLevelStatus(levelStatus);
  user.syncUserWithLocalStorage();
};

export const getDistanceBetweenPositions = (positionA: PositionType, positionB: PositionType) =>
  Math.abs(positionA.x !== positionB.x ? positionB.x - positionA.x : positionB.y - positionA.y);

export const checkForGameWin = () => {
  const { currentWaveGroup, level, enemies } = game;
  if (currentWaveGroup === level.waves.length - 1 && enemies.length === 0 && game.health > 0) {
    handleGameOver();
  }
};

export const callNextWaveForRewardInSeconds = () => {
  const { startNextWave, nextWaveInNSeconds } = engine;
  const { increaseMoneyBy } = game;
  increaseMoneyBy(nextWaveInNSeconds);
  startNextWave();
};
