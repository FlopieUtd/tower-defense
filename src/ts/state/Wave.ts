import { enemyBlueprints } from "../enemies";
import { PositionType, WaveType } from "../levels"; // eslint-disable-line

export class Wave {
  public amount: number;
  public intervalInTicks: number;
  public type: string;
  public spawnLocation: number;

  constructor(waveBlueprint: WaveType) {
    const { amount, type, spawnLocation } = waveBlueprint;
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