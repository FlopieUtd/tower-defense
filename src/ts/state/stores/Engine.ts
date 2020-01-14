import { types } from "mobx-state-tree";

export const EngineStore = types
  .model("EngineStore", {
    isPaused: false,
    isFastForward: false,
    isGameOver: false,
    tick: 0,
    waveTick: 0,
  })
  .actions(self => ({
    setIsPaused(value: boolean) {
      self.isPaused = value;
    },
    setIsFastForward(value: boolean) {
      self.isFastForward = value;
    },
    setIsGameOver(value: boolean) {
      self.isGameOver = value;
    },
    incrementTick() {
      self.tick++;
    },
    incrementWaveTick() {
      self.waveTick++;
    },
  }));
