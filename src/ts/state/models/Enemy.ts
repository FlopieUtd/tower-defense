import { Instance, types } from "mobx-state-tree"; // eslint-disable-line
import { EnemyBlueprint } from "./EnemyBlueprint";
import { Position } from "./Position";

export const Enemy = types.compose(
  EnemyBlueprint,
  types.model({
    id: types.identifier,
    position: Position,
    route: types.array(Position),
    isUnderFire: types.boolean,
    health: types.number,
  }),
);

export type Enemy = Instance<typeof Enemy>;
