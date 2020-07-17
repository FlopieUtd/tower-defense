import { Level } from "../state/Level";

export const levelCreator = (level: number) => new Level(levels[level]);

export const levels = {
  1: {
    levelNumber: 1,
    map: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 6, 1, 1, 1, 6, 6, 6, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 1, 1, 6, 1, 6, 1, 1, 4, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 6, 6, 6, 1, 1, 1, 6, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    waves: [
      [{ amount: 8, type: "runner", spawnLocation: 2 }],
      [{ amount: 6, type: "heavy", spawnLocation: 2 }],
      [{ amount: 12, type: "runner", spawnLocation: 2 }],
      [{ amount: 10, type: "heavy", spawnLocation: 2 }],
      [
        { amount: 6, type: "runner", spawnLocation: 2 },
        { amount: 6, type: "heavy", spawnLocation: 2 },
      ],
      [{ amount: 2, type: "spawner", spawnLocation: 2 }],
      [
        { amount: 10, type: "runner", spawnLocation: 2 },
        { amount: 10, type: "heavy", spawnLocation: 2 },
      ],
      [{ amount: 3, type: "spawner", spawnLocation: 2 }],
      [
        { amount: 8, type: "runner", spawnLocation: 2 },
        { amount: 8, type: "heavy", spawnLocation: 2 },
        { amount: 2, type: "spawner", spawnLocation: 2 },
      ],
      [{ amount: 4, type: "spawner", spawnLocation: 2 }],
      [{ amount: 12, type: "runner", spawnLocation: 2 }],
      [{ amount: 8, type: "heavy", spawnLocation: 2 }],
      [{ amount: 16, type: "runner", spawnLocation: 2 }],
      [{ amount: 12, type: "heavy", spawnLocation: 2 }],
      [
        { amount: 8, type: "runner", spawnLocation: 2 },
        { amount: 8, type: "heavy", spawnLocation: 2 },
      ],
      [{ amount: 2, type: "spawner", spawnLocation: 2 }],
      [
        { amount: 10, type: "runner", spawnLocation: 2 },
        { amount: 10, type: "heavy", spawnLocation: 2 },
      ],
      [{ amount: 3, type: "spawner", spawnLocation: 2 }],
      [
        { amount: 8, type: "runner", spawnLocation: 2 },
        { amount: 8, type: "heavy", spawnLocation: 2 },
        { amount: 2, type: "spawner", spawnLocation: 2 },
      ],
      [{ amount: 4, type: "spawner", spawnLocation: 2 }],
      [{ amount: 12, type: "runner", spawnLocation: 2 }],
      [{ amount: 8, type: "heavy", spawnLocation: 2 }],
      [{ amount: 16, type: "runner", spawnLocation: 2 }],
      [{ amount: 12, type: "heavy", spawnLocation: 2 }],
      [
        { amount: 8, type: "runner", spawnLocation: 2 },
        { amount: 8, type: "heavy", spawnLocation: 2 },
      ],
      [{ amount: 2, type: "spawner", spawnLocation: 2 }],
      [
        { amount: 10, type: "runner", spawnLocation: 2 },
        { amount: 10, type: "heavy", spawnLocation: 2 },
      ],
      [{ amount: 3, type: "spawner", spawnLocation: 2 }],
      [
        { amount: 8, type: "runner", spawnLocation: 2 },
        { amount: 8, type: "heavy", spawnLocation: 2 },
        { amount: 2, type: "spawner", spawnLocation: 2 },
      ],
      [{ amount: 4, type: "spawner", spawnLocation: 2 }],
      [{ amount: 12, type: "runner", spawnLocation: 2 }],
      [{ amount: 8, type: "heavy", spawnLocation: 2 }],
      [{ amount: 16, type: "runner", spawnLocation: 2 }],
      [{ amount: 12, type: "heavy", spawnLocation: 2 }],
      [
        { amount: 8, type: "runner", spawnLocation: 2 },
        { amount: 8, type: "heavy", spawnLocation: 2 },
      ],
      [{ amount: 2, type: "spawner", spawnLocation: 2 }],
      [
        { amount: 10, type: "runner", spawnLocation: 2 },
        { amount: 10, type: "heavy", spawnLocation: 2 },
      ],
      [{ amount: 3, type: "spawner", spawnLocation: 2 }],
      [
        { amount: 8, type: "runner", spawnLocation: 2 },
        { amount: 8, type: "heavy", spawnLocation: 2 },
        { amount: 2, type: "spawner", spawnLocation: 2 },
      ],
      [{ amount: 4, type: "spawner", spawnLocation: 2 }],
    ],
    startingMoney: 200,
  },
};
