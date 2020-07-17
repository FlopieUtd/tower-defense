import { Movement } from "./EnemyBlueprint";

export class TowerBlueprint {
  public radius: number;
  public fireRate: number;
  public damagePerShot: number;
  public type: string;
  public label: string;
  public price: number;
  public colors: string[];
  public armorPiercing: boolean;
  public targets: Movement[];
  public rotationSpeed: number;
  public barrelWidth: number;
  public barrelLength: number;

  constructor(blueprint: TowerBlueprint) {
    const {
      radius,
      fireRate,
      damagePerShot,
      type,
      price,
      colors,
      armorPiercing,
      targets,
    } = blueprint;

    this.radius = radius;
    this.fireRate = fireRate;
    this.damagePerShot = damagePerShot;
    this.type = type;
    this.price = price;
    this.colors = colors;
    this.armorPiercing = armorPiercing;
    this.targets = targets;
  }
}
