import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RandomizedDepthFirst {
  static TOP = 1;

  static RIGHT = 2;

  static BOTTOM = 3;

  static LEFT = 4;

  topRow = [];

  rightColumn = [];

  bottomRow = [];

  leftColumn = [];

  constructor() {}

  isTopRowElement(width: number, cell: number) {
    return cell < width;
  }

  isBottomRowElement(width: number, height: number, cell: number) {
    return cell >= width * (height - 1);
  }

  isLeftColumnElement(width: number, cell: number) {
    return cell % width == 0;
  }

  isRightColumnElement(width: number, cell: number) {
    return (cell + 1) % width == 0;
  }

  createMaze(width: number, height: number) {
    this.dfs([], 0, width, height);
  }

  dfs(visited: number[], currentCell: number, width: number, height: number) {
    let adjacentCells = this.getAdjacentCells(currentCell, width, height);
    adjacentCells = this.shuffle(adjacentCells);
  }

  shuffle(array: number[]) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  getAdjacentCells(currentCell: number, width: number, height: number) {
    let top = currentCell - width;
    let right = currentCell + 1;
    let bottom = currentCell + width;
    let left = currentCell - 1;

    let adjacents = [];

    if (!this.isTopRowElement(width, currentCell)) {
      adjacents.push(top);
    }

    if (!this.isRightColumnElement(width, currentCell)) {
      adjacents.push(right);
    }

    if (!this.isBottomRowElement(width, height, currentCell)) {
      adjacents.push(bottom);
    }

    if (!this.isLeftColumnElement(width, currentCell)) {
      adjacents.push(left);
    }

    return adjacents;
  }
}
