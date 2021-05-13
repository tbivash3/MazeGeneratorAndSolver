import { Injectable } from '@angular/core';
import { Helper } from '../utility/helper';

@Injectable({ providedIn: 'root' })
export class BinaryTree {
  constructor() {}

  createMaze(width: number, height: number, traversalArray: number[][]) {
    this.binarySearch(0, width, height, traversalArray);
  }

  binarySearch(
    currentCell: number,
    width: number,
    height: number,
    traversalArray: number[][]
  ) {
    if (currentCell == width * height) return;

    let direction = Math.floor(Math.random() * 2);

    if (direction == 0 && !Helper.isRightColumnElement(width, currentCell)) {
      traversalArray.push([currentCell, currentCell + 1, Helper.RIGHT]);
      traversalArray.push([currentCell, currentCell + 1, Helper.RIGHT, 1]);
    } else {
      if (!Helper.isBottomRowElement(width, height, currentCell)) {
        traversalArray.push([
          currentCell,
          currentCell + width,
          Helper.BOTTOM,
          1,
        ]);
      } else {
        if (currentCell != width * height - 1) {
          traversalArray.push([currentCell, currentCell + 1, Helper.RIGHT]);
          traversalArray.push([currentCell, currentCell + 1, Helper.RIGHT, 1]);
        }
      }
    }

    this.binarySearch(currentCell + 1, width, height, traversalArray);
  }
}
