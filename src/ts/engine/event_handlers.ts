import { callNextWaveForRewardInSeconds, startGame } from ".";
import { TILE_SIZE } from "../consts";
import { construction } from "../state/Construction";
import { engine, Screen } from "../state/Engine";
import { game } from "../state/Game";
import { mouse } from "../state/Mouse";
import { TowerBlueprint } from "../state/TowerBlueprint";
import { towerBlueprints } from "../towers/blueprints";
import { constructTower } from "../towers/update";
import { arePositionsEqual, getValueAtPosition } from "../utils";

import { getPrice } from "../research/effects";

export const handleConstructionPreview = (blueprint: TowerBlueprint) => {
  const { setBlueprint, setIsVisible, setActiveTower } = construction;
  const { money } = game;
  setActiveTower(null);
  if (blueprint.price <= money) {
    setBlueprint(blueprint);
    setIsVisible(true);
  }
};

const handleMouseMove = (event: MouseEvent) => {
  const element = event.target as HTMLElement;
  if (element.className === "root") {
    const { offsetX, offsetY } = event;
    const currentTile = {
      x: Math.floor(offsetX / TILE_SIZE),
      y: Math.floor(offsetY / TILE_SIZE),
    };
    mouse.setPosition(currentTile);
  } else {
    mouse.setPosition(null);
  }
};

export const handleLoseFocus = () => {
  const { setIsVisible, setActiveTower } = construction;
  setIsVisible(false);
  setActiveTower(null);
};

export const handleEscape = () => {
  const { isPaused, setIsPaused, activeScreen } = engine;
  if (activeScreen === Screen.Game) {
    const { isVisible, activeTower } = construction;
    if (!isVisible && !activeTower) {
      setIsPaused(!isPaused);
    } else {
      handleLoseFocus();
    }
  }
};

const handleMouseClick = () => {
  const { position } = mouse;
  const { activeScreen } = engine;
  const { blueprint, isVisible, setIsVisible, setActiveTower } = construction;
  const { level, towers, setMoney, money } = game;

  if (!position || activeScreen === Screen.Menu) {
    return;
  }
  // Set active tower click
  if (getValueAtPosition(position, level.map) === 5) {
    const tower = towers.find(tower => arePositionsEqual(tower.position, position));
    setIsVisible(false);
    setActiveTower(tower);
    return;
  }

  // Idle click
  if (getValueAtPosition(position, level.map) !== 6 || !isVisible || !blueprint) {
    handleLoseFocus();
    return;
  }

  // Construction click
  setMoney(money - getPrice(blueprint));
  constructTower(blueprint);

  construction.setPosition(null);
};

const handleKeyDown = (e: KeyboardEvent) => {
  const {
    isFastForward,
    setIsFastForward,
    isPaused,
    setIsPaused,
    activeScreen,
    nextWaveInNSeconds,
  } = engine;

  const { currentWaveNumber } = game;

  if (e.key === "Escape") {
    handleEscape();
  }
  if (e.key === "f") {
    setIsFastForward(!isFastForward);
  }
  if (e.key === "p") {
    setIsPaused(!isPaused);
  }
  if (isFinite(Number(e.key))) {
    const index = Number(e.key) - 1;
    if (towerBlueprints[index]) {
      handleConstructionPreview(towerBlueprints[index]);
    }
  }
  if (e.code === "Space") {
    if (activeScreen === Screen.Game) {
      if (nextWaveInNSeconds !== 0 && !!currentWaveNumber) {
        callNextWaveForRewardInSeconds();
      }
      if (currentWaveNumber === 0) {
        startGame();
      }
    }
  }
};

export const registerEventHandlers = () => {
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("click", handleMouseClick);
  document.addEventListener("keydown", handleKeyDown);
};
