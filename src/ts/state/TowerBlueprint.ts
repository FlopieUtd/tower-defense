import { Movement } from "./EnemyBlueprint";

export class TowerBlueprint {
  public radius: number;
  public shootsEveryNthTick: number;
  public damagePerShot: number;
  public type: string;
  public label: string;
  public cost: number;
  public colors: string[];
  public armorPiercing: boolean;
  public targets: Movement[];
  public rotationSpeed: number;
  public barrelWidth: number;
  public barrelLength: number;

  constructor(blueprint: TowerBlueprint) {
    const {
      radius,
      shootsEveryNthTick,
      damagePerShot,
      type,
      cost,
      colors,
      armorPiercing,
      targets,
    } = blueprint;

    this.radius = radius;
    this.shootsEveryNthTick = shootsEveryNthTick;
    this.damagePerShot = damagePerShot;
    this.type = type;
    this.cost = cost;
    this.colors = colors;
    this.armorPiercing = armorPiercing;
    this.targets = targets;
  }
}
