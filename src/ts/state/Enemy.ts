import { uuid } from "uuidv4";
import { PositionType } from "../levels";
import { EnemyBlueprint } from "./EnemyBlueprint";

export class Enemy extends EnemyBlueprint {
  public id: string;
  public position: PositionType;
  public route: PositionType[];
  public isUnderFire: boolean;
  public health: number;
  public deviation: {
    x: number;
    y: number;
  };

  constructor(blueprint: EnemyBlueprint) {
    super(blueprint);
    this.id = uuid();
  }
}
