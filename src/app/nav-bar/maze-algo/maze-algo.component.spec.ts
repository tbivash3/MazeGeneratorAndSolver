import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeAlgoComponent } from './maze-algo.component';

describe('MazeAlgoComponent', () => {
  let component: MazeAlgoComponent;
  let fixture: ComponentFixture<MazeAlgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MazeAlgoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeAlgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
