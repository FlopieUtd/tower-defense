import { Map, PositionType } from "../levels"; // eslint-disable-line

export interface Circle {
  position: PositionType;
  radius: number;
}

export const getUniquePosition = (map: Map, key: number) => {
  let x: number;
  let y: number;
  map.forEach((row: number[], index: number) => {
    if (row.includes(key)) {
      y = index;
      x = row.indexOf(key);
    }
  });
  return { x, y };
};

export const getValueAtPosition = ({ x, y }, map: Map) => (map[y] ? map[y][x] : null);

export const arePositionsEqual = (a: PositionType, b: PositionType) =>
  Object.keys(a).length === Object.keys(b).length && Object.keys(a).every(key => a[key] === b[key]);

export const getAdjacentPositions = (position: PositionType, map: Map) => {
  const left = { x: position.x - 1, y: position.y };
  const right = { x: position.x + 1, y: position.y };
  const up = { x: position.x, y: position.y - 1 };
  const down = { x: position.x, y: position.y + 1 };
  const directions = [left, right, up, down];
  return directions.filter(
    (position: PositionType) =>
      getValueAtPosition(position, map) > 0 && getValueAtPosition(position, map) < 5,
  );
};

export const positionToId = (position: PositionType) => position.x + position.y * 1000;

export const breadthFirstSearch = (problem: {
  map: Map;
  start: PositionType;
  end: PositionType;
}) => {
  const { map, start, end } = problem;
  const closed = new Set();
  const queue = [];
  queue.push({ position: start, path: [] });
  while (queue.length) {
    const node = queue.shift();
    const { position, path } = node;
    if (arePositionsEqual(position, end)) {
      return path;
    }
    if (!closed.has(positionToId(position))) {
      closed.add(positionToId(position));
      getAdjacentPositions(position, map).forEach(neighbour => {
        queue.push({ position: neighbour, path: path.concat([neighbour]) });
      });
    }
  }
  // No path possible
  throw new Error("No path possible with BFS!");
};

export const areColliding = (a: Circle, b: Circle) => {
  const distanceX = a.position.x - b.position.x;
  const distanceY = a.position.y - b.position.y;
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  return distance < a.radius + b.radius;
};

export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);
