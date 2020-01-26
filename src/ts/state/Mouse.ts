import { PositionType } from "../levels"; // eslint-disable-line

export class Mouse {
  public position: PositionType | null;

  constructor() {
    this.setPosition = this.setPosition.bind(this);
  }

  public setPosition(position: PositionType) {
    this.position = position;
  }
}

export const mouse = new Mouse();
