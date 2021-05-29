import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathAlgoComponent } from './path-algo.component';

describe('PathAlgoComponent', () => {
  let component: PathAlgoComponent;
  let fixture: ComponentFixture<PathAlgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathAlgoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PathAlgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
