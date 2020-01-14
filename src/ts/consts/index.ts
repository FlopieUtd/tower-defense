import { level01 } from "../levels";
import { getUniquePosition } from "../utils";

export const CANVAS = document.querySelector("canvas");
export const CTX = CANVAS.getContext("2d");
export const SPAWN_LOCATION1 = getUniquePosition(level01.map, 2);
export const SPAWN_LOCATION2 = getUniquePosition(level01.map, 3);
export const HEADQUARTERS = getUniquePosition(level01.map, 4);
export const TILE_SIZE = 50;
