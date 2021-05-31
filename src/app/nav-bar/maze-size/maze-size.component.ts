import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changeMazeHeight, changeMazeWidth } from 'src/app/state/actions';
import { state } from 'src/app/state/state';

@Component({
  selector: 'app-maze-size',
  templateUrl: './maze-size.component.html',
  styleUrls: ['./maze-size.component.css']
})
export class MazeSizeComponent implements OnInit {
  currentMazeWidthHeightText = "Select Maze Width/Height";

  isAnimating$!: Observable<boolean>;

  isAlgorithmSet$!: Observable<boolean>;

  mazeWidth$!: Observable<number>;

  mazeHeight$!: Observable<number>;

  mazeMaxWidth$!: Observable<number>;

  mazeMaxHeight$!: Observable<number>;

  constructor(private store: Store<{ appStore: state }>) { }

  ngOnInit(): void {
    this.isAnimating$ = this.store.select((state) => state.appStore.isAnimating);
    this.isAlgorithmSet$ = this.store.select((state) => state.appStore.isMazeAlgorithmSet);
    this.mazeWidth$ = this.store.select((state) => state.appStore.mazeWidth);
    this.mazeHeight$ = this.store.select((state) => state.appStore.mazeHeight);
    this.mazeMaxWidth$ = this.store.select((state) => state.appStore.mazeMaxWidth);
    this.mazeMaxHeight$ = this.store.select((state) => state.appStore.mazeMaxHeight);
  }

  setHeight(height: number) {

    this.store.dispatch(changeMazeHeight({ height }));
  }

  setWidth(width: number) {
    this.store.dispatch(changeMazeWidth({ width }));
  }
}
