import { observable } from "mobx";
import { WaveGroup } from "../../levels"; // eslint-disable-line
import { Level } from "./Level"; // eslint-disable-line
import { Tower } from "./Tower"; // eslint-disable-line

export class Game {
  @observable public money: number = 0;
  public health: number = 20;
  public waves: WaveGroup[] = [];
  @observable public currentWaveGroup: number = 0;
  public level: Level;
  public towers: Tower[] = [];

  constructor() {
    this.increaseMoneyBy = this.increaseMoneyBy.bind(this);
    this.decreaseMoneyBy = this.decreaseMoneyBy.bind(this);
    this.setMoney = this.setMoney.bind(this);
    this.decreaseHealth = this.decreaseHealth.bind(this);
    this.resetHealth = this.resetHealth.bind(this);
    this.setCurrentWave = this.setCurrentWave.bind(this);
    this.addTower = this.addTower.bind(this);
    this.setLevel = this.setLevel.bind(this);
  }

  public increaseMoneyBy(amount: number) {
    this.money += amount;
  }
  public decreaseMoneyBy(amount: number) {
    this.money -= amount;
  }
  public setMoney(amount: number) {
    this.money = amount;
  }
  public decreaseHealth() {
    this.health -= 1;
  }
  public resetHealth() {
    this.health = 20;
  }
  public setCurrentWave(wave: number) {
    this.currentWaveGroup = wave;
  }
  public addTower(tower: Tower) {
    this.towers.push(tower);
  }
  public setLevel(level: Level) {
    this.level = level;
  }
}

export const game = new Game();
