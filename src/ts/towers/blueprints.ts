import { TowerBlueprint } from "../state/TowerBlueprint";

export const towerBlueprints: TowerBlueprint[] = [
  {
    type: "turret",
    label: "Turret",
    damagePerShot: 25,
    shootsEveryNthTick: 25,
    radius: 1.5,
    price: 50,
    colors: ["#00d89a", "#19ffbd"],
    armorPiercing: false,
    targets: ["air", "ground"],
    rotationSpeed: 3,
    barrelWidth: 3,
    barrelLength: 10,
  },
  {
    type: "flamethrower",
    label: "Flamethrower",
    damagePerShot: 1.6,
    shootsEveryNthTick: 1,
    radius: 1.2,
    price: 60,
    colors: ["#ff446a", "#fe7c96"],
    armorPiercing: false,
    targets: ["ground"],
    rotationSpeed: 4,
    barrelWidth: 4,
    barrelLength: 9,
  },
  {
    type: "sniper",
    label: "Sniper",
    damagePerShot: 250,
    shootsEveryNthTick: 150,
    radius: 3,
    price: 80,
    colors: ["#13cbff", "#66ddfe"],
    armorPiercing: false,
    targets: ["ground"],
    rotationSpeed: 8,
    barrelWidth: 3,
    barrelLength: 12,
  },
  {
    type: "cannon",
    label: "Cannon",
    damagePerShot: 400,
    shootsEveryNthTick: 150,
    radius: 2,
    price: 100,
    colors: ["#972ce8", "#b569ee"],
    armorPiercing: true,
    targets: ["ground"],
    rotationSpeed: 3,
    barrelWidth: 4,
    barrelLength: 11,
  },
  {
    type: "anti-air",
    label: "Anti-Air",
    damagePerShot: 50,
    shootsEveryNthTick: 20,
    radius: 2,
    price: 60,
    colors: ["#ff41ff", "#ff87ff"],
    armorPiercing: false,
    targets: ["air"],
    rotationSpeed: 4,
    barrelWidth: 5,
    barrelLength: 7,
  },
];
