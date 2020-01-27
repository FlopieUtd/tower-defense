import { observable } from "mobx";
import { WaveGroup } from "../levels"; // eslint-disable-line
import { Enemy } from "./Enemy"; // eslint-disable-line
import { Level } from "./Level"; // eslint-disable-line
import { Tower } from "./Tower"; // eslint-disable-line

export class Game {
  @observable public money: number = 0;
  @observable public health: number = 20;
  @observable public currentWaveGroup: number = 0;
  @observable public starsWon = 0;
  public level: Level;
  public towers: Tower[] = [];
  public enemies: Enemy[] = [];

  constructor() {
    this.increaseMoneyBy = this.increaseMoneyBy.bind(this);
    this.decreaseMoneyBy = this.decreaseMoneyBy.bind(this);
    this.setMoney = this.setMoney.bind(this);
    this.decreaseHealth = this.decreaseHealth.bind(this);
    this.resetHealth = this.resetHealth.bind(this);
    this.setCurrentWave = this.setCurrentWave.bind(this);
    this.addTower = this.addTower.bind(this);
    this.resetTowers = this.resetTowers.bind(this);
    this.addEnemy = this.addEnemy.bind(this);
    this.resetEnemies = this.resetEnemies.bind(this);
    this.setLevel = this.setLevel.bind(this);
    this.setStarsWon = this.setStarsWon.bind(this);
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
  public resetTowers() {
    this.towers = [];
  }
  public addEnemy(enemy: Enemy) {
    this.enemies.push(enemy);
  }
  public resetEnemies() {
    this.enemies = [];
  }
  public setLevel(level: Level) {
    this.level = level;
  }
  public setStarsWon(starsWon: number) {
    this.starsWon = starsWon;
  }
}

export const game = new Game();
