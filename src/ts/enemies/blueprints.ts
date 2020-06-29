import { EnemyBlueprint } from "../state/EnemyBlueprint";

export const enemyBlueprints: EnemyBlueprint[] = [
  {
    type: "runner",
    color: "red",
    radius: 0.045,
    originalHealth: 100,
    reward: 2,
    speed: 2.4,
    intervalInTicks: 20,
    movement: "ground",
    drops: [],
  },
  {
    type: "heavy",
    color: "pink",
    radius: 0.05,
    originalHealth: 250,
    reward: 3,
    speed: 1.8,
    intervalInTicks: 50,
    movement: "ground",
    drops: [],
  },
  {
    type: "spawner",
    color: "blue",
    radius: 0.06,
    originalHealth: 500,
    reward: 5,
    speed: 1.8,
    intervalInTicks: 50,
    movement: "ground",
    drops: ["runner", "runner", "runner"],
  },
];
