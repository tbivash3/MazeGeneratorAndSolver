import { Component, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AStar } from 'src/app/algorithms/pathFinder/AStar';
import { BreadthFirstSearch } from 'src/app/algorithms/pathFinder/BreadthFirstSearch';
import { DepthFirstSearch } from 'src/app/algorithms/pathFinder/DepthFirstSearch';
import { GreedyBestFirstSearch } from 'src/app/algorithms/pathFinder/GreedyBestFirstSearch';
import { createPath } from 'src/app/state/actions';
import { state } from 'src/app/state/state';

@Component({
  selector: 'app-path-algo',
  templateUrl: './path-algo.component.html',
  styleUrls: ['./path-algo.component.css']
})
export class PathAlgoComponent implements OnInit {

  NONE = 0;

  BREADTH_FIRST_SEARCH = 1;
  DEPTH_FIRST_SEARCH = 2;
  A_STAR_SEARCH = 3;
  GREEDY_BEST_FIRST_SEARCH = 4;

  currentAlgorithm = this.NONE;

  currentPathAlgorithmText = "Select Path Finding Algorithm";

  defaultPathAlgorithmText = "Select Path Finding Algorithm";

  mazeWidth!: number;

  mazeHeight!: number;

  isPathGenerated$!: Observable<boolean>

  isMazeGenerated$!: Observable<boolean>;

  isAnimating$!: Observable<boolean>;

  traversalArray: number[][] = [];

  constructor(private store: Store<{ appStore: state }>,
    private breadthFirstSearch: BreadthFirstSearch,
    private depthFirstSearch: DepthFirstSearch,
    private aStarSearch: AStar,
    private greedyBestFirstSearch: GreedyBestFirstSearch,) { }

  ngOnInit(): void {
    this.store.select((state) => state.appStore.mazeWidth).subscribe(width => this.mazeWidth = width);
    this.isMazeGenerated$ = this.store.select((state) => state.appStore.isMazeGenerated);
    this.store.select((state) => state.appStore.mazeHeight).subscribe(height => this.mazeHeight = height);
    this.store.select((state) => state.appStore.traversalArray).subscribe(array => this.traversalArray = array);
    this.isPathGenerated$ = this.store.select((state) => state.appStore.isPathGenerated);
    this.isAnimating$ = this.store.select(state => state.appStore.isAnimating);
    this.store.select(state => state.appStore.resetPath).subscribe(val => {
      if (val) {
        this.currentAlgorithm = this.NONE;
        this.currentPathAlgorithmText = this.defaultPathAlgorithmText;
      }
    })
    this.store.select(state => state.appStore.resetMaze).subscribe(val => {
      if (val) {
        this.currentAlgorithm = this.NONE;
        this.currentPathAlgorithmText = this.defaultPathAlgorithmText;
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

  bfs() {
    let paths = this.breadthFirstSearch.findPath(this.mazeWidth, this.mazeHeight, this.traversalArray);
    this.store.dispatch(createPath({ searchPath: paths.searchPath, bestPath: paths.bestPath }));
    this.currentPathAlgorithmText = "Breadth First Search";
    this.currentAlgorithm = this.BREADTH_FIRST_SEARCH;
  }

  dfs() {
    let paths = this.depthFirstSearch.findPath(this.mazeWidth, this.mazeHeight, this.traversalArray);
    this.store.dispatch(createPath({ searchPath: paths.searchPath, bestPath: paths.bestPath }))
    this.currentPathAlgorithmText = "Depth First Search";
    this.currentAlgorithm = this.DEPTH_FIRST_SEARCH;
  }

  aStar() {
    let paths = this.aStarSearch.findPath(this.mazeWidth, this.mazeHeight, this.traversalArray);
    this.store.dispatch(createPath({ searchPath: paths.searchPath, bestPath: paths.bestPath }));
    this.currentPathAlgorithmText = "A* Search";
    this.currentAlgorithm = this.A_STAR_SEARCH;
  }

  greedy() {
    let paths = this.greedyBestFirstSearch.findPath(this.mazeWidth, this.mazeHeight, this.traversalArray);
    this.store.dispatch(createPath({ searchPath: paths.searchPath, bestPath: paths.bestPath }));
    this.currentPathAlgorithmText = "Greedy Best First Search";
    this.currentAlgorithm = this.GREEDY_BEST_FIRST_SEARCH;
  }
}
