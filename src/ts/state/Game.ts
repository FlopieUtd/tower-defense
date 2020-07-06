import { observable } from "mobx";
import { Enemy } from "./Enemy";
import { Level } from "./Level";
import { Tower } from "./Tower";

export class Game {
  @observable public money = 0;
  @observable public health = 3;
  @observable public currentWaveGroup = 0;
  public level: Level;
  public towers: Tower[] = [];
  public enemies: Enemy[] = [];

  constructor() {
    this.increaseMoneyBy = this.increaseMoneyBy.bind(this);
    this.decreaseCreditsBy = this.decreaseCreditsBy.bind(this);
    this.setCredits = this.setCredits.bind(this);
    this.decreaseHealth = this.decreaseHealth.bind(this);
    this.resetHealth = this.resetHealth.bind(this);
    this.setCurrentWave = this.setCurrentWave.bind(this);
    this.addTower = this.addTower.bind(this);
    this.resetTowers = this.resetTowers.bind(this);
    this.addEnemy = this.addEnemy.bind(this);
    this.resetEnemies = this.resetEnemies.bind(this);
    this.setLevel = this.setLevel.bind(this);
  }

  public increaseMoneyBy(amount: number) {
    this.money += amount;
  }
  public decreaseCreditsBy(amount: number) {
    this.money -= amount;
  }
  public setCredits(amount: number) {
    this.money = amount;
  }
  public decreaseHealth() {
    this.health -= 1;
  }
  public resetHealth() {
    this.health = 3;
  }
  public setCurrentWave(wave: number) {
    this.currentWaveGroup = wave;
  }
  public addTower(tower: Tower) {
    this.towers = [...this.towers, tower];
  }
  public resetTowers() {
    this.towers = [];
  }
  public addEnemy(enemy: Enemy) {
    this.enemies = [...this.enemies, enemy];
  }
  public resetEnemies() {
    this.enemies = [];
  }
  public setLevel(level: Level) {
    this.level = level;
  }
}

export const game = new Game();
