import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { animateMaze, animatePath, resetMaze } from 'src/app/state/actions';
import { state } from 'src/app/state/state';

@Component({
  selector: 'app-button-container',
  templateUrl: './button-container.component.html',
  styleUrls: ['./button-container.component.css']
})
export class ButtonContainerComponent implements OnInit {

  isAnimating$!: Observable<boolean>;

  isAlgorithmSet$!: Observable<boolean>;

  isPathAlgorithmSet: boolean = false;

  constructor(private store: Store<{ appStore: state }>) { }

  ngOnInit(): void {
    this.isAnimating$ = this.store.select((state) => state.appStore.isAnimating);
    this.isAlgorithmSet$ = this.store.select((state) => state.appStore.isMazeAlgorithmSet);
    this.store.select(state => state.appStore.isPathAlgorithmSet).subscribe(val => this.isPathAlgorithmSet = val);
  }

  startAnimation() {
    if (this.isPathAlgorithmSet) {
      this.store.dispatch(animatePath());
    } else {
      this.store.dispatch(animateMaze());
    }
  }

  resetAll() {
    this.store.dispatch(resetMaze({ reset: true }));
  }
}
