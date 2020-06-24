import { uuid } from "uuidv4";
import { PositionType } from "../levels"; // eslint-disable-line
import { TowerBlueprint } from "./TowerBlueprint";

export class Tower extends TowerBlueprint {
  public id: string = uuid();
  public position: PositionType | null;
  public isFiring: boolean = false;
  public ticksUntilNextShot: number = 0;
  public targetPosition: PositionType | null;
  public barrelAngle: number = 0;
  public targetAngle: number = 180;
  public rotationSpeed = 4;

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
    this.setBarrelAngle = this.setBarrelAngle.bind(this);
    this.setTargetAngle = this.setTargetAngle.bind(this);
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
  public setBarrelAngle(angle: number) {
    this.barrelAngle = angle;
  }
  public setTargetAngle(angle: number) {
    this.targetAngle = angle;
  }
}
