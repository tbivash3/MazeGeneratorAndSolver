import { Injectable } from '@angular/core';
import { FormControlDirective } from '@angular/forms';
import { Helper } from '../utility/helper';

@Injectable({ providedIn: 'root' })
export class RandomizedPrim {
  constructor() { }

  createMaze(width: number, height: number, traversalArray: number[][]) {
    let visited = new Set<number>();
    let frontier: number[][] = [];

    this.visit(0, width, height, traversalArray, visited, frontier);
  }

  visit(
    currentCell: number,
    width: number,
    height: number,
    traversalArray: number[][],
    visited: Set<number>,
    frontier: number[][]
  ) {
    visited.add(currentCell);

    if (visited.size == width * height) return;

    const adjacentNodes = Helper.getAdjacentCells(currentCell, width, height);

    adjacentNodes.forEach((node) => {
      if (!visited.has(node)) {
        frontier.push([currentCell, node]);
      }
    });

    let randomIndex = Math.floor(Math.random() * frontier.length);

    let randomEdge = frontier[randomIndex];

    while (true) {
      if (visited.has(randomEdge[0]) && visited.has(randomEdge[1])) {
        frontier.splice(randomIndex, 1);
        randomIndex = Math.floor(Math.random() * frontier.length);
        randomEdge = frontier[randomIndex];
      } else {
        break;
      }
    }

    const direction = Helper.findDirection(randomEdge[0], randomEdge[1], width);

    traversalArray.push([randomEdge[0], randomEdge[1], direction, 1]);

    frontier.splice(randomIndex, 1);

    this.visit(randomEdge[1], width, height, traversalArray, visited, frontier);
  }
}
