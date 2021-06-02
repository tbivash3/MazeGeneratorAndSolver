import { Component, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
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

  NONE = 0;

  DEPTH_FIRST_SEARCH = 1;
  BINARY_TREE = 2;
  RANDOMIZED_KRUSKALS = 3;
  RANDOMIZED_PRIMS = 4;

  currentMazeAlgorithmText = "Select Maze Generation Algorithm";

  defaultMazeAlgorithmText = "Select Maze Generation Algorithm";

  isAnimating$!: Observable<boolean>;

  isMazeGenerated$!: Observable<boolean>;

  mazeWidth = 0;

  mazeHeight = 0;

  currentAlgorithm = this.NONE;

  traversalArray: number[][] = [];

  constructor(private store: Store<{ appStore: state }>,
    private randomizedDepthFirst: RandomizedDepthFirst,
    private binaryTree: BinaryTree,
    private randomizedKruskal: RandomizedKruskal,
    private randomizedPrim: RandomizedPrim,
  ) { }

  ngOnInit(): void {
    this.isAnimating$ = this.store.select((state) => state.appStore.isAnimating);
    this.isMazeGenerated$ = this.store.select((state) => state.appStore.isMazeGenerated);
    this.store.select((state) => state.appStore.mazeWidth).subscribe(width => this.mazeWidth = width);
    this.store.select((state) => state.appStore.mazeHeight).subscribe(height => this.mazeHeight = height);
    this.store.select(state => state.appStore.resetMaze).subscribe(val => {
      if (val) {
        this.currentAlgorithm = this.NONE;
        this.currentMazeAlgorithmText = this.defaultMazeAlgorithmText;
      }
    })
  }

  @ViewChild('mep')
  mep!: MatExpansionPanel;

  ngAfterViewInit(): void {
    this.isAnimating$.subscribe(val => {
      if (val) this.mep.expanded = false;
    })
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
    this.currentAlgorithm = this.DEPTH_FIRST_SEARCH;
  }

  createBinarySearchMaze() {
    this.traversalArray = [];

    this.binaryTree.createMaze(this.mazeWidth, this.mazeHeight, this.traversalArray);

    this.store.dispatch(createMaze({ array: this.traversalArray }));

    this.currentMazeAlgorithmText = "Binary Tree";
    this.currentAlgorithm = this.BINARY_TREE;
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
    this.currentAlgorithm = this.RANDOMIZED_KRUSKALS;
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
    this.currentAlgorithm = this.RANDOMIZED_PRIMS;
  }
}
