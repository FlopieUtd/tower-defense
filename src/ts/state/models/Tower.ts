import { Instance, types } from "mobx-state-tree";
import { Position } from "./Position";
import { TowerBlueprint } from "./TowerBlueprint";

export const Tower = types.compose(
  TowerBlueprint,
  types.model({ id: types.identifier, position: Position, isFiring: false }),
);

export type Tower = Instance<typeof Tower>;
