import { observable } from "mobx";

export class Engine {
  public isPaused: boolean = false;
  @observable public isFastForward: boolean = false;
  @observable public isGameOver: boolean = false;
  @observable public isGameWon: boolean = false;
  @observable public isMenuActive: boolean = false;
  public tick: number = 0;
  public waveTick: number = 0;
  public activeLevel: number | null = 1;

  constructor() {
    this.setIsPaused = this.setIsPaused.bind(this);
    this.setIsFastForward = this.setIsFastForward.bind(this);
    this.setIsGameOver = this.setIsGameOver.bind(this);
    this.setIsGameWon = this.setIsGameWon.bind(this);
    this.setIsMenuActive = this.setIsMenuActive.bind(this);
    this.incrementTick = this.incrementTick.bind(this);
    this.incrementWaveTick = this.incrementWaveTick.bind(this);
    this.resetTicks = this.resetTicks.bind(this);
    this.setActiveLevel = this.setActiveLevel.bind(this);
  }

  public setIsPaused(isPaused: boolean) {
    this.isPaused = isPaused;
  }
  public setIsFastForward(isFastForward: boolean) {
    this.isFastForward = isFastForward;
  }
  public setIsGameOver(isGameOver: boolean) {
    this.isGameOver = isGameOver;
  }
  public setIsGameWon(isGameWon: boolean) {
    this.isGameWon = isGameWon;
  }
  public setIsMenuActive(isMenuActive: boolean) {
    console.log("setting menu active", isMenuActive);
    this.isMenuActive = isMenuActive;
  }
  public incrementTick() {
    this.tick++;
  }
  public incrementWaveTick() {
    this.waveTick++;
  }
  public resetTicks() {
    this.tick = 0;
    this.waveTick = 0;
  }
  public setActiveLevel(activeLevel: number) {
    console.log("setting menu active", activeLevel);
    this.activeLevel = activeLevel;
  }
}

export const engine = new Engine();
