import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationSpeedComponent } from './animation-speed.component';

describe('AnimationSpeedComponent', () => {
  let component: AnimationSpeedComponent;
  let fixture: ComponentFixture<AnimationSpeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimationSpeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
