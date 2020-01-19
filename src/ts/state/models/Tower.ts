import { Instance, types } from "mobx-state-tree"; // eslint-disable-line
import { Position, PositionType } from "./Position"; // eslint-disable-line
import { TowerBlueprint } from "./TowerBlueprint";

export const Tower = types
  .compose(
    TowerBlueprint,
    types.model({
      id: types.identifier,
      position: Position,
      isFiring: false,
      ticksUntilNextShot: types.number,
    }),
  )
  .actions(self => ({
    setPosition(position: PositionType) {
      self.position = position;
    },
    setIsFiring(value: boolean) {
      self.isFiring = value;
    },
    setTicksUntilNextShot(value: number) {
      self.ticksUntilNextShot = value;
    },
    decrementTicksUntilNextshot() {
      self.ticksUntilNextShot--;
    },
  }));

export type Tower = Instance<typeof Tower>;
