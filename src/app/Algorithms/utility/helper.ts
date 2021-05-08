import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Helper {
  static TOP = 1;

  static RIGHT = 2;

  static BOTTOM = 3;

  static LEFT = 4;

  static isTopRowElement(width: number, cell: number) {
    return cell < width;
  }

  static isBottomRowElement(width: number, height: number, cell: number) {
    return cell >= width * (height - 1);
  }

  static isLeftColumnElement(width: number, cell: number) {
    return cell % width == 0;
  }

  static isRightColumnElement(width: number, cell: number) {
    return (cell + 1) % width == 0;
  }

  static getAdjacentCells(currentCell: number, width: number, height: number) {
    let top = currentCell - width;
    let right = currentCell + 1;
    let bottom = currentCell + width;
    let left = currentCell - 1;

    let adjacents = [];

    if (!Helper.isTopRowElement(width, currentCell)) {
      adjacents.push(top);
    }

    if (!Helper.isRightColumnElement(width, currentCell)) {
      adjacents.push(right);
    }

    if (!Helper.isBottomRowElement(width, height, currentCell)) {
      adjacents.push(bottom);
    }

    if (!Helper.isLeftColumnElement(width, currentCell)) {
      adjacents.push(left);
    }

    return adjacents;
  }

  static findDirection(
    currentCell: number,
    adjacentCell: number,
    width: number
  ) {
    let direction = 0;

    if (currentCell == adjacentCell - 1) direction = Helper.RIGHT;

    if (currentCell == adjacentCell + 1) direction = Helper.LEFT;

    if (currentCell == adjacentCell + width) direction = Helper.TOP;

    if (currentCell == adjacentCell - width) direction = Helper.BOTTOM;

    return direction;
  }

  static getDirectionStringArr(direction: number) {
    let arr = [];

    if (direction == 1) arr.push('top-', 'bottom-');

    if (direction == 2) arr.push('right-', 'left-');

    if (direction == 3) arr.push('bottom-', 'top-');

    if (direction == 4) arr.push('left-', 'right-');

    return arr;
  }

  static shuffle(array: number[]) {
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
}
