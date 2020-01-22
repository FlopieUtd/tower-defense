import { uuid } from "uuidv4";
import { PositionType } from "../models/Position"; // eslint-disable-line
import { EnemyBlueprint } from "./EnemyBlueprint";

export class Enemy extends EnemyBlueprint {
  public id: string;
  public position: PositionType;
  public route: PositionType[];
  public isUnderFire: boolean;
  public health: number;

  constructor(blueprint: EnemyBlueprint) {
    super(blueprint);
    this.id = uuid();
  }
}
