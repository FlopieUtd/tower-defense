export interface ResearchType {
  name: string;
  label: string;
}

export const researchTypes = [
  { name: "damage", label: "Damage" },
  { name: "fire-rate", label: "Fire rate" },
  { name: "range", label: "Range" },
  { name: "rotation-speed", label: "Rotation speed" },
  { name: "price", label: "Price" },
];

export const researchCosts = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
