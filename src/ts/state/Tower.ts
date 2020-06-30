import { uuid } from "uuidv4";
import { PositionType } from "../levels";
import { TowerBlueprint } from "./TowerBlueprint";

export class Tower extends TowerBlueprint {
  public id: string = uuid();
  public position: PositionType | null;
  public isFiring = false;
  public ticksUntilNextShot = 0;
  public targetPosition: PositionType | null;
  public barrelAngle = 0;
  public targetAngle: number | null = null;
  public barrelWidth: number;
  public barrelLength: number;

  constructor(blueprint: TowerBlueprint & { position: PositionType }) {
    super(blueprint);
    const { position, rotationSpeed, barrelWidth, barrelLength } = blueprint;
    this.id = uuid();
    this.position = position;
    this.rotationSpeed = rotationSpeed;
    this.barrelWidth = barrelWidth;
    this.barrelLength = barrelLength;

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
