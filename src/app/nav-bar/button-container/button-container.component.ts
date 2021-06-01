import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { animateMaze, animatePath, resetMaze, resetPath } from 'src/app/state/actions';
import { state } from 'src/app/state/state';

@Component({
  selector: 'app-button-container',
  templateUrl: './button-container.component.html',
  styleUrls: ['./button-container.component.css']
})
export class ButtonContainerComponent implements OnInit {

  animateText$!: Observable<string>;

  resetText$!: Observable<string>;

  isMazeAlgorithmSet: boolean = false;

  isPathAlgorithmSet: boolean = false;

  isMazeGenerated = false;

  isPathGenerated = false;

  isAnimating = false;

  constructor(private store: Store<{ appStore: state }>) { }

  ngOnInit(): void {
    this.animateText$ = this.store.select((state) => state.appStore.animateButtonText);
    this.resetText$ = this.store.select(state => state.appStore.resetButtonText);
    this.store.select(state => state.appStore.isPathAlgorithmSet).subscribe(val => this.isPathAlgorithmSet = val);
    this.store.select(state => state.appStore.isMazeAlgorithmSet).subscribe(val => this.isMazeAlgorithmSet = val);
    this.store.select(state => state.appStore.isAnimating).subscribe(val => this.isAnimating = val);
    this.store.select(state => state.appStore.isMazeGenerated).subscribe(val => this.isMazeGenerated = val);
    this.store.select(state => state.appStore.isPathGenerated).subscribe(val => this.isPathGenerated = val);
  }

  startAnimation() {
    if (this.isPathAlgorithmSet) {
      this.store.dispatch(animatePath());
    } else {
      this.store.dispatch(animateMaze());
    }
  }

  resetAll() {
    if (this.isPathGenerated) {
      this.store.dispatch(resetPath());
    }
    else {
      this.store.dispatch(resetMaze());
    }
  }
}
