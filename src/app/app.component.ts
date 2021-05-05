import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'MazeGeneratorAndSolver';

  width = 31;

  height = 20;

  length = Array.from(Array(this.width * this.height).keys());

  ngOnInit() {}

  ngAfterViewInit(): void {
    console.log(document.getElementById('box100'));
    document.getElementById('box100')?.classList.add('right-border-collapse');
    document.getElementById('box100')?.classList.add('left-border-collapse');
    document.getElementById('box100')?.classList.add('top-border-collapse');
    document.getElementById('box100')?.classList.add('button-border-collapse');
  }
}
