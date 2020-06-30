import { observable } from "mobx";
import { levels } from "../levels";

export interface LevelStatus {
  levelNumber: number;
  isUnlocked: boolean;
  isGameWon: boolean;
  stars: number;
}

const LEVEL_WON_AWARD = 100;
const STAR_AWARD = 50;

export class User {
  @observable public money = 0;
  public progress: LevelStatus[] = [];

  constructor() {
    this.setMoney = this.setMoney.bind(this);
    this.setLevelStatus = this.setLevelStatus.bind(this);
    this.awardMoney = this.awardMoney.bind(this);
    this.syncUserWithLocalStorage = this.syncUserWithLocalStorage.bind(this);

    const storedUser = localStorage.getItem("tower-defense-user");

    if (!storedUser) {
      // New user
      this.progress = Object.keys(levels)
        .map(key => levels[key])
        .map(level => ({
          levelNumber: level.levelNumber,
          isGameWon: false,
          isUnlocked: level.levelNumber === 1 ? true : false,
          stars: 0,
        }));
    } else {
      // Existing user
      const parsedUser = JSON.parse(storedUser);
      const { money, progress } = parsedUser;
      this.money = money;
      this.progress = progress;
    }
  }

  public setMoney(money: number) {
    this.money = money;
    this.syncUserWithLocalStorage();
  }
  public setLevelStatus(levelStatus: LevelStatus) {
    const level = this.progress.find(level => level.levelNumber === levelStatus.levelNumber);
    // Only overwrite stars if the user won more than before
    levelStatus.stars = Math.max(levelStatus.stars, level.stars);
    this.progress.splice(this.progress.indexOf(level), 1, levelStatus);
    // Unlock the next level
    if (this.progress[levelStatus.levelNumber]) {
      this.progress[levelStatus.levelNumber].isUnlocked = true;
    }
  }
  public awardMoney(newLevelStatus: LevelStatus) {
    const existingLevelStatus = this.progress.find(
      level => level.levelNumber === newLevelStatus.levelNumber,
    );

    if (!existingLevelStatus.isGameWon) {
      this.setMoney(this.money + LEVEL_WON_AWARD);
    }
    const newStarsWon = newLevelStatus.stars - existingLevelStatus.stars;
    this.setMoney(this.money + (newStarsWon > 0 ? newStarsWon * STAR_AWARD : 0));
  }
  public syncUserWithLocalStorage() {
    localStorage.setItem(
      "tower-defense-user",
      JSON.stringify({ money: this.money, progress: this.progress }),
    );
  }
}

export const user = new User();
user.syncUserWithLocalStorage();
