import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changeAnimationSpeed } from 'src/app/state/actions';
import { state } from 'src/app/state/state';

@Component({
  selector: 'app-animation-speed',
  templateUrl: './animation-speed.component.html',
  styleUrls: ['./animation-speed.component.css']
})
export class AnimationSpeedComponent implements OnInit, AfterViewInit {

  currentAnimationSpeedText = "Change Animation Speed";

  defaultAnimationSpeedText = "Change Animation Speed";

  animationSpeedFactor: number = 5;
  animationSpeed = 4;

  isAnimating$!: Observable<boolean>;

  closePanel$!: Observable<number>;

  constructor(private store: Store<{ appStore: state }>) { }

  ngOnInit(): void {
    this.isAnimating$ = this.store.select((state) => state.appStore.isAnimating);
    this.closePanel$ = this.store.select((state) => state.appStore.closePanel);
    this.store.dispatch(changeAnimationSpeed({ speed: 22 }));
  }

  @ViewChild('mep')
  mep!: MatExpansionPanel;

  ngAfterViewInit(): void {
    this.isAnimating$.subscribe(val => {
      if (val) this.mep.expanded = false;
    })
  }

  setAnimationSpeed(speed: number) {
    this.animationSpeedFactor = 10 / speed;
    speed = this.animationSpeedFactor * this.animationSpeed;
    this.store.dispatch(changeAnimationSpeed({ speed }))
  }
}
