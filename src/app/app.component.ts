import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RandomizedDepthFirst } from './algorithms/mazeGeneration/RandomizedDepthFirst';
import { BinaryTree } from './algorithms/mazeGeneration/BinaryTree';
import { Helper } from './algorithms/utility/helper';
import { RandomizedKruskal } from "./algorithms/mazeGeneration/RandomizerKruskal's";
import { RandomizedPrim } from './algorithms/mazeGeneration/RandomizedPrim';
import { BreadthFirstSearch } from './algorithms/pathFinder/BreadthFirstSearch';
import { NodePath } from './algorithms/utility/Node';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'MazeGeneratorAndSolver';

  constructor(
    private randomizedDepthFirst: RandomizedDepthFirst,
    private binaryTree: BinaryTree,
    private randomizedKruskal: RandomizedKruskal,
    private randomizedPrim: RandomizedPrim,
    private breadthFirstSearch: BreadthFirstSearch
  ) {}

  boxSize = 0;

  width = 22;

  mazeWidth = 500;

  height = 22;

  animateSpeed = 0;

  isAnimating = false;

  isAlgorithmSet = false;

  maxWidth = 30;

  length: number[] = [];

  traversalArray: number[][] = [];

  ngAfterViewInit(): void {
    const width = this.mazeContainer.nativeElement.offsetWidth;


    const widthMinusBorder = width - this.maxWidth * 2

    this.boxSize = Math.floor(widthMinusBorder / this.maxWidth);
    console.log(this.boxSize);

    this.setLength();

  }

  @ViewChild('mazeContainer')
  mazeContainer!: ElementRef;


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

  createRandomizedPrimsMaze() {
    this.traversalArray = [];
    this.randomizedPrim.createMaze(
      this.width,
      this.height,
      this.traversalArray
    );
    this.isAlgorithmSet = true;
  }


  bfs() {
    let paths = this.breadthFirstSearch.findPath(0, this.width * this.height - 1, this.traversalArray );
    this.animatePathFinder(paths.searchPath, paths.bestPath);
  }

  async animatePathFinder(allPaths: NodePath[], bestPath: NodePath[]) {

    for (let i = 1; i < allPaths.length; i++) {

      const nodePath = allPaths[i];

      const fromCell = nodePath.node;
      const toCell = nodePath.nextNode;
      const direction = nodePath.direction;

      const directionStringArr = Helper.getDirectionStringArr(direction);
      
      document.getElementById('box' + fromCell)?.classList.add(directionStringArr[0] + 'border-collapse-all-paths');
      document.getElementById('box' + toCell)?.classList.add(directionStringArr[1] + 'border-collapse-all-paths');

      await new Promise((r) => setTimeout(r, this.animateSpeed));
    }

    await new Promise((r) => setTimeout(r, 2000));
    for (let i = 1; i < bestPath.length; i++) {

      const nodePath = bestPath[i];

      const fromCell = nodePath.node;
      const toCell = nodePath.nextNode;
      const direction = nodePath.direction;

      const directionStringArr = Helper.getDirectionStringArr(direction);
      
      document.getElementById('box' + fromCell)?.classList.add(directionStringArr[0] + 'border-collapse-best-path');
      document.getElementById('box' + toCell)?.classList.add(directionStringArr[1] + 'border-collapse-best-path');

      await new Promise((r) => setTimeout(r, this.animateSpeed));
    }
  }

  async animateMazeGeneration() {
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
