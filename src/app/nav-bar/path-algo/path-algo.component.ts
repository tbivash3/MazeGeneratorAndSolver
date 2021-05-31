import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AStar } from 'src/app/algorithms/pathFinder/AStar';
import { BreadthFirstSearch } from 'src/app/algorithms/pathFinder/BreadthFirstSearch';
import { DepthFirstSearch } from 'src/app/algorithms/pathFinder/DepthFirstSearch';
import { GreedyBestFirstSearch } from 'src/app/algorithms/pathFinder/GreedyBestFirstSearch';
import { setBestPath, setSearchPath } from 'src/app/state/actions';
import { state } from 'src/app/state/state';

@Component({
  selector: 'app-path-algo',
  templateUrl: './path-algo.component.html',
  styleUrls: ['./path-algo.component.css']
})
export class PathAlgoComponent implements OnInit {

  currentPathAlgorithmText = "Select Path Finding Algorithm";

  defaultPathAlgorithmText = "Select Path Finding Algorithm";

  mazeWidth!: number;

  mazeHeight!: number;

  isAnimating$!: Observable<boolean>;

  isAlgorithmSet$!: Observable<boolean>;

  traversalArray: number[][] = [];

  constructor(private store: Store<{ appStore: state }>,
    private breadthFirstSearch: BreadthFirstSearch,
    private depthFirstSearch: DepthFirstSearch,
    private aStarSearch: AStar,
    private greedyBestFirstSearch: GreedyBestFirstSearch,) { }

  ngOnInit(): void {
    this.store.select((state) => state.appStore.mazeWidth).subscribe(width => this.mazeWidth = width);
    this.store.select((state) => state.appStore.mazeHeight).subscribe(height => this.mazeHeight = height);
    this.isAnimating$ = this.store.select((state) => state.appStore.isAnimating);
    this.isAlgorithmSet$ = this.store.select((state) => state.appStore.isAlgorithmSet);
    this.store.select((state) => state.appStore.traversalArray).subscribe(array => this.traversalArray = array);
  }

  bfs() {
    let paths = this.breadthFirstSearch.findPath(this.mazeWidth, this.mazeHeight, this.traversalArray);
    this.store.dispatch(setSearchPath({ array: paths.searchPath }));
    this.store.dispatch(setBestPath({ array: paths.bestPath }));

    this.currentPathAlgorithmText = "Breadth First Search";
  }

  dfs() {
    let paths = this.depthFirstSearch.findPath(this.mazeWidth, this.mazeHeight, this.traversalArray);
    this.store.dispatch(setSearchPath({ array: paths.searchPath }));
    this.store.dispatch(setBestPath({ array: paths.bestPath }));

    this.currentPathAlgorithmText = "Depth First Search";
  }

  aStar() {
    let paths = this.aStarSearch.findPath(this.mazeWidth, this.mazeHeight, this.traversalArray);
    this.store.dispatch(setSearchPath({ array: paths.searchPath }));
    this.store.dispatch(setBestPath({ array: paths.bestPath }));

    this.currentPathAlgorithmText = "A* First Search";
  }

  greedy() {
    let paths = this.greedyBestFirstSearch.findPath(this.mazeWidth, this.mazeHeight, this.traversalArray);
    this.store.dispatch(setSearchPath({ array: paths.searchPath }));
    this.store.dispatch(setBestPath({ array: paths.bestPath }));

    this.currentPathAlgorithmText = "Greedy Best First Search";
  }
}
