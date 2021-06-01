import { Action, createReducer, on, State } from '@ngrx/store';
import { changeAnimationSpeed, changeMazeWidth, changeMazeHeight, resetMaze, setMazeMaxWidth, setMazeMaxHeight, createMaze, animateMaze, animateMazeComplete, createPath, animatePath, animatePathComplete, resetPath, resetMazeComplete } from './actions';
import { state } from './state';

export const initialState: state = {
    animateMaze: false,
    animatePath: false,

    animateButtonText: 'Animate',
    resetButtonText: 'Reset',

    animationSpeed: 4,
    mazeWidth: 0,
    mazeHeight: 0,
    mazeMaxWidth: 0,
    mazeMaxHeight: 0,

    resetPath: false,
    resetMaze: false,

    isAnimating: false,
    isMazeAlgorithmSet: false,
    isPathAlgorithmSet: false,
    isMazeGenerated: false,
    isPathGenerated: false,

    traversalArray: [],
    searchPaths: [],
    bestPath: [],
}

const _appReducer = createReducer(
    initialState,
    on(createMaze, (state, { array }) => ({ ...state, traversalArray: array, isMazeAlgorithmSet: true, animateButtonText: 'Animate Maze' })),

    on(animateMaze, (state) => ({ ...state, isAnimating: true, animateMaze: true })),

    on(animateMazeComplete, (state) => ({ ...state, isMazeGenerated: true, isAnimating: false, isMazeAlgorithmSet: false, animateMaze: false, animateButtonText: 'Animate', resetButtonText: 'Reset Maze' })),

    on(createPath, (state, { searchPath, bestPath }) => ({ ...state, searchPaths: searchPath, bestPath, isPathAlgorithmSet: true, animateButtonText: 'Animate Path' })),

    on(animatePath, (state) => ({ ...state, animatePath: true, isAnimating: true, isPathGenerated: true })),

    on(animatePathComplete, (state) => ({ ...state, isPathAlgorithmSet: false, animatePath: false, isAnimating: false, animateButtonText: 'Animate', resetButtonText: 'Reset Path' })),

    on(changeAnimationSpeed, (state, { speed }) => ({ ...state, animationSpeed: speed })),

    on(changeMazeWidth, (state, { width }) => ({ ...state, mazeWidth: width })),

    on(changeMazeHeight, (state, { height }) => ({ ...state, mazeHeight: height })),

    on(resetMaze, (state) => ({ ...state, resetMaze: true })),

    on(resetMazeComplete, (state) => ({ ...state, isPathAlgorithmSet: false, resetMaze: false, animateButtonText: 'Animate Maze', resetButtonText: 'Reset', isMazeGenerated: false, isMazeAlgorithmSet: true })),

    on(resetPath, (state) => ({ ...state, resetPath: true })),

    on(setMazeMaxWidth, (state, { width }) => ({ ...state, mazeMaxWidth: width })),

    on(setMazeMaxHeight, (state, { height }) => ({ ...state, mazeMaxHeight: height })),
)

export function appReducer(state: state | undefined, action: Action) {
    return _appReducer(state, action);
}


