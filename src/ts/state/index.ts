import { COIN_NUM_DIV, WAVE_NUM_DIV } from "../consts";
import { level01 } from "../levels";
// eslint-disable-next-line
import { Position } from "../levels";
// eslint-disable-next-line
import { renderActiveTowerUI, Tower, TowerBlueprint, towers } from "../towers";
import { renderToolTip } from "../ui";
import { arePositionsEqual } from "../utils";

export const tick = {
  value: 0,
  waveTick: 0,
  increase() {
    return this.value++;
  },
  increaseWaveTick() {
    return this.waveTick++;
  },
};

export const id = {
  value: 0,
  get() {
    return this.value++;
  },
};

export const money = {
  value: null,
  set(amount: number) {
    this.value = amount;
    this.updateUI();
  },
  increaseBy(amount: number) {
    this.value += amount;
    this.updateUI();
  },
  decreaseBy(amount: number) {
    this.value -= amount;
    this.updateUI();
  },
  updateUI() {
    COIN_NUM_DIV.innerHTML = this.value.toString();
  },
};

export const hqHealth = {
  value: null,
  set(amount: number) {
    this.value = amount;
  },
  decrease() {
    this.value--;
  },
};

export const waves = {
  value: null,
  set(amount: number) {
    this.value = amount;
    this.updateUI();
  },
  increase() {
    this.value++;
    this.updateUI();
  },
  updateUI() {
    WAVE_NUM_DIV.innerHTML = `${(this.value + 1).toString()} / ${level01.waves.length}`;
  },
};

export interface Construction {
  displayPreview: boolean;
  position: Position | null;
  blueprint: TowerBlueprint | null;
  showPreview: () => void;
  hidePreview: () => void;
  setPosition: (position: Position) => void;
  setBlueprint: (blueprint: TowerBlueprint) => void;
}

export const construction: Construction = {
  displayPreview: false,
  position: null,
  blueprint: null,
  showPreview() {
    this.displayPreview = true;
  },
  hidePreview() {
    this.displayPreview = false;
  },
  setPosition(position: Position) {
    this.position = position;
  },
  setBlueprint(blueprint: TowerBlueprint | null) {
    this.blueprint = blueprint;
  },
};

export const mouse = {
  position: null,
  setPosition(position: Position | null) {
    this.position = position;
  },
};

export const game = {
  isPaused: false,
  isFastForward: false,
  isGameOver: false,
  togglePaused() {
    this.isPaused = !this.isPaused;
  },
  toggleFastForward() {
    this.isFastForward = !this.isFastForward;
  },
  setGameOver(bool: boolean) {
    this.isGameOver = bool;
  },
};

export const activeTower = {
  value: null,
  set(position: Position | null) {
    this.value = position
      ? towers.find(tower => arePositionsEqual(tower.position, position))
      : null;
    console.log("floops");
    renderToolTip();
  },
};
