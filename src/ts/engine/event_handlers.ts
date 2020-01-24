import { TILE_SIZE } from "../consts";
import { construction } from "../state/v2/Construction";
import { engine } from "../state/v2/Engine";
import { game } from "../state/v2/Game";
import { mouse } from "../state/v2/Mouse";
import { TowerBlueprint } from "../state/v2/TowerBlueprint"; // eslint-disable-line
import { constructTower, towerBlueprints } from "../towers";
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
  const { offsetX, offsetY } = event;
  const currentTile = {
    x: Math.floor(offsetX / TILE_SIZE),
    y: Math.floor(offsetY / TILE_SIZE),
  };
  mouse.setPosition(currentTile);
};

export const handleEscape = () => {
  const { setIsVisible, setActiveTower } = construction;
  setIsVisible(false);
  setActiveTower(null);
};

const handleMouseClick = () => {
  const { position } = mouse;
  const { blueprint, isVisible, setIsVisible, setActiveTower } = construction;
  const { level, towers, decreaseMoneyBy } = game;

  // Set active tower click
  if (getValueAtPosition(position, level.map) === 5) {
    const tower = towers.find(tower => arePositionsEqual(tower.position, position));
    setIsVisible(false);
    setActiveTower(tower);
    return;
  }

  // Idle click
  if (getValueAtPosition(position, level.map) !== 0 || !isVisible || !blueprint) {
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
  const { isFastForward, setIsFastForward, isPaused, setIsPaused } = engine;
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
};

export const registerEventHandlers = () => {
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("click", handleMouseClick);
  document.addEventListener("keydown", handleKeyDown);
};
