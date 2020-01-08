import { BOTTOM_BAR_DIV, TILE_SIZE, TOOLTIP_CONTENT_DIV, TOOLTIP_DIV } from "../consts";
import { activeTower } from "../state";
import { towerBlueprints } from "../towers";

export const initializeUI = () => {
  towerBlueprints.forEach(tower => {
    BOTTOM_BAR_DIV.innerHTML += `<div class='tower-slot ${tower.type}'><div class="preview" style="background: ${tower.color}"/></div>`;
  });
};

export const clearTooltip = () => {
  TOOLTIP_CONTENT_DIV.innerHTML = "";
};

export const renderTooltipLine = (line: string) => {
  TOOLTIP_CONTENT_DIV.innerHTML += `${line}<br />`;
};

export const renderToolTip = () => {
  clearTooltip();
  TOOLTIP_DIV.style.display = "none";
  if (!activeTower.value) {
    return;
  }
  TOOLTIP_DIV.style.display = "block";
  const { position } = activeTower.value;
  TOOLTIP_DIV.style.left = `${(position.x + 1) * TILE_SIZE}px`;
  TOOLTIP_DIV.style.top = `${(position.y + 2) * TILE_SIZE}px`;
  renderTooltipLine(activeTower.value.type);
  renderTooltipLine(`damage: ${activeTower.value.damagePerFrame * 16}`);
  renderTooltipLine(`range: ${activeTower.value.radius * 10}`);
  renderTooltipLine(`fire rate: constant`);
};
