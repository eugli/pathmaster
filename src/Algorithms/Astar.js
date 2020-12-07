// Performs A* search algorithm: similar to Dijkstra, but with
// an added heuristic to search paths that are more likely to
// reach the finish node first.
// Returns all visited nodes in order for visualization, and
// has nodes point to previous node to determine what the
// shortest path was.

import { PriorityQueue } from "./priorityqueue.js";
import { getNeighbors, dist } from "./getneighbors.js";

//following pseudocode from https://en.wikipedia.org/wiki/A*_search_algorithm
//heuristic is distance to target node
//isWeighted is a boolean, if true it will perform a weighted A* search
//if false, it will perform an unweighted A* search
export function astar(grid, start, end, pieceType, isWeighted) {
  let visitedNodes = [];
  let cmp = (a, b) => a.distance + a.heuristic < b.distance + b.heuristic;
  let openSet = new PriorityQueue(cmp);
  start.distance = 0;
  openSet.push(start);
  while (!openSet.empty()) {
    let curr = openSet.pop();
    if (curr.isVisited) continue;
    curr.isVisited = true;
    visitedNodes.push(curr);
    if (curr === end) return visitedNodes;
    updateNeighbors(curr, grid, pieceType, isWeighted);
    let neighbors = getValidNeighbors(curr, grid, pieceType);
    for (let n of neighbors) {
      openSet.push(n);
    }
  }
  return visitedNodes;
}

function updateNeighbors(node, grid, pieceType, isWeighted) {
  let unvisitedNeighbors = getValidNeighbors(node, grid, pieceType);
  for (let neighbor of unvisitedNeighbors) {
    let newDistance = 1;
    if (isWeighted) newDistance = node.distance + dist(neighbor, node);
    else newDistance = node.distance + 1;
    if (newDistance < neighbor.distance) {
      neighbor.distance = newDistance;
      neighbor.previousNode = node;
    }
  }
}

function getValidNeighbors(node, grid, pieceType) {
  //update neighbors according to piece movement
  //third parameter is pieceType: capitalized word
  let neighbors = getNeighbors(node, grid, pieceType);
  return neighbors.filter((n) => !n.isVisited && !n.isWall);
}
