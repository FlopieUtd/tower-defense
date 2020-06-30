import { TILE_SIZE } from "../consts";
import { construction } from "../state/Construction";
import { engine, Screen } from "../state/Engine";
import { game } from "../state/Game";
import { mouse } from "../state/Mouse";
import { TowerBlueprint } from "../state/TowerBlueprint";
import { towerBlueprints } from "../towers/blueprints";
import { constructTower } from "../towers/update";
import { arePositionsEqual, getValueAtPosition } from "../utils";

export const handleConstructionPreview = (blueprint: TowerBlueprint) => {
  const { setBlueprint, setIsVisible, setActiveTower } = construction;
  const { money } = game;
  setActiveTower(null);
  if (blueprint.cost <= money) {
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

export const handleEscape = () => {
  const { setIsVisible, setActiveTower } = construction;
  setIsVisible(false);
  setActiveTower(null);
};

const handleMouseClick = () => {
  const { position } = mouse;
  const { activeScreen } = engine;
  const { blueprint, isVisible, setIsVisible, setActiveTower } = construction;
  const { level, towers, decreaseMoneyBy } = game;

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
    handleEscape();
    return;
  }

  // Construction click
  const { cost } = blueprint;
  decreaseMoneyBy(cost);
  constructTower(blueprint);

  construction.setPosition(null);
};

const handleKeyDown = (e: KeyboardEvent) => {
  const {
    isFastForward,
    setIsFastForward,
    isPaused,
    setIsPaused,
    setIsGameStarted,
    callNextWave,
    activeScreen,
    nextWaveInNSeconds,
  } = engine;
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
      setIsGameStarted(true);
      if (nextWaveInNSeconds !== 0) {
        callNextWave();
      }
    }
  }
};

export const registerEventHandlers = () => {
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("click", handleMouseClick);
  document.addEventListener("keydown", handleKeyDown);
};
