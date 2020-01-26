import { LevelType, Map, PositionType, WaveGroup } from "../levels"; // eslint-disable-line
import { Wave } from "./Wave";

export class Level {
  public map: Map;
  public waves: WaveGroup[];
  public startingMoney: number;
  constructor(level: LevelType) {
    const { map, waves, startingMoney } = level;
    this.map = [...map];
    this.waves = waves.map(wave => {
      return wave.map(subwave => {
        return new Wave(subwave);
      });
    });
    this.startingMoney = startingMoney;

    this.setValueOnMap = this.setValueOnMap.bind(this);
  }

  public setValueOnMap(position: PositionType, value: number) {
    this.map[position.y][position.x] = value;
  }
}
