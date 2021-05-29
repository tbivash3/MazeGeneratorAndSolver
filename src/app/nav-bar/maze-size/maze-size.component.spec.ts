import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeSizeComponent } from './maze-size.component';

describe('MazeSizeComponent', () => {
  let component: MazeSizeComponent;
  let fixture: ComponentFixture<MazeSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MazeSizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
