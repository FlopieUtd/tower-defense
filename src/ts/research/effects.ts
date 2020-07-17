import { Tower } from "../state/Tower";
import { TowerBlueprint } from "../state/TowerBlueprint";
import { user } from "../state/User";

export const getPrice = (tower: TowerBlueprint) => {
  const { research } = user;
  const { price } = tower;
  const { effect } = research[tower.type].price;
  const priceReduction = price * (effect / 100);
  return price - priceReduction;
};

export const getDamagePerShot = (tower: Tower) => {
  const { research } = user;
  const { damagePerShot } = tower;
  const { effect } = research[tower.type].damage;
  const additionalDamage = (damagePerShot * effect) / 100;
  return damagePerShot + additionalDamage;
};

export const getFireRate = (tower: Tower) => {
  const { research } = user;
  const { fireRate } = tower;
  const { effect } = research[tower.type]["fire-rate"];
  const additionalFireRate = (fireRate * effect) / 100;
  return fireRate + additionalFireRate;
};

export const getRange = (tower: TowerBlueprint) => {
  const { research } = user;
  const { radius } = tower;
  const { effect } = research[tower.type].range;
  const additionalRange = (radius * effect) / 100;
  return radius + additionalRange;
};
