import { createAction, props } from '@ngrx/store';
import { NodePath } from '../algorithms/utility/Node';

export const createMaze = createAction('[Maze Algo Component] Create Maze', props<{ array: number[][] }>());

export const animateMaze = createAction('[Maze Algo Component] Animate Maze');

export const animateMazeComplete = createAction('[Maze Algo Component] Animate Maze Complete');

export const resetMaze = createAction('[Maze Algo Component] Reset Maze');

export const resetMazeComplete = createAction('[Maze Algo Component] Reset Maze Complete');

export const createPath = createAction('[Path Algo Component] Create Path', props<{ searchPath: NodePath[], bestPath: NodePath[] }>());

export const animatePath = createAction('[Path Algo Component] Animate Path');

export const animatePathComplete = createAction('[Path Algo Component] Animate Path Complete');

export const resetPath = createAction('[Path Algo Component] Reset Path');

export const changeAnimationSpeed = createAction('[Animation Speed Component] Change Animation Speed', props<{ speed: number }>());

export const changeMazeWidth = createAction('[Maze Size Component] Change Maze Width', props<{ width: number }>());

export const changeMazeHeight = createAction('[Maze Size Component] Change Maze Height', props<{ height: number }>());

export const setMazeMaxWidth = createAction('[App Compononent] Set Maze Max Width', props<{ width: number }>());

export const setMazeMaxHeight = createAction('[App Compononent] Set Maze Max Height', props<{ height: number }>());

