import { LevelType, Map, PositionType, WaveGroup } from "../levels/types";
import { Wave } from "./Wave";

export class Level {
  public levelNumber = 1;
  public map: Map;
  public waves: WaveGroup[];
  public startingMoney: number;
  constructor(level: LevelType) {
    const { map, waves, startingMoney, levelNumber } = level;
    this.levelNumber = levelNumber;
    // this.map = [...map] does not work as it copies only one level deep
    this.map = JSON.parse(JSON.stringify(map));
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
