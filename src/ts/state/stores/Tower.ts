import { types } from "mobx-state-tree";
import { Tower } from "../models/Tower";

export const TowerStore = types
  .model("TowerStore", {
    tower: Tower,
  })
  .actions(self => ({}));
