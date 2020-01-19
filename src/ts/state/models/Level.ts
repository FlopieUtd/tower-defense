import { Instance, types } from "mobx-state-tree"; // eslint-disable-line
import { PositionType } from "./Position"; // eslint-disable-line
import { Wave } from "./Wave";

export const Level = types
  .model({
    map: types.array(types.array(types.number)),
    waves: types.array(types.array(Wave)),
    startingMoney: types.number,
  })
  .actions(self => ({
    setValueOnMap(position: PositionType, value: number) {
      self.map[position.y][position.x] = value;
    },
  }));

export type Level = Instance<typeof Level>;
