import { observable } from "mobx";
import { levels } from "../levels";

export interface LevelStatus {
  levelNumber: number;
  isUnlocked: boolean;
  isGameWon: boolean;
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
  public setLevelStatus(levelStatus: LevelStatus) {
    const level = this.progress.find(level => level.levelNumber === levelStatus.levelNumber);
    // Only overwrite wavesWon if the user won more than before
    levelStatus.wavesWon = Math.max(levelStatus.wavesWon, level.wavesWon);
    this.progress.splice(this.progress.indexOf(level), 1, levelStatus);
    // Unlock the next level
    if (this.progress[levelStatus.levelNumber]) {
      this.progress[levelStatus.levelNumber].isUnlocked = true;
    }
  }
  public awardCredits(newLevelStatus: LevelStatus) {
    const existingLevelStatus = this.progress.find(
      level => level.levelNumber === newLevelStatus.levelNumber,
    );

    if (!existingLevelStatus.isGameWon) {
      this.setCredits(this.credits + LEVEL_WON_AWARD);
    }
    const newWavesWon = newLevelStatus.wavesWon - existingLevelStatus.wavesWon;
    this.setCredits(this.credits + (newWavesWon > 0 ? newWavesWon * STAR_AWARD : 0));
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
