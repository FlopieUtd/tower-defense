import { PositionType } from "../models/Position"; // eslint-disable-line
import { Tower } from "../models/Tower"; // eslint-disable-line
import { TowerBlueprint } from "../models/TowerBlueprint"; // eslint-disable-line

export class Construction {
  public isVisible: boolean;
  public blueprint: TowerBlueprint;
  public position: PositionType | null;
  public activeTower: Tower | null;

  constructor() {
    this.setIsVisible = this.setIsVisible.bind(this);
    this.setBlueprint = this.setBlueprint.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.setActiveTower = this.setActiveTower.bind(this);
  }

  public setIsVisible(isVisible: boolean) {
    this.isVisible = isVisible;
  }
  public setBlueprint(blueprint: TowerBlueprint) {
    this.blueprint = blueprint;
  }
  public setPosition(position: PositionType | null) {
    this.position = position;
  }
  public setActiveTower(tower: Tower) {
    this.activeTower = tower;
  }
}

export const construction = new Construction();
