import { LevelType, Map, PositionType, WaveGroup } from "../levels"; // eslint-disable-line

export class Level {
  public map: Map;
  public waves: WaveGroup[];
  public startingMoney: number;
  constructor(level: LevelType) {
    const { map, waves, startingMoney } = level;
    this.map = [...map];
    this.waves = waves;
    this.startingMoney = startingMoney;

    this.setValueOnMap = this.setValueOnMap.bind(this);
  }

  public setValueOnMap(position: PositionType, value: number) {
    this.map[position.y][position.x] = value;
  }
}
