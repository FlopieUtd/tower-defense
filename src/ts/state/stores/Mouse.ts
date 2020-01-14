import { types } from "mobx-state-tree";
import { Position } from "../models/Position";

export const MouseStore = types
  .model("MouseStore", {
    position: types.maybeNull(Position),
  })
  .actions(self => ({
    setPosition(position: Position) {
      self.position = position;
    },
  }));
