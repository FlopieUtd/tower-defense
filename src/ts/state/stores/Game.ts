import { types } from "mobx-state-tree";
import { Level } from "../models/Level";
import { Tower } from "../models/Tower"; // eslint-disable-line
import { Wave } from "../models/Wave";

export const GameStore = types
  .model("GameStore", {
    money: 0,
    health: 20,
    waves: types.array(Wave),
    currentWave: 0,
    level: types.maybeNull(Level),
    towers: types.array(Tower),
  })
  .actions(self => ({
    increaseMoneyBy(amount: number) {
      self.money += amount;
    },
    decreaseMoneyBy(amount: number) {
      self.money -= amount;
    },
    setMoney(amount: number) {
      self.money = amount;
    },
    decreaseHealth() {
      self.health -= 1;
    },
    resetHealth() {
      self.health = 20;
    },
    setCurrentWave(wave: number) {
      self.currentWave = wave;
    },
    addTower(tower: Tower) {
      self.towers.push(tower);
    },
    setLevel(level: Level) {
      self.level = level;
    },
  }));
