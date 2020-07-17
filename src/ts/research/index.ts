import { Tower } from "../state/Tower";
import { user } from "../state/User";

import { TowerBlueprint } from "../state/TowerBlueprint";

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
  const getDamagePerShot = (tower: Tower) => {
    const { research } = user;
    const { damagePerShot } = tower;
    const { effect } = research[tower.type].damage;
    const additionalDamage = (damagePerShot * effect) / 100;
    return damagePerShot + additionalDamage;
  };

  const getFireRate = (tower: Tower) => {
    const { research } = user;
    const { fireRate } = tower;
    const { effect } = research[tower.type]["fire-rate"];
    const additionalFireRate = (fireRate * effect) / 100;
    return fireRate + additionalFireRate;
  };

  const getRange = (tower: Tower) => {
    const { research } = user;
    const { radius } = tower;
    const { effect } = research[tower.type].range;
    const additionalRange = (radius * effect) / 100;
    return radius + additionalRange;
  };

  return {
    ...tower,
    damagePerShot: getDamagePerShot(tower),
    fireRate: getFireRate(tower),
    radius: getRange(tower),
  };
};

export const getPrice = (tower: TowerBlueprint) => {
  const { research } = user;
  const { price } = tower;
  const { effect } = research[tower.type].price;
  const priceReduction = price * (effect / 100);
  return price - priceReduction;
};
