import { Tower } from "../state/Tower";
import { user } from "../state/User";

import { TowerBlueprint } from "../state/TowerBlueprint";
import { getDamagePerShot, getFireRate, getRange } from "./effects";

export interface ResearchType {
  name: string;
  label: string;
}

export const researchTypes = [
  {
    name: "damage",
    label: "Damage",
    effects: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
    type: "increase",
  },
  {
    name: "fire-rate",
    label: "Fire rate",
    effects: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
    type: "increase",
  },
  {
    name: "range",
    label: "Range",
    effects: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
    type: "increase",
  },
  {
    name: "rotation-speed",
    label: "Rotation speed",
    effects: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
    type: "increase",
  },
  {
    name: "price",
    label: "Price",
    effects: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    type: "decrease",
  },
];

export const researchCosts = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];

export const addResearchEffects = (tower: Tower) => {
  tower.damagePerShot = getDamagePerShot(tower);
  tower.fireRate = getFireRate(tower);
  tower.radius = getRange(tower);
};
