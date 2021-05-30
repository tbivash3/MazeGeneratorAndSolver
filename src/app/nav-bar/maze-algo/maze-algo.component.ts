import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BinaryTree } from 'src/app/algorithms/mazeGeneration/BinaryTree';
import { RandomizedDepthFirst } from 'src/app/algorithms/mazeGeneration/RandomizedDepthFirst';
import { RandomizedPrim } from 'src/app/algorithms/mazeGeneration/RandomizedPrim';
import { RandomizedKruskal } from 'src/app/algorithms/mazeGeneration/RandomizerKruskal\'s';
import { setAlgorithmSet, setTraversalArray } from 'src/app/state/actions';
import { state } from 'src/app/state/state';

@Component({
  selector: 'app-maze-algo',
  templateUrl: './maze-algo.component.html',
  styleUrls: ['./maze-algo.component.css']
})
export class MazeAlgoComponent implements OnInit {

  currentMazeAlgorithmText = "Select Maze Generation Algorithm";

  isAnimating$!: Observable<boolean>;

  isAlgorithmSet$!: Observable<boolean>;

  mazeWidth$!: Observable<number>;

  mazeHeight$!: Observable<number>;

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
    this.isAnimating$ = this.store.select((state) => state.appStore.isAnimating);
    this.isAlgorithmSet$ = this.store.select((state) => state.appStore.isAlgorithmSet);
    this.mazeWidth$ = this.store.select((state) => state.appStore.mazeWidth);
    this.mazeHeight$ = this.store.select((state) => state.appStore.mazeHeight);
  }

  createRandomizedDFSMaze() {
    this.setMazeWidthHeight();
    this.traversalArray = [];

    this.randomizedDepthFirst.createMaze(
      this.mazeWidth,
      this.mazeHeight,
      this.traversalArray
    );

    this.store.dispatch(setTraversalArray({ array: this.traversalArray }));

    this.store.dispatch(setAlgorithmSet({ val: true }));
    this.currentMazeAlgorithmText = "Randomized Depth First";
  }

  createBinarySearchMaze() {
    this.setMazeWidthHeight();
    this.traversalArray = [];

    this.binaryTree.createMaze(this.mazeWidth, this.mazeHeight, this.traversalArray);

    this.store.dispatch(setTraversalArray({ array: this.traversalArray }));

    this.store.dispatch(setAlgorithmSet({ val: true }));
    this.currentMazeAlgorithmText = "Binary Tree";
  }

  createRandomizedKruskalMaze() {
    this.setMazeWidthHeight();
    this.traversalArray = [];

    this.randomizedKruskal.createMaze(
      this.mazeWidth,
      this.mazeHeight,
      this.traversalArray
    );
    this.store.dispatch(setTraversalArray({ array: this.traversalArray }));

    this.store.dispatch(setAlgorithmSet({ val: true }));
    this.currentMazeAlgorithmText = "Randomized Kruskal's";
  }

  createRandomizedPrimsMaze() {
    this.setMazeWidthHeight();
    this.traversalArray = [];

    this.randomizedPrim.createMaze(
      this.mazeWidth,
      this.mazeHeight,
      this.traversalArray
    );
    this.store.dispatch(setTraversalArray({ array: this.traversalArray }));

    this.store.dispatch(setAlgorithmSet({ val: true }));
    this.currentMazeAlgorithmText = "Randomized Prim's"
  }

  setMazeWidthHeight() {
    this.mazeWidth$.subscribe(width => this.mazeWidth = width);
    this.mazeHeight$.subscribe(height => this.mazeHeight = height);
  }
}
