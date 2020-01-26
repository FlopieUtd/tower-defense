import { levels } from "../levels";
import { engine } from "../state/Engine";
import { getUniquePosition } from "../utils";

const { activeLevel } = engine;

export const CANVAS = document.querySelector("canvas");
export const CTX = CANVAS.getContext("2d");
export const SPAWN_LOCATION1 = getUniquePosition(levels[activeLevel].map, 2);
export const SPAWN_LOCATION2 = getUniquePosition(levels[activeLevel].map, 3);
export const HEADQUARTERS = getUniquePosition(levels[activeLevel].map, 4);
export const TILE_SIZE = 50;
