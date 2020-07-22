import { enemyBlueprints } from "../enemies/blueprints";
import { SubWaveBlueprint } from "../levels/types";

export class SubWave {
  public amount: number;
  public intervalInTicks: number;
  public type: string;
  public spawnLocation: number;

  constructor(subWaveBlueprint: SubWaveBlueprint) {
    const { amount, type, spawnLocation } = subWaveBlueprint;
    this.amount = amount;
    this.type = type;
    this.intervalInTicks = enemyBlueprints.find(
      blueprint => blueprint.type === type,
    ).intervalInTicks;
    this.spawnLocation = spawnLocation;
    this.decreaseAmount = this.decreaseAmount.bind(this);
  }

  public decreaseAmount() {
    this.amount--;
  }
}
