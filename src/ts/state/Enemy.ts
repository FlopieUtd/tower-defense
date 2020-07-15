import { uuid } from "uuidv4";
import { EnemyBlueprint } from "./EnemyBlueprint";

import { PositionType } from "../levels/types";

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

  constructor(blueprint: Omit<Enemy, "setRoute">) {
    super(blueprint);
    const { position, route, isUnderFire, health, deviation } = blueprint;

    this.id = uuid();
    this.position = position;
    this.route = route;
    this.isUnderFire = isUnderFire;
    this.health = health;
    this.deviation = deviation;

    this.setRoute = this.setRoute.bind(this);
  }

  public setRoute(route: PositionType[]) {
    this.route = route;
  }
}
