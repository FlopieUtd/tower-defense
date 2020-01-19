import { types } from "mobx-state-tree";
import { Position } from "./Position";

export const Wave = types
  .model({
    amount: types.number,
    type: types.string,
    spawnLocation: Position,
  })
  .actions(self => ({
    decreaseAmount() {
      self.amount--;
    },
  }));
