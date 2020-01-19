import { types } from "mobx-state-tree";
import { Position, PositionType } from "../models/Position"; // eslint-disable-line

export const MouseStore = types
  .model("MouseStore", {
    position: types.maybeNull(Position),
  })
  .actions(self => ({
    setPosition(position: PositionType) {
      self.position = position;
    },
  }));
