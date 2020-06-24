import { uuid } from "uuidv4";
import { PositionType } from "../levels"; // eslint-disable-line
import { TowerBlueprint } from "./TowerBlueprint";

export class Tower extends TowerBlueprint {
  public id: string = uuid();
  public position: PositionType | null;
  public isFiring: boolean = false;
  public ticksUntilNextShot: number = 0;
  public targetPosition: PositionType | null;
  public angle: number = 0;

  constructor(blueprint: TowerBlueprint & { position: PositionType }) {
    super(blueprint);
    const { position } = blueprint;
    this.id = uuid();
    this.position = position;

    this.setPosition = this.setPosition.bind(this);
    this.setIsFiring = this.setIsFiring.bind(this);
    this.setTicksUntilNextShot = this.setTicksUntilNextShot.bind(this);
    this.decrementTicksUntilNextshot = this.decrementTicksUntilNextshot.bind(this);
    this.setTargetPosition = this.setTargetPosition.bind(this);
    this.setAngle = this.setAngle.bind(this);
  }

  public setPosition(position: PositionType) {
    this.position = position;
  }
  public setIsFiring(value: boolean) {
    this.isFiring = value;
  }
  public setTicksUntilNextShot(value: number) {
    this.ticksUntilNextShot = value;
  }
  public decrementTicksUntilNextshot() {
    this.ticksUntilNextShot--;
  }
  public setTargetPosition(position: PositionType | null) {
    this.targetPosition = position;
  }
  public setAngle(angle: number) {
    this.angle = angle;
  }
}
