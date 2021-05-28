import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RandomizedDepthFirst } from './algorithms/mazeGeneration/RandomizedDepthFirst';
import { BinaryTree } from './algorithms/mazeGeneration/BinaryTree';
import { Helper } from './algorithms/utility/helper';
import { RandomizedKruskal } from "./algorithms/mazeGeneration/RandomizerKruskal's";
import { RandomizedPrim } from './algorithms/mazeGeneration/RandomizedPrim';
import { BreadthFirstSearch } from './algorithms/pathFinder/BreadthFirstSearch';
import { NodePath } from './algorithms/utility/Node';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DepthFirstSearch } from './algorithms/pathFinder/DepthFirstSearch';
import { AStar } from './algorithms/pathFinder/AStar';
import { GreedyBestFirstSearch } from './algorithms/pathFinder/GreedyBestFirstSearch';

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
    private breadthFirstSearch: BreadthFirstSearch,
    private depthFirstSearch: DepthFirstSearch,
    private aStarSearch: AStar,
    private greedyBestFirstSearch: GreedyBestFirstSearch,
  ) { }

  defaultAnimationSpeedText = "Change Animation Speed";
  defaultMazeAlgorithmText = "Select Maze Generation Algorithm";
  defaultPathAlgorithmText = "Select Path Finding Algorithm";
  defaultMazeWidthHeightText = "Select Maze Width/Height";

  currentAnimationSpeedText = "Change Animation Speed";
  currentMazeAlgorithmText = "Select Maze Generation Algorithm";
  currentPathAlgorithmText = "Select Path Finding Algorithm";
  currentMazeWidthHeightText = "Select Maze Width/Height";

  panelOpenState = false;
  currentNumOfBoxColumn = 0;
  currentNumOfBoxRow = 0;
  maxNumOfBoxColumn = 70;
  maxNumOfBoxRow = 0;

  mazeWidthInPx = 500;
  boxWidthAndHeightInPx = 0;

  animationSpeed = 4;

  isAnimating = false;
  isAlgorithmSet = false;

  length: number[] = [];
  traversalArray: number[][] = [];

  animationSpeedFactor: number = 5;

  setAnimationSpeed(speed: number) {
    this.animationSpeedFactor = 10 / speed;
  }

  ngAfterViewInit(): void {
    this.setWidthData();
    this.setHeightData();
    this.setLength();
  }

  setHeightData() {
    const viewPortHeight = window.screen.height;

    this.maxNumOfBoxRow = Math.floor((0.75 * viewPortHeight) / (this.boxWidthAndHeightInPx + 2));
    this.currentNumOfBoxRow = Math.floor(this.maxNumOfBoxRow / 2) + 3;
  }

  setWidthData() {
    const width = this.mazeContainer.nativeElement.offsetWidth;

    if (width < 600) {
      this.maxNumOfBoxColumn = 20;
    } else if (width < 1000) {
      this.maxNumOfBoxColumn = 30;
    }

    const widthMinusBorder = width - this.maxNumOfBoxColumn * 2;

    this.boxWidthAndHeightInPx = Math.floor(widthMinusBorder / this.maxNumOfBoxColumn);
    this.currentNumOfBoxColumn = Math.floor(this.maxNumOfBoxColumn / 2) + 3;
    this.mazeWidthInPx = (this.boxWidthAndHeightInPx + 2) * this.currentNumOfBoxColumn;
  }

  @ViewChild('mazeContainer')
  mazeContainer!: ElementRef;


  setLength() {
    this.length = Array.from(Array(this.currentNumOfBoxColumn * this.currentNumOfBoxRow).keys());
  }

  resetAll() {
    this.isAlgorithmSet = false;
    this.isAnimating = false;
    this.resetAllText();
    this.resetMaze();
  }

  resetAllText() {
    this.currentMazeAlgorithmText = this.defaultMazeAlgorithmText;
    this.currentAnimationSpeedText = this.defaultAnimationSpeedText;
    this.currentMazeWidthHeightText = this.defaultMazeWidthHeightText;
    this.currentPathAlgorithmText = this.defaultPathAlgorithmText;
  }

  resetMaze() {
    for (let i = 0; i < this.length.length; i++) {
      const boxId = this.length[i];
      const ele = document.getElementById('box' + boxId);
      if (ele !== null) ele.className = 'box';
    }
  }

  setWidth(width: number | null) {
    this.traversalArray = [];
    this.resetAll();
    this.currentNumOfBoxColumn = Number(width);

    this.mazeWidthInPx = (this.boxWidthAndHeightInPx + 2) * this.currentNumOfBoxColumn;

    this.setLength();
  }

  setHeight(height: number | null) {
    this.traversalArray = [];
    this.resetAll();
    this.currentNumOfBoxRow = Number(height);
    this.setLength();
  }


  createRandomizedDFSMaze() {
    this.traversalArray = [];
    this.randomizedDepthFirst.createMaze(
      this.currentNumOfBoxColumn,
      this.currentNumOfBoxRow,
      this.traversalArray
    );
    this.isAlgorithmSet = true;

    this.currentMazeAlgorithmText = "Randomized Depth First";
  }

  createBinarySearchMaze() {
    this.traversalArray = [];
    this.binaryTree.createMaze(this.currentNumOfBoxColumn, this.currentNumOfBoxRow, this.traversalArray);
    this.isAlgorithmSet = true;

    this.currentMazeAlgorithmText = "Binary Tree";
  }

  createRandomizedKruskalMaze() {
    this.traversalArray = [];
    this.randomizedKruskal.createMaze(
      this.currentNumOfBoxColumn,
      this.currentNumOfBoxRow,
      this.traversalArray
    );
    this.isAlgorithmSet = true;

    this.currentMazeAlgorithmText = "Randomized Kruskal's";
  }

  createRandomizedPrimsMaze() {
    this.traversalArray = [];
    this.randomizedPrim.createMaze(
      this.currentNumOfBoxColumn,
      this.currentNumOfBoxRow,
      this.traversalArray
    );
    this.isAlgorithmSet = true;

    this.currentMazeAlgorithmText = "Randomized Prim's"
  }


  bfs() {
    let paths = this.breadthFirstSearch.findPath(this.currentNumOfBoxColumn, this.currentNumOfBoxRow, this.traversalArray);
    this.animatePathFinder(paths.searchPath, paths.bestPath);
  }

  dfs() {
    let paths = this.depthFirstSearch.findPath(this.currentNumOfBoxColumn, this.currentNumOfBoxRow, this.traversalArray);
    this.animatePathFinder(paths.searchPath, paths.bestPath);
  }

  aStar() {
    let paths = this.aStarSearch.findPath(this.currentNumOfBoxColumn, this.currentNumOfBoxRow, this.traversalArray);
    this.animatePathFinder(paths.searchPath, paths.bestPath);
  }

  greedy() {
    let paths = this.greedyBestFirstSearch.findPath(this.currentNumOfBoxColumn, this.currentNumOfBoxRow, this.traversalArray);
    this.animatePathFinder(paths.searchPath, paths.bestPath);
  }


  async animatePathFinder(allPaths: NodePath[], bestPath: NodePath[]) {

    for (let i = 0; i < allPaths.length; i++) {

      const nodePath = allPaths[i];

      const fromCell = nodePath.node;
      const toCell = nodePath.nextNode;
      const direction = nodePath.direction;

      const directionStringArr = Helper.getDirectionStringArr(direction);

      document.getElementById('box' + fromCell)?.classList.add(directionStringArr[0] + 'border-collapse-all-paths');
      document.getElementById('box' + toCell)?.classList.add(directionStringArr[1] + 'border-collapse-all-paths');

      await new Promise((r) => setTimeout(r, this.animationSpeed * this.animationSpeedFactor));
    }

    await new Promise((r) => setTimeout(r, 1000));

    for (let i = 0; i < bestPath.length; i++) {

      const nodePath = bestPath[i];

      const fromCell = nodePath.node;
      const toCell = nodePath.nextNode;
      const direction = nodePath.direction;

      const directionStringArr = Helper.getDirectionStringArr(direction);

      document.getElementById('box' + fromCell)?.classList.add(directionStringArr[0] + 'border-collapse-best-path');
      document.getElementById('box' + toCell)?.classList.add(directionStringArr[1] + 'border-collapse-best-path');

      await new Promise((r) => setTimeout(r, this.animationSpeed * this.animationSpeedFactor));
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

      if (traversal.length == 4) {
        document.getElementById('box' + fromCell)?.classList.add(directionStringArr[0] + 'border-collapse-black');
        document.getElementById('box' + toCell)?.classList.add(directionStringArr[1] + 'border-collapse-black');
      } else {
        document.getElementById('box' + fromCell)?.classList.add(directionStringArr[0] + 'border-collapse');
        document.getElementById('box' + toCell)?.classList.add(directionStringArr[1] + 'border-collapse');
      }

      await new Promise((r) => setTimeout(r, this.animationSpeed * this.animationSpeedFactor));
    }
    this.isAnimating = false;
  }
}
