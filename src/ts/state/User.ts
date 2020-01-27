import { levels } from "../levels";

export interface LevelStatus {
  levelNumber: number;
  isGameWon: boolean;
  stars: number;
}

export class User {
  public money: number = 0;
  public progress: LevelStatus[] = [];

  constructor() {
    this.setMoney = this.setMoney.bind(this);
    this.setLevelStatus = this.setLevelStatus.bind(this);
    this.syncUserWithLocalStorage = this.syncUserWithLocalStorage.bind(this);

    const storedUser = localStorage.getItem("tower-defense-user");

    if (!storedUser) {
      // New user
      console.log("New user!");
      this.progress = Object.keys(levels)
        .map(key => levels[key])
        .map(level => ({ levelNumber: level.levelNumber, isGameWon: false, stars: 0 }));
      this.syncUserWithLocalStorage();
    } else {
      // Existing user
      const parsedUser = JSON.parse(storedUser);
      console.log("Existing user", parsedUser);
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
    this.syncUserWithLocalStorage();
  }
  public syncUserWithLocalStorage() {
    localStorage.setItem(
      "tower-defense-user",
      JSON.stringify({ money: this.money, progress: this.progress }),
    );
    console.log("synced with local storage!", this.progress);
  }
}

export const user = new User();
