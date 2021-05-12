import { Component, OnInit } from '@angular/core';
import { RandomizedDepthFirst } from './algorithms/RandomizedDepthFirst';
import { BinaryTree } from './algorithms/BinaryTree';
import { Helper } from './algorithms/utility/helper';
import { RandomizedKruskal } from "./algorithms/RandomizerKruskal's";
import { RandomizedPrim } from './algorithms/RandomizedPrim';

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
    private randomizedKruskal: RandomizedKruskal,
    private randomizedPrim: RandomizedPrim
  ) {}

  width = 22;

  height = 22;

  animateSpeed = 10;

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

  createNodeGraph() {

    let graph = new Map();

    this.traversalArray.forEach((data) => {
      if(data.length == 4) {

        const fromNode = data[0];
        const toNode = data[1];
        const direction = data[2];

        if(graph.has(fromNode)) {
          graph.get(fromNode).add(toNode);
          graph.get(fromNode).add(direction);
        } else {
          graph.set(fromNode, new Set());
          graph.get(fromNode).add(toNode);
          graph.get(fromNode).add(direction);
        }

        if(graph.has(toNode)) {
          graph.get(toNode).add(fromNode);
          graph.get(toNode).add(direction);
        } else {
          graph.set(toNode, new Set());
          graph.get(toNode).add(fromNode);
          graph.get(toNode).add(direction);
        }

      }
    })

    this.bfs(graph);
    console.log(graph)
  }

  bfs(graph: Map<number, Set<number>>) {

    let path: number[] = [];

    let bestRoute = new Map();
    let visited = new Set();

    let frontier:number[] = [];

    frontier.push(0);
    

    let parent: number | undefined = -1;

    while(frontier.length > 0) {

      const node = frontier.shift();
      
      path.push(node === undefined ? 0 : node);

      bestRoute.set(node, parent);

      parent = node;
      
      if(node === (this.width * this.height -1)) break;

      visited.add(node);

     
      if( node !== undefined) {

        graph.get(node)?.forEach(adjacentNode => {

          if(!visited.has(adjacentNode)) {
            frontier.push(adjacentNode);
          }

        })
      }

    }

    let bestPath: number[] = []

    while(parent !== -1) {

      if(parent !== undefined) {
        bestPath.push(parent);
      }
      
      parent = bestRoute.get(parent);

    }

    console.log(path)

    this.animatePathFinder(path, bestPath);

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

  async animatePathFinder(path: number[], bestPath: number[]) {

    for (let i = 0; i < path.length; i++) {

      const node = path[i];
      const domElement = document.getElementById('box' + node);

      if(domElement !== null) {
        domElement.classList.add('boxPath')
      }

      await new Promise((r) => setTimeout(r, this.animateSpeed));
    }

    bestPath.reverse();

    for (let i = 0; i < bestPath.length; i++) {

      const node = bestPath[i];
      const domElement = document.getElementById('box' + node);

      if(domElement !== null) {
        domElement.classList.add('bestPath')
      }

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
