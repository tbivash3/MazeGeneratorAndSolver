import { Injectable } from '@angular/core';
import { Helper } from './utility/helper';

@Injectable({ providedIn: 'root' })
export class RandomizedDepthFirst {
  constructor() {}

  createMaze(width: number, height: number, traversalArray: number[][]) {
    this.dfs(new Set(), 0, width, height, traversalArray);
  }

  dfs(
    visited: Set<number>,
    currentCell: number,
    width: number,
    height: number,
    traversalArray: number[][]
  ) {
    let adjacentCells = Helper.getAdjacentCells(currentCell, width, height);
    adjacentCells = Helper.shuffle(adjacentCells);

    visited.add(currentCell);

    let visitedAdjacentsArray = [];

    for (let i = 0; i < adjacentCells.length; i++) {
      const adjacentCell = adjacentCells[i];
      if (!visited.has(adjacentCell)) {
        let direction = Helper.findDirection(currentCell, adjacentCell, width);

        traversalArray.push([currentCell, adjacentCell, direction]);

        this.dfs(visited, adjacentCell, width, height, traversalArray);
        visitedAdjacentsArray.push([currentCell, adjacentCell, direction, 0]);
      }
    }

    visitedAdjacentsArray.reverse();
    traversalArray.push(...visitedAdjacentsArray);
  }
}
