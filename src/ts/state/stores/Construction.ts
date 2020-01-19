import { types } from "mobx-state-tree";
import { Position, PositionType } from "../models/Position"; // eslint-disable-line
import { Tower } from "../models/Tower";
import { TowerBlueprint } from "../models/TowerBlueprint";

export const ConstructionStore = types
  .model("ConstructionStore", {
    isVisible: false,
    blueprint: types.maybeNull(TowerBlueprint),
    position: types.maybeNull(Position),
    activeTower: types.maybeNull(Tower),
  })
  .actions(self => ({
    setIsVisible(isVisible: boolean) {
      self.isVisible = isVisible;
    },
    setBlueprint(blueprint: TowerBlueprint) {
      self.blueprint = blueprint;
    },
    setPosition(position: PositionType | null) {
      self.position = position;
    },
    setActiveTower(tower: Tower) {
      self.activeTower = tower;
    },
  }));
