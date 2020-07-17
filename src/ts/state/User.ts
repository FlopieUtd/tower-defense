import { observable } from "mobx";
import { levels } from "../levels";

export interface LevelStatus {
  levelNumber: number;
  isUnlocked: boolean;
  wavesWon: number;
}

interface RootResearchObject {
  [key: string]: ResearchObject;
}
interface ResearchObject {
  [key: string]: { level: number; effect: number };
}

export class User {
  @observable public credits = 0;
  public progress: LevelStatus[] = [];
  @observable public research: RootResearchObject;

  constructor() {
    this.setCredits = this.setCredits.bind(this);
    this.setLevelStatus = this.setLevelStatus.bind(this);
    this.awardCredits = this.awardCredits.bind(this);
    this.syncUserWithLocalStorage = this.syncUserWithLocalStorage.bind(this);
    this.setResearch = this.setResearch.bind(this);

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
      const { credits, progress, research } = parsedUser;
      this.credits = credits;
      this.progress = progress;
      this.research = research;
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
    this.progress = this.progress.map(levelStatus =>
      levelStatus === existingLevelStatus ? newLevelStatus : levelStatus,
    );
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
      JSON.stringify({ credits: this.credits, progress: this.progress, research: this.research }),
    );
  }
  public setResearch(research: RootResearchObject) {
    this.research = research;
  }
}

export const user = new User();
user.syncUserWithLocalStorage();
