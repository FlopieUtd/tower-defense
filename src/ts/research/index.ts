import { Tower } from "../state/Tower";
import { user } from "../state/User";

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
    effects: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
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

export const getDamagePerShot = (tower: Tower) => {
  const { research } = user;
  const { damagePerShot } = tower;
  const { effect } = research[tower.type].damage;
  const additionalDamage = (damagePerShot * effect) / 100;
  return damagePerShot + additionalDamage;
};

export const getReloadSpeed = (tower: Tower) => {
  const { research } = user;
  const { effect } = research[tower.type]["fire-rate"];
  return 1 - effect / 100;
};

export const getRange = (tower: Tower) => {
  const { research } = user;
  const { radius } = tower;
  const { effect } = research[tower.type].range;
  console.log(radius, effect);
  return radius;
};
