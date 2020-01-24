export class TowerBlueprint {
  public radius: number;
  public shootsEveryNthTick: number;
  public damagePerShot: number;
  public type: string;
  public cost: number;
  public color: string;
  public armorPiercing: boolean;
  public targetsGround: boolean;
  public targetsAir: boolean;

  constructor(blueprint: TowerBlueprint) {
    const {
      radius,
      shootsEveryNthTick,
      damagePerShot,
      type,
      cost,
      color,
      armorPiercing,
      targetsGround,
      targetsAir,
    } = blueprint;

    this.radius = radius;
    this.shootsEveryNthTick = shootsEveryNthTick;
    this.damagePerShot = damagePerShot;
    this.type = type;
    this.cost = cost;
    this.color = color;
    this.armorPiercing = armorPiercing;
    this.targetsGround = targetsGround;
    this.targetsAir = targetsAir;
  }
}
