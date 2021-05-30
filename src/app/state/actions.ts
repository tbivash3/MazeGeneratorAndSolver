import { createAction, props } from '@ngrx/store';
import { NodePath } from '../algorithms/utility/Node';

export const selectMazeAlgorithm = createAction('[Maze Algo Component] Select Maze Algorithm', props<{ alg: string }>());

export const setTraversalArray = createAction('[Maze Algo Component] Set Traversal Array', props<{ array: number[][] }>())

export const setAlgorithmSet = createAction('[Maze Algo Component] Set Algorithm Set', props<{ val: boolean }>())

export const selectPathAlgorithm = createAction('[Path Algo Component] Select Path Finding Algorithm', props<{ alg: string }>());

export const setSearchPath = createAction('Path Algo Component] Set Search Path', props<{ array: NodePath[] }>())

export const setBestPath = createAction('Path Algo Component] Set Best Path', props<{ array: NodePath[] }>())

export const changeAnimationSpeed = createAction('[Animation Speed Component] Change Animation Speed', props<{ speed: number }>());

export const changeMazeWidth = createAction('[Maze Size Component] Change Maze Width', props<{ width: number }>());

export const changeMazeHeight = createAction('[Maze Size Component] Change Maze Height', props<{ height: number }>());

export const startAnimation = createAction('[Button Container Component] Start Maze Animation');

export const endAnimation = createAction('[App Component] Maze Animation Complete');

export const resetMaze = createAction('[Button Container Component] Reset Maze', props<{ reset: boolean }>());

export const setMazeMaxWidth = createAction('[App Compononent] Set Maze Max Width', props<{ width: number }>());

export const setMazeMaxHeight = createAction('[App Compononent] Set Maze Max Height', props<{ height: number }>());

