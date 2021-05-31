import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BinaryTree } from 'src/app/algorithms/mazeGeneration/BinaryTree';
import { RandomizedDepthFirst } from 'src/app/algorithms/mazeGeneration/RandomizedDepthFirst';
import { RandomizedPrim } from 'src/app/algorithms/mazeGeneration/RandomizedPrim';
import { RandomizedKruskal } from 'src/app/algorithms/mazeGeneration/RandomizerKruskal\'s';
import { createMaze } from 'src/app/state/actions';
import { state } from 'src/app/state/state';

@Component({
  selector: 'app-maze-algo',
  templateUrl: './maze-algo.component.html',
  styleUrls: ['./maze-algo.component.css']
})
export class MazeAlgoComponent implements OnInit {

  currentMazeAlgorithmText = "Select Maze Generation Algorithm";

  defaultMazeAlgorithmText = "Select Maze Generation Algorithm";

  isMazeGenerated$!: Observable<boolean>;

  mazeWidth = 0;

  mazeHeight = 0;

  traversalArray: number[][] = [];

  constructor(private store: Store<{ appStore: state }>,
    private randomizedDepthFirst: RandomizedDepthFirst,
    private binaryTree: BinaryTree,
    private randomizedKruskal: RandomizedKruskal,
    private randomizedPrim: RandomizedPrim,
  ) { }

  ngOnInit(): void {
    this.isMazeGenerated$ = this.store.select((state) => state.appStore.isMazeGenerated);
    this.store.select((state) => state.appStore.mazeWidth).subscribe(width => this.mazeWidth = width);
    this.store.select((state) => state.appStore.mazeHeight).subscribe(height => this.mazeHeight = height);
  }

  createRandomizedDFSMaze() {
    this.traversalArray = [];

    this.randomizedDepthFirst.createMaze(
      this.mazeWidth,
      this.mazeHeight,
      this.traversalArray
    );

    this.store.dispatch(createMaze({ array: this.traversalArray }));

    this.currentMazeAlgorithmText = "Randomized Depth First";
  }

  createBinarySearchMaze() {
    this.traversalArray = [];

    this.binaryTree.createMaze(this.mazeWidth, this.mazeHeight, this.traversalArray);

    this.store.dispatch(createMaze({ array: this.traversalArray }));

    this.currentMazeAlgorithmText = "Binary Tree";
  }

  createRandomizedKruskalMaze() {
    this.traversalArray = [];

    this.randomizedKruskal.createMaze(
      this.mazeWidth,
      this.mazeHeight,
      this.traversalArray
    );

    this.store.dispatch(createMaze({ array: this.traversalArray }));

    this.currentMazeAlgorithmText = "Randomized Kruskal's";
  }

  createRandomizedPrimsMaze() {
    this.traversalArray = [];

    this.randomizedPrim.createMaze(
      this.mazeWidth,
      this.mazeHeight,
      this.traversalArray
    );

    this.store.dispatch(createMaze({ array: this.traversalArray }));

    this.currentMazeAlgorithmText = "Randomized Prim's"
  }
}
