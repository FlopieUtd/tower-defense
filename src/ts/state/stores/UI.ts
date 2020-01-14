import { types } from "mobx-state-tree";
import { Tower } from "../models/Tower";
import { ConstructionStore } from "./Construction";

export const UIStore = types.model("UIStore", {
  construction: ConstructionStore,
  activeTower: Tower,
});
