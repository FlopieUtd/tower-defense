import { EnemyType } from "../enemies/types";

export type Movement = "air" | "ground";

export class EnemyBlueprint {
  public type: string;
  public color: string;
  public originalHealth: number;
  public radius: number;
  public reward: number;
  public speed: number;
  public intervalInTicks: number;
  public movement: Movement;
  public drops: EnemyType[];

  constructor(blueprint: EnemyBlueprint) {
    const {
      type,
      color,
      originalHealth,
      radius,
      reward,
      speed,
      intervalInTicks,
      drops,
    } = blueprint;

    this.radius = radius;
    this.color = color;
    this.originalHealth = originalHealth;
    this.type = type;
    this.reward = reward;
    this.color = color;
    this.speed = speed;
    this.intervalInTicks = intervalInTicks;
    this.drops = drops;
  }
}
