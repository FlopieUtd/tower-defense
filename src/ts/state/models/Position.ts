import { Instance, types } from "mobx-state-tree"; // eslint-disable-line

export const Position = types.model({
  x: types.number,
  y: types.number,
});

export type PositionType = Instance<typeof Position>;
