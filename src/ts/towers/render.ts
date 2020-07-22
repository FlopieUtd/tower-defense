import { CTX, TILE_SIZE } from "../consts";
import { renderConstructionTile } from "../levels/render";
import { getPrice, getRange } from "../research/effects";
import { construction } from "../state/Construction";
import { game } from "../state/Game";
import { mouse } from "../state/Mouse";
import { Tower } from "../state/Tower";
import { getValueAtPosition } from "../utils";

export const renderTowers = (towers: Tower[]) => {
  towers.forEach(tower => {
    const { position } = tower;

    renderConstructionTile(position);
    renderTower(tower);
  });
};

export const renderTower = (tower: Tower) => {
  const { position, targetPosition, isFiring, barrelAngle, barrelWidth, barrelLength } = tower;
  const { x, y } = position;

  CTX.fillStyle = tower.colors[0];
  CTX.fillRect(x * TILE_SIZE + 10, y * TILE_SIZE + 10, TILE_SIZE - 20, TILE_SIZE - 20);

  CTX.fillStyle = tower.colors[1];
  CTX.beginPath();
  CTX.arc(x * TILE_SIZE + 0.5 * TILE_SIZE, y * TILE_SIZE + 0.5 * TILE_SIZE, 5, 0, 2 * Math.PI);
  CTX.fill();

  if (isFiring) {
    CTX.beginPath();
    CTX.strokeStyle = "white";
    CTX.lineWidth = 1;
    CTX.moveTo(x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2);
    CTX.lineTo(
      targetPosition.x * TILE_SIZE + TILE_SIZE / 2,
      targetPosition.y * TILE_SIZE + TILE_SIZE / 2,
    );
    CTX.stroke();
  }

  // Barrel
  CTX.beginPath();
  CTX.moveTo(x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2);
  CTX.lineTo(
    x * TILE_SIZE + TILE_SIZE / 2 + barrelLength * Math.cos((Math.PI * barrelAngle) / 180),
    y * TILE_SIZE + TILE_SIZE / 2 + barrelLength * Math.sin((Math.PI * barrelAngle) / 180),
  );
  CTX.strokeStyle = tower.colors[1];
  CTX.lineWidth = barrelWidth;
  CTX.stroke();
};

export const renderActiveTowerUI = (tower: Tower) => {
  if (!tower) {
    return;
  }
  const { position, radius } = tower;
  CTX.fillStyle = "rgba(255,255,255,.1)";
  CTX.beginPath();
  CTX.arc(
    position.x * TILE_SIZE + 0.5 * TILE_SIZE,
    position.y * TILE_SIZE + 0.5 * TILE_SIZE,
    radius * TILE_SIZE,
    0,
    2 * Math.PI,
  );
  CTX.fill();
};

export const renderConstructionUI = () => {
  const { isVisible, blueprint } = construction;
  const { level, money } = game;
  if (!blueprint) {
    return;
  }
  const radiusWithResearchEffect = getRange(blueprint);
  const reducedPrice = getPrice(blueprint);
  const { position } = mouse;
  if (
    isVisible &&
    position &&
    getValueAtPosition(position, level.map) === 6 &&
    reducedPrice <= money
  ) {
    CTX.fillStyle = "rgba(255,255,255,.1)";
    CTX.beginPath();
    CTX.arc(
      position.x * TILE_SIZE + 0.5 * TILE_SIZE,
      position.y * TILE_SIZE + 0.5 * TILE_SIZE,
      radiusWithResearchEffect * TILE_SIZE,
      0,
      2 * Math.PI,
    );
    CTX.fill();

    renderTower(new Tower({ ...blueprint, position }));
  }
  if (reducedPrice > money) {
    construction.setIsVisible(false);
  }
};
