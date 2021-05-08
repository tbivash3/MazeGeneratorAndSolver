import { Component, OnInit } from '@angular/core';
import { RandomizedDepthFirst } from './algorithms/RandomizedDepthFirst';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'MazeGeneratorAndSolver';

  constructor(private randomizedDepthFirst: RandomizedDepthFirst) {}

  width = 15;

  height = 15;

  length: number[] = [];

  traversalArray: number[][] = [];

  ngOnInit() {
    this.setLength();
  }

  setLength() {
    this.length = Array.from(Array(this.width * this.height).keys());
  }

  resetMaze() {
    for (let i = 0; i < this.length.length; i++) {
      const boxId = this.length[i];
      const ele = document.getElementById('box' + boxId);
      if (ele !== null) ele.className = 'box';
    }
  }

  setWidth(width: string) {
    this.resetMaze();
    this.width = Number(width);
    let el = document.getElementById('maze');

    if (el !== null) {
      el.style.width = this.width * 27 + 'px';
    }

    this.setLength();
  }

  setHeight(height: string) {
    this.resetMaze();
    this.height = Number(height);
    this.setLength();
  }

  createMaze() {
    this.randomizedDepthFirst.createMaze(
      this.width,
      this.height,
      this.traversalArray
    );
  }

  async animate() {
    this.resetMaze();
    this.createMaze();

    for (let i = 0; i < this.traversalArray.length; i++) {
      const traversal = this.traversalArray[i];

      const fromCell = traversal[0];
      const toCell = traversal[1];
      const direction = traversal[2];

      const directionStringArr = this.getDirectionStringArr(direction);

      if (traversal.length == 4) {
        document
          .getElementById('box' + fromCell)
          ?.classList.add(directionStringArr[0] + 'border-collapse-black');
        document
          .getElementById('box' + toCell)
          ?.classList.add(directionStringArr[1] + 'border-collapse-black');
      } else {
        document
          .getElementById('box' + fromCell)
          ?.classList.add(directionStringArr[0] + 'border-collapse');
        document
          .getElementById('box' + toCell)
          ?.classList.add(directionStringArr[1] + 'border-collapse');
      }
      await new Promise((r) => setTimeout(r, 0));
    }

    this.traversalArray = [];
  }

  getDirectionStringArr(direction: number) {
    let arr = [];

    if (direction == 1) arr.push('top-', 'bottom-');

    if (direction == 2) arr.push('right-', 'left-');

    if (direction == 3) arr.push('bottom-', 'top-');

    if (direction == 4) arr.push('left-', 'right-');

    return arr;
  }
}
