import { types } from "mobx-state-tree";
import { ConstructionStore } from "./stores/Construction";
import { EngineStore } from "./stores/Engine";
import { GameStore } from "./stores/Game";
import { MouseStore } from "./stores/Mouse";

const RootStore = types.model({
  game: types.optional(GameStore, {}),
  engine: types.optional(EngineStore, {}),
  mouse: types.optional(MouseStore, {}),
  construction: types.optional(ConstructionStore, {}),
});

export const store = RootStore.create({});
