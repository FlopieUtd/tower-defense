import { observable } from "mobx";
import { Enemy } from "./Enemy";
import { Level } from "./Level";
import { Tower } from "./Tower";

export class Game {
  @observable public money = 0;
  @observable public health = 20;
  // The wave that is currently released
  // 0 means the game hasn't started yet
  // 1 means the game is started and the first wave has started releasing
  @observable public currentWaveNumber = 0;
  // The last wave of which all enemies were defeated
  // 0 means no waves have been defeated
  // 1 means the first wave has been defeated
  @observable public defeatedWaveNumber = 0;
  public level: Level;
  public towers: Tower[] = [];
  public enemies: Enemy[] = [];

  constructor() {
    this.setMoney = this.setMoney.bind(this);
    this.setHealth = this.setHealth.bind(this);
    this.setCurrentWaveNumber = this.setCurrentWaveNumber.bind(this);
    this.setDefeatedWaveNumber = this.setDefeatedWaveNumber.bind(this);
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
  public setCurrentWaveNumber(waveNumber: number) {
    this.currentWaveNumber = waveNumber;
  }
  public setDefeatedWaveNumber(waveNumber: number) {
    this.defeatedWaveNumber = waveNumber;
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
