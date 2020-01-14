// eslint-disable-next-line
import { Map, Position } from "../levels";

export interface Circle {
  position: Position;
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

export const arePositionsEqual = (a: Position, b: Position) =>
  Object.keys(a).length === Object.keys(b).length && Object.keys(a).every(key => a[key] === b[key]);

export const getAdjacentPositions = (position: Position, map: Map) => {
  const left = { x: position.x - 1, y: position.y };
  const right = { x: position.x + 1, y: position.y };
  const up = { x: position.x, y: position.y - 1 };
  const down = { x: position.x, y: position.y + 1 };
  const directions = [left, right, up, down];
  return directions.filter(
    (position: Position) =>
      getValueAtPosition(position, map) > 0 && getValueAtPosition(position, map) < 5,
  );
};

export const positionToId = (position: Position) => position.x + position.y * 1000;

export const breadthFirstSearch = (problem: { map: Map; start: Position; end: Position }) => {
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
// // //
export const move = (current: Position, next: Position, speed: number) => {
  const moveSpeed = speed / 100;
  if (current.x < next.x) {
    return { x: Number((current.x += moveSpeed).toFixed(4)), y: current.y };
  }
  if (current.x > next.x) {
    return { x: Number((current.x -= moveSpeed).toFixed(4)), y: current.y };
  }
  if (current.y < next.y) {
    return { x: current.x, y: Number((current.y += moveSpeed).toFixed(4)) };
  }
  if (current.y > next.y) {
    return { x: current.x, y: Number((current.y -= moveSpeed).toFixed(4)) };
  }
};
