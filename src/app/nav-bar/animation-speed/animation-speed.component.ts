import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changeAnimationSpeed } from 'src/app/state/actions';
import { state } from 'src/app/state/state';

@Component({
  selector: 'app-animation-speed',
  templateUrl: './animation-speed.component.html',
  styleUrls: ['./animation-speed.component.css']
})
export class AnimationSpeedComponent implements OnInit {

  currentAnimationSpeedText = "Change Animation Speed";

  animationSpeedFactor: number = 5;
  animationSpeed = 4;

  isAnimating$!: Observable<boolean>;

  constructor(private store: Store<{ appStore: state }>) { }

  ngOnInit(): void {
    this.isAnimating$ = this.store.select((state) => state.appStore.isAnimating);
  }

  setAnimationSpeed(speed: number) {
    this.animationSpeedFactor = 10 / speed;
    speed = this.animationSpeedFactor * this.animationSpeed;
    this.store.dispatch(changeAnimationSpeed({ speed }))
  }

}
