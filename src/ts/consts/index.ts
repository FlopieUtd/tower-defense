import { level01 } from "../levels";
import { getUniquePosition } from "../utils";

export const CANVAS = document.querySelector("canvas");
export const CTX = CANVAS.getContext("2d");
export const SPAWN_LOCATION = getUniquePosition(level01.map, 2);
export const HEADQUARTERS = getUniquePosition(level01.map, 3);
export const TILE_SIZE = 50;
export const STARTING_MONEY = 200;
export const STARTING_HQ_HEALTH = 20;

export const WAVE_NUM_DIV: HTMLElement = document.querySelector(".wave-num");
export const COIN_NUM_DIV: HTMLElement = document.querySelector(".coin-num");
export const FAST_FORWARD_DIV: HTMLElement = document.querySelector(".fast-forward");
export const BOTTOM_BAR_DIV: HTMLElement = document.querySelector(".bottom-bar");
export const TOOLTIP_DIV: HTMLElement = document.querySelector(".tooltip");
export const TOOLTIP_CONTENT_DIV: HTMLElement = document.querySelector(".tooltip-content");
