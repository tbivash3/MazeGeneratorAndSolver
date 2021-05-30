import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './state/reducer';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MazeAlgoComponent } from './nav-bar/maze-algo/maze-algo.component';
import { PathAlgoComponent } from './nav-bar/path-algo/path-algo.component';
import { AnimationSpeedComponent } from './nav-bar/animation-speed/animation-speed.component';
import { ButtonContainerComponent } from './nav-bar/button-container/button-container.component';
import { MazeSizeComponent } from './nav-bar/maze-size/maze-size.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MazeAlgoComponent,
    PathAlgoComponent,
    AnimationSpeedComponent,
    ButtonContainerComponent,
    MazeSizeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonModule,
    StoreModule.forRoot({ appStore: appReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
