import { observable } from "mobx";
import { levels } from "../levels";

export interface LevelStatus {
  levelNumber: number;
  isUnlocked: boolean;
  wavesWon: number;
}

const LEVEL_WON_AWARD = 100;
const STAR_AWARD = 50;

export class User {
  @observable public credits = 0;
  public progress: LevelStatus[] = [];

  constructor() {
    this.setCredits = this.setCredits.bind(this);
    this.setLevelStatus = this.setLevelStatus.bind(this);
    this.awardCredits = this.awardCredits.bind(this);
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
          wavesWon: 0,
        }));
    } else {
      // Existing user
      const parsedUser = JSON.parse(storedUser);
      const { credits, progress } = parsedUser;
      this.credits = credits;
      this.progress = progress;
    }
  }

  public setCredits(credits: number) {
    this.credits = credits;
    this.syncUserWithLocalStorage();
  }
  public setLevelStatus(newLevelStatus: LevelStatus) {
    const existingLevelStatus = this.progress.find(
      level => level.levelNumber === newLevelStatus.levelNumber,
    );
    // Only overwrite wavesWon if the user won more than before
    newLevelStatus.wavesWon = Math.max(newLevelStatus.wavesWon, existingLevelStatus.wavesWon);
    this.progress.splice(this.progress.indexOf(existingLevelStatus), 1, newLevelStatus);
    // Unlock the next level
    if (this.progress[newLevelStatus.levelNumber]) {
      this.progress[newLevelStatus.levelNumber].isUnlocked = true;
    }
  }
  public awardCredits(newLevelStatus: LevelStatus) {
    const existingLevelStatus = this.progress.find(
      level => level.levelNumber === newLevelStatus.levelNumber,
    );
    newLevelStatus.wavesWon = Math.max(newLevelStatus.wavesWon, existingLevelStatus.wavesWon);
    const newCreditsWon = newLevelStatus.wavesWon - existingLevelStatus.wavesWon;
    this.setCredits(this.credits + (newCreditsWon > 0 ? newCreditsWon : 0));
  }
  public syncUserWithLocalStorage() {
    localStorage.setItem(
      "tower-defense-user",
      JSON.stringify({ credits: this.credits, progress: this.progress }),
    );
  }
}

export const user = new User();
user.syncUserWithLocalStorage();
