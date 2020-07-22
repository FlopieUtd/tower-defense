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
  const { setHealth, setCurrentWaveNumber, setTowers, setEnemies } = game;
  const { resetTicks, setIsFastForward } = engine;

  setTowers([]);
  setEnemies([]);

  setIsFastForward(false);
  setCurrentWaveNumber(0);
  setHealth(20);
  resetTicks();
};

export const instantiateResearch = () => {
  const { setResearch } = user;

  const researchObject = researchTypes.reduce(
    (a, b) => ((a[b.name] = { level: 0, effect: 0 }), a),
    {},
  );
  const rootResearchObject = towerBlueprints.reduce(
    (a, b) => ((a[b.type] = researchObject), a),
    {},
  );
  setResearch(rootResearchObject);
};

export const startLevel = (level: Level) => {
  const { startingMoney } = level;
  const { setCurrentWaveNumber, setMoney, setLevel } = game;
  const { setActiveScreen } = engine;

  resetGameState();

  setLevel(level);
  setCurrentWaveNumber(0);
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
  const { currentWaveNumber, setCurrentWaveNumber, level } = game;

  if (currentWaveNumber < level.waves.length) {
    setCurrentWaveNumber(currentWaveNumber + 1);
  }
  const levelStatus = {
    levelNumber: game.level.levelNumber,
    isUnlocked: true,
    wavesWon: game.defeatedWaveNumber,
  };
  user.awardCredits(levelStatus);
  user.setLevelStatus(levelStatus);
  user.syncUserWithLocalStorage();
};

export const handleGameOver = () => {
  const { setActiveScreen } = engine;
  const { setCurrentWaveNumber } = game;

  setCurrentWaveNumber(0);
  handleEscape();
  const levelStatus = {
    levelNumber: game.level.levelNumber,
    isUnlocked: true,
    wavesWon: game.defeatedWaveNumber,
  };
  user.awardCredits(levelStatus);
  user.setLevelStatus(levelStatus);
  user.syncUserWithLocalStorage();
  setActiveScreen(Screen.GameOver);
};

export const handleGameWon = () => {
  const { setActiveScreen } = engine;
  const { setCurrentWaveNumber } = game;

  setCurrentWaveNumber(0);
  handleEscape();
  const levelStatus = {
    levelNumber: game.level.levelNumber,
    isUnlocked: true,
    wavesWon: game.defeatedWaveNumber,
  };
  user.awardCredits(levelStatus);
  user.setLevelStatus(levelStatus);
  user.syncUserWithLocalStorage();
  setActiveScreen(Screen.GameWon);
};

export const getDistanceBetweenPositions = (positionA: PositionType, positionB: PositionType) =>
  Math.abs(positionA.x !== positionB.x ? positionB.x - positionA.x : positionB.y - positionA.y);

export const checkForGameWin = () => {
  const { currentWaveNumber, level, enemies } = game;

  if (currentWaveNumber === level.waves.length && enemies.length === 0 && game.health > 0) {
    handleGameWon();
  }
};

export const checkForGameOver = () => {
  const { activeScreen } = engine;
  const { health } = game;

  if (health <= 0 && activeScreen !== Screen.GameOver) {
    const { setActiveScreen } = engine;
    setActiveScreen(Screen.GameOver);
    handleEscape();
    handleGameOver();
  }
};

export const callNextWaveForRewardInSeconds = () => {
  const { startNextWave, nextWaveInNSeconds } = engine;
  const { setMoney, money } = game;

  setMoney(money + nextWaveInNSeconds);
  startNextWave();
};

export const startGame = () => {
  const { setCurrentWaveNumber, setDefeatedWaveNumber } = game;
  setDefeatedWaveNumber(0);
  setCurrentWaveNumber(1);
};
