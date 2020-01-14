import { types } from "mobx-state-tree";
import { Position } from "./Position";

export const Mouse = types.model({
  position: Position,
});
