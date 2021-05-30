import { Action, createReducer, on, State } from '@ngrx/store';
import { selectMazeAlgorithm, selectPathAlgorithm, changeAnimationSpeed, changeMazeWidth, changeMazeHeight, startAnimation, resetMaze } from './actions';
import { state } from './state';

export const initialState: state = {
    mazeAlgorithm: '',
    pathAlgorithm: '',
    animationSpeed: 4,
    mazeWidth: 0,
    mazeHeight: 0,
    startAnimation: false,
    reset: false,
    isAnimating: false,
    isAlgorithmSet: false,
    traversalArray: [],
    searchPaths: [],
    bestPath: [],
}

const _appReducer = createReducer(
    initialState,
    on(selectMazeAlgorithm, (state, { alg }) => ({ ...state, mazeAlgorithm: alg })),
    on(selectPathAlgorithm, (state, { alg }) => ({ ...state, pathAlgorithm: alg })),
    on(changeAnimationSpeed, (state, { speed }) => ({ ...state, animationSpeed: speed })),
    on(changeMazeWidth, (state, { width }) => ({ ...state, mazeWidth: width })),
    on(changeMazeHeight, (state, { height }) => ({ ...state, mazeHeight: height })),
    on(startAnimation, (state, { start }) => ({ ...state, startAnimation: start })),
    on(resetMaze, (state, { reset }) => ({ ...state, reset: reset })),
)

export function appReducer(state: state | undefined, action: Action) {
    return _appReducer(state, action);
}