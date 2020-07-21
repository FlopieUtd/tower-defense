import { observable } from "mobx";
import { Enemy } from "./Enemy";
import { Level } from "./Level";
import { Tower } from "./Tower";

export class Game {
  @observable public money = 0;
  @observable public health = 20;
  @observable public currentWaveGroup = 0;
  public level: Level;
  public towers: Tower[] = [];
  public enemies: Enemy[] = [];

  constructor() {
    this.setMoney = this.setMoney.bind(this);
    this.setHealth = this.setHealth.bind(this);
    this.setCurrentWave = this.setCurrentWave.bind(this);
    this.setTowers = this.setTowers.bind(this);
    this.setEnemies = this.setEnemies.bind(this);
    this.setLevel = this.setLevel.bind(this);
  }

  public setMoney(amount: number) {
    this.money = amount;
  }
  public setHealth(health: number) {
    this.health = health;
  }
  public setCurrentWave(wave: number) {
    this.currentWaveGroup = wave;
  }
  public setTowers(towers: Tower[]) {
    this.towers = towers;
  }
  public setEnemies(enemies: Enemy[]) {
    this.enemies = enemies;
  }
  public setLevel(level: Level) {
    this.level = level;
  }
}

export const game = new Game();
