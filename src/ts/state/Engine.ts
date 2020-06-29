import { observable } from "mobx";

export const enum Screen {
  Lose,
  Win,
  Menu,
  Research,
  Game,
}

export class Engine {
  public isPaused: boolean = false;
  @observable public activeScreen: Screen = Screen.Menu;
  @observable public isFastForward: boolean = false;
  @observable public isGameStarted: boolean = false;
  @observable public nextWaveInNSeconds: number = 0;
  public tick: number = 0;
  public waveTick: number = 0;
  public activeLevel: number | null = 1;

  constructor() {
    this.setIsPaused = this.setIsPaused.bind(this);
    this.setActiveScreen = this.setActiveScreen.bind(this);
    this.setIsFastForward = this.setIsFastForward.bind(this);
    this.incrementTick = this.incrementTick.bind(this);
    this.incrementWaveTick = this.incrementWaveTick.bind(this);
    this.callNextWave = this.callNextWave.bind(this);
    this.resetTicks = this.resetTicks.bind(this);
    this.setActiveLevel = this.setActiveLevel.bind(this);
    this.setIsGameStarted = this.setIsGameStarted.bind(this);
  }

  public setIsPaused(isPaused: boolean) {
    this.isPaused = isPaused;
  }
  public setIsFastForward(isFastForward: boolean) {
    this.isFastForward = isFastForward;
  }
  public setActiveScreen(screen: Screen) {
    this.activeScreen = screen;
  }
  public incrementTick() {
    this.tick++;
  }
  public incrementWaveTick() {
    this.waveTick++;
    if (this.waveTick % 60 === 0) {
      this.nextWaveInNSeconds = (1200 - this.waveTick) / 60;
    }
  }
  public callNextWave() {
    this.waveTick = 1200 - 1;
  }
  public resetTicks() {
    this.tick = 0;
    this.waveTick = 0;
  }
  public setActiveLevel(activeLevel: number) {
    this.activeLevel = activeLevel;
  }
  public setIsGameStarted(isGameStarted: boolean) {
    this.isGameStarted = isGameStarted;
  }
}

export const engine = new Engine();
