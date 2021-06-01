import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Helper } from './algorithms/utility/helper';
import { NodePath } from './algorithms/utility/Node';
import { Store } from '@ngrx/store';
import { state } from './state/state';
import { animateMazeComplete, animatePathComplete, changeMazeHeight, changeMazeWidth, setMazeMaxHeight, setMazeMaxWidth } from './state/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'MazeGeneratorAndSolver';

  defaultAnimationSpeedText = "Change Animation Speed";
  defaultMazeAlgorithmText = "Select Maze Generation Algorithm";
  defaultPathAlgorithmText = "Select Path Finding Algorithm";
  defaultMazeWidthHeightText = "Select Maze Width/Height";

  panelOpenState = false;
  currentNumOfBoxColumn = 0;
  currentNumOfBoxRow = 0;
  maxNumOfBoxColumn = 60;
  maxNumOfBoxRow = 0;

  mazeWidthInPx = 500;
  boxWidthAndHeightInPx = 0;

  animationSpeed = 0;

  isAnimating = false;
  isAlgorithmSet = false;

  length: number[] = [];
  traversalArray: number[][] = [];

  searchPaths: NodePath[] = [];
  bestPath: NodePath[] = [];

  constructor(
    private store: Store<{ appStore: state }>,
  ) { }

  ngOnInit(): void {
    this.store.select((state) => state.appStore.traversalArray).subscribe(array => this.traversalArray = array);
    this.store.select((state) => state.appStore.searchPaths).subscribe(array => this.searchPaths = array);
    this.store.select((state) => state.appStore.bestPath).subscribe(array => this.bestPath = array);

    this.store.select((state) => state.appStore.animateMaze).subscribe((val) => {
      if (val) this.animateMazeGeneration();
    });

    this.store.select((state) => state.appStore.animatePath).subscribe((val) => {
      if (val) this.animatePathFinder();
    });

    this.store.select((state) => state.appStore.animationSpeed).subscribe(speed => {
      this.animationSpeed = speed;
    })

    this.store.select((state) => state.appStore.mazeWidth).subscribe(width => {
      this.setWidth(width);
    })

    this.store.select((state) => state.appStore.mazeHeight).subscribe(height => {
      this.setHeight(height);
    })
  }



  ngAfterViewInit(): void {
    this.setWidthData();
    this.setHeightData();
    this.setLength();
  }

  setHeightData() {
    const viewPortHeight = window.screen.height;

    this.maxNumOfBoxRow = Math.floor((0.75 * viewPortHeight) / (this.boxWidthAndHeightInPx + 2));
    this.currentNumOfBoxRow = Math.floor(this.maxNumOfBoxRow / 2) + 3;

    this.store.dispatch(setMazeMaxHeight({ height: this.maxNumOfBoxRow }));
    this.store.dispatch(changeMazeHeight({ height: this.currentNumOfBoxRow }));
  }

  setWidthData() {
    const width = this.mazeContainer.nativeElement.offsetWidth;

    if (width < 600) {
      this.maxNumOfBoxColumn = 20;
    } else if (width < 1000) {
      this.maxNumOfBoxColumn = 30;
    }

    const widthMinusBorder = width - this.maxNumOfBoxColumn * 2;

    this.boxWidthAndHeightInPx = Math.floor(widthMinusBorder / this.maxNumOfBoxColumn);
    this.currentNumOfBoxColumn = Math.floor(this.maxNumOfBoxColumn / 2) + 3;
    this.mazeWidthInPx = (this.boxWidthAndHeightInPx + 2) * this.currentNumOfBoxColumn;

    this.store.dispatch(setMazeMaxWidth({ width: this.maxNumOfBoxColumn }));
    this.store.dispatch(changeMazeWidth({ width: this.currentNumOfBoxColumn }));
  }

  @ViewChild('mazeContainer')
  mazeContainer!: ElementRef;


  setLength() {
    this.length = Array.from(Array(this.currentNumOfBoxColumn * this.currentNumOfBoxRow).keys());
  }

  resetAll() {
    this.isAlgorithmSet = false;
    this.isAnimating = false;
    this.resetMaze();
  }

  resetMaze() {
    for (let i = 0; i < this.length.length; i++) {
      const boxId = this.length[i];
      const ele = document.getElementById('box' + boxId);
      if (ele !== null) ele.className = 'box';
    }
  }

  setWidth(width: number | null) {
    this.traversalArray = [];
    this.resetAll();
    this.currentNumOfBoxColumn = Number(width);

    this.mazeWidthInPx = (this.boxWidthAndHeightInPx + 2) * this.currentNumOfBoxColumn;

    this.setLength();
  }

  setHeight(height: number | null) {
    this.traversalArray = [];
    this.resetAll();
    this.currentNumOfBoxRow = Number(height);
    this.setLength();
  }

  async animatePathFinder() {

    for (let i = 0; i < this.searchPaths.length; i++) {

      const nodePath = this.searchPaths[i];

      const fromCell = nodePath.node;
      const toCell = nodePath.nextNode;
      const direction = nodePath.direction;

      const directionStringArr = Helper.getDirectionStringArr(direction);

      document.getElementById('box' + fromCell)?.classList.add(directionStringArr[0] + 'border-collapse-all-paths');
      document.getElementById('box' + toCell)?.classList.add(directionStringArr[1] + 'border-collapse-all-paths');

      await new Promise((r) => setTimeout(r, this.animationSpeed));
    }

    await new Promise((r) => setTimeout(r, 1000));

    for (let i = 0; i < this.bestPath.length; i++) {

      const nodePath = this.bestPath[i];

      const fromCell = nodePath.node;
      const toCell = nodePath.nextNode;
      const direction = nodePath.direction;

      const directionStringArr = Helper.getDirectionStringArr(direction);

      document.getElementById('box' + fromCell)?.classList.add(directionStringArr[0] + 'border-collapse-best-path');
      document.getElementById('box' + toCell)?.classList.add(directionStringArr[1] + 'border-collapse-best-path');

      await new Promise((r) => setTimeout(r, this.animationSpeed));
    }
    this.store.dispatch(animatePathComplete());
  }

  async animateMazeGeneration() {
    this.resetAll();
    for (let i = 0; i < this.traversalArray.length; i++) {
      const traversal = this.traversalArray[i];

      const fromCell = traversal[0];
      const toCell = traversal[1];
      const direction = traversal[2];

      const directionStringArr = Helper.getDirectionStringArr(direction);

      if (traversal.length == 4) {
        document.getElementById('box' + fromCell)?.classList.add(directionStringArr[0] + 'border-collapse-black');
        document.getElementById('box' + toCell)?.classList.add(directionStringArr[1] + 'border-collapse-black');
      } else {
        document.getElementById('box' + fromCell)?.classList.add(directionStringArr[0] + 'border-collapse');
        document.getElementById('box' + toCell)?.classList.add(directionStringArr[1] + 'border-collapse');
      }

      await new Promise((r) => setTimeout(r, this.animationSpeed));
    }

    this.store.dispatch(animateMazeComplete());
  }
}
