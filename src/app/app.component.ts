import { Component, OnInit } from '@angular/core';
import { RandomizedDepthFirst } from './algorithms/RandomizedDepthFirst';
import { BinaryTree } from './algorithms/BinaryTree';
import { Helper } from './algorithms/utility/helper';
import { RandomizedKruskal } from "./algorithms/RandomizerKruskal's";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'MazeGeneratorAndSolver';

  constructor(
    private randomizedDepthFirst: RandomizedDepthFirst,
    private binaryTree: BinaryTree,
    private randomizedKruskal: RandomizedKruskal
  ) {}

  width = 15;

  height = 15;

  animateSpeed = 0;

  isAnimating = false;

  isAlgorithmSet = false;

  length: number[] = [];

  traversalArray: number[][] = [];

  ngOnInit() {
    this.setLength();
  }

  setLength() {
    this.length = Array.from(Array(this.width * this.height).keys());
  }

  resetAll() {
    this.isAlgorithmSet = false;
    this.isAnimating = false;
    this.resetMaze();
  }

  resetMaze() {
    for (let i = 0; i < this.length.length; i++) {
      const boxId = this.length[i];
      const ele = document.getElementById('box' + boxId);
      if (ele !== null) ele.className = 'box';
    }
  }

  setWidth(width: string) {
    this.traversalArray = [];
    this.resetAll();
    this.width = Number(width);
    let el = document.getElementById('maze');

    if (el !== null) {
      el.style.width = this.width * 27 + 'px';
    }

    this.setLength();
  }

  setHeight(height: string) {
    this.traversalArray = [];
    this.resetAll();
    this.height = Number(height);
    this.setLength();
  }

  createRandomizedDFSMaze() {
    this.traversalArray = [];
    this.randomizedDepthFirst.createMaze(
      this.width,
      this.height,
      this.traversalArray
    );
    this.isAlgorithmSet = true;
  }

  createBinarySearchMaze() {
    this.traversalArray = [];
    this.binaryTree.createMaze(this.width, this.height, this.traversalArray);
    this.isAlgorithmSet = true;
  }

  createRandomizedKruskalMaze() {
    this.traversalArray = [];
    this.randomizedKruskal.createMaze(
      this.width,
      this.height,
      this.traversalArray
    );
    this.isAlgorithmSet = true;
  }

  async animate() {
    this.resetAll();
    this.isAnimating = true;
    for (let i = 0; i < this.traversalArray.length; i++) {
      const traversal = this.traversalArray[i];

      const fromCell = traversal[0];
      const toCell = traversal[1];
      const direction = traversal[2];

      const directionStringArr = Helper.getDirectionStringArr(direction);

      await new Promise((r) => setTimeout(r, this.animateSpeed));
      if (traversal.length == 4) {
        document
          .getElementById('box' + fromCell)
          ?.classList.add(directionStringArr[0] + 'border-collapse-black');
        await new Promise((r) => setTimeout(r, this.animateSpeed));
        document
          .getElementById('box' + toCell)
          ?.classList.add(directionStringArr[1] + 'border-collapse-black');
      } else {
        document
          .getElementById('box' + fromCell)
          ?.classList.add(directionStringArr[0] + 'border-collapse');
        await new Promise((r) => setTimeout(r, this.animateSpeed));
        document
          .getElementById('box' + toCell)
          ?.classList.add(directionStringArr[1] + 'border-collapse');
      }
    }
    this.isAnimating = false;
  }
}
