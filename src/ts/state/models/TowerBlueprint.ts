import { Instance, types } from "mobx-state-tree"; // eslint-disable-line

export const TowerBlueprint = types.model({
  radius: types.number,
  shootsEveryNthTick: types.number,
  damagePerShot: types.number,
  type: types.string,
  cost: types.number,
  color: types.string,
  armorPiercing: types.boolean,
  targetsGround: types.boolean,
  targetsAir: types.boolean,
});

export type TowerBlueprint = Instance<typeof TowerBlueprint>;
