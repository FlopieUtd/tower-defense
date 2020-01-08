import { frame } from ".";
import { CANVAS, FAST_FORWARD_DIV, TILE_SIZE } from "../consts";
import { level01 } from "../levels";
import { activeTower, construction, game, id, money, mouse } from "../state";
// eslint-disable-next-line
import { TowerBlueprint, towerBlueprints, towers } from "../towers";
import { getValueAtPosition } from "../utils";

const handleFastForwardToggle = () => {
  game.toggleFastForward();
  FAST_FORWARD_DIV.innerHTML = game.isFastForward ? ">" : ">>";
};

const handleConstructionPreview = (blueprint: TowerBlueprint) => {
  activeTower.set(null);
  if (blueprint.cost <= money.value) {
    construction.setBlueprint(blueprint);
    construction.showPreview();
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

const handleMouseLeave = () => {
  mouse.setPosition(null);
};

export const handleEscape = () => {
  construction.hidePreview();
  activeTower.set(null);
};

const handleMouseClick = () => {
  const { position } = mouse;
  const { blueprint, displayPreview } = construction;

  // Set active tower click
  if (getValueAtPosition(position, level01.map) === 4) {
    construction.hidePreview();
    activeTower.set(position);
    return;
  }

  // Idle click
  if (getValueAtPosition(position, level01.map) !== 0 || !displayPreview || !blueprint) {
    handleEscape();
    return;
  }

  // Construction click
  const { cost } = blueprint;
  money.decreaseBy(cost);
  level01.map[position.y][position.x] = 4;
  towers.push({
    ...blueprint,
    id: id.get(),
    position,
    isFiring: false,
  });

  construction.setPosition(null);
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "p") {
    game.togglePaused();
    requestAnimationFrame(frame);
  }
  if (e.key === "f") {
    handleFastForwardToggle();
  }
  if (e.key === "Escape") {
    handleEscape();
  }
  if (isFinite(Number(e.key))) {
    const index = Number(e.key) - 1;
    if (towerBlueprints[index]) {
      handleConstructionPreview(towerBlueprints[index]);
    }
  }
};

export const registerEventHandlers = () => {
  CANVAS.addEventListener("mousemove", handleMouseMove);
  CANVAS.addEventListener("mouseleave", handleMouseLeave);
  CANVAS.addEventListener("click", handleMouseClick);
  document.addEventListener("keydown", handleKeyDown);
  FAST_FORWARD_DIV.addEventListener("click", handleFastForwardToggle);
  towerBlueprints.forEach(tower => {
    document.querySelector(`.tower-slot.${tower.type}`).addEventListener("click", () => {
      handleConstructionPreview(tower);
    });
  });
};
