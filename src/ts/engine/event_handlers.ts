import { TILE_SIZE } from "../consts";
import { level01 } from "../levels";
import { TowerBlueprint } from "../state/models/TowerBlueprint"; // eslint-disable-line
import { store } from "../state/RootStore";
import { towerBlueprints, towers } from "../towers";
import { arePositionsEqual, getValueAtPosition } from "../utils";

const handleConstructionPreview = (blueprint: TowerBlueprint) => {
  const { game, construction } = store;
  const { setBlueprint, setIsVisible, setActiveTower } = construction;
  const { money } = game;
  setActiveTower(null);
  if (blueprint.cost <= money) {
    setBlueprint(blueprint);
    setIsVisible(true);
  }
};

const handleMouseMove = (event: MouseEvent) => {
  const { mouse } = store;
  const { offsetX, offsetY } = event;
  const currentTile = {
    x: Math.floor(offsetX / TILE_SIZE),
    y: Math.floor(offsetY / TILE_SIZE),
  };
  mouse.setPosition(currentTile);
};

export const handleEscape = () => {
  const { construction } = store;
  const { setIsVisible, setActiveTower } = construction;
  setIsVisible(false);
  setActiveTower(null);
};

const handleMouseClick = () => {
  const { mouse, construction } = store;
  const { position } = mouse;
  const { blueprint, isVisible, setIsVisible, setActiveTower } = construction;

  // Set active tower click
  if (getValueAtPosition(position, level01.map) === 5) {
    const { game } = store;
    const { towers } = game;
    const tower = towers.find(tower => arePositionsEqual(tower.position, position));
    setIsVisible(false);
    setActiveTower(tower);
    return;
  }

  // Idle click
  if (getValueAtPosition(position, level01.map) !== 0 || !isVisible || !blueprint) {
    handleEscape();
    return;
  }

  // Construction click
  const { cost } = blueprint;
  const { game } = store;
  const { decreaseMoneyBy } = game;
  decreaseMoneyBy(cost);
  level01.map[position.y][position.x] = 5;
  towers.push({
    ...blueprint,
    id: "todo uidv4",
    position: { x: position.x, y: position.y },
    isFiring: false,
  });

  construction.setPosition(null);
};

const handleKeyDown = (e: KeyboardEvent) => {
  const { engine } = store;
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
