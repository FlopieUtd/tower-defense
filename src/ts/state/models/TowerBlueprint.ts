import { Instance, types } from "mobx-state-tree";

export const TowerBlueprint = types.model({
  radius: types.number,
  damagePerFrame: types.number,
  type: types.string,
  cost: types.number,
  color: types.string,
});

export type TowerBlueprint = Instance<typeof TowerBlueprint>;
