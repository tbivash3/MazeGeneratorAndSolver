import { Injectable } from '@angular/core';
import { Helper } from '../utility/helper';

@Injectable({ providedIn: 'root' })
export class RecursiveDivision {
  constructor() {}

  createMaze(width: number, height: number, traversalArray: number[][]) {
    this.divide(0, width - 1, 0, height -1, traversalArray);
  }

  divide(
    columnStartIndex: number,
    columnEndIndex: number,
    rowStartIndex: number,
    rowEndIndex: number,
    traversalArray: number[][]
  ) {

    if(columnStartIndex == columnEndIndex || rowStartIndex == rowEndIndex) return;

    let direction = Math.floor(Math.random() * 2);

    //Column divide
    if(direction == 0) {

      let columnNumber = Math.floor(Math.random() * (columnEndIndex - columnStartIndex + 1)) + columnStartIndex;

      let boxNumber = Math.floor(Math.random() * (rowEndIndex - rowStartIndex + 1)) + rowStartIndex;

      

      this.divide(columnStartIndex, columnNumber -1, rowStartIndex, rowEndIndex, traversalArray);
      this.divide(columnNumber + 1, columnEndIndex, rowStartIndex, rowEndIndex, traversalArray);

    } else {

      let rowNumber = Math.floor(Math.random() * (rowEndIndex - rowStartIndex + 1)) + rowStartIndex;

      this.divide(columnStartIndex, columnEndIndex, rowStartIndex, rowNumber - 1, traversalArray);
      this.divide(columnStartIndex, columnEndIndex, rowNumber + 1, rowEndIndex, traversalArray);

    }
  }
}
