import { Instance, types } from "mobx-state-tree";

export const EnemyBlueprint = types.model({
  type: types.string,
  color: types.string,
  originalHealth: types.number,
  radius: types.number,
  reward: types.number,
  speed: types.number,
  intervalInTicks: types.number,
});

export type EnemyBlueprint = Instance<typeof EnemyBlueprint>;
