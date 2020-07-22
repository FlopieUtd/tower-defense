import { observable } from "mobx";

export const enum Screen {
  GameOver,
  GameWon,
  Menu,
  Research,
  Game,
}

export class Engine {
  @observable public isPaused = false;
  @observable public activeScreen: Screen = Screen.Menu;
  @observable public isFastForward = false;
  @observable public nextWaveInNSeconds = 0;
  public tick = 0;
  public waveTick = 0;
  public activeLevel: number | null = 1;

  constructor() {
    this.setIsPaused = this.setIsPaused.bind(this);
    this.setActiveScreen = this.setActiveScreen.bind(this);
    this.setIsFastForward = this.setIsFastForward.bind(this);
    this.incrementTick = this.incrementTick.bind(this);
    this.incrementWaveTick = this.incrementWaveTick.bind(this);
    this.startNextWave = this.startNextWave.bind(this);
    this.resetTicks = this.resetTicks.bind(this);
    this.setActiveLevel = this.setActiveLevel.bind(this);
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
  public startNextWave() {
    this.waveTick = 1200 - 1;
  }
  public resetTicks() {
    this.tick = 0;
    this.waveTick = 0;
  }
  public setActiveLevel(activeLevel: number) {
    this.activeLevel = activeLevel;
  }
}

export const engine = new Engine();
