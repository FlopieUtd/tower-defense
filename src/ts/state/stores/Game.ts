import { types } from "mobx-state-tree";
import { Tower } from "../models/Tower";
import { Wave } from "../models/Wave";

export const GameStore = types
  .model("GameStore", {
    money: 200,
    health: 20,
    waves: types.array(Wave),
    currentWave: 0,
    towers: types.array(Tower),
  })
  .actions(self => ({
    increaseMoneyBy(amount: number) {
      self.money += amount;
    },
    decreaseMoneyBy(amount: number) {
      self.money -= amount;
    },
    decreaseHealth() {
      self.health -= 1;
    },
    setCurrentWave(wave: number) {
      self.currentWave = wave;
    },
  }));
