import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { resetMaze, startAnimation } from 'src/app/state/actions';
import { state } from 'src/app/state/state';

@Component({
  selector: 'app-button-container',
  templateUrl: './button-container.component.html',
  styleUrls: ['./button-container.component.css']
})
export class ButtonContainerComponent implements OnInit {

  isAnimating$!: Observable<boolean>;

  isAlgorithmSet$!: Observable<boolean>;

  constructor(private store: Store<{ appStore: state }>) { }

  ngOnInit(): void {
    this.isAnimating$ = this.store.select((state) => state.appStore.isAnimating);
    this.isAlgorithmSet$ = this.store.select((state) => state.appStore.isAlgorithmSet);
  }

  animateMazeGeneration() {
    this.store.dispatch(startAnimation());
  }

  resetAll() {
    this.store.dispatch(resetMaze({ reset: true }));
  }
}
