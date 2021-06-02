import { NodePath } from "../algorithms/utility/Node";

export interface state {

    closePanel: number,

    animateButtonText: string,
    resetButtonText: string,

    animationSpeed: number,
    isAnimating: boolean,

    mazeWidth: number,
    mazeHeight: number,
    mazeMaxWidth: number,
    mazeMaxHeight: number,

    animateMaze: boolean,
    isMazeAlgorithmSet: boolean,
    isMazeGenerated: boolean,
    resetMaze: boolean,

    isPathAlgorithmSet: boolean,
    animatePath: boolean,
    resetPath: boolean,
    isPathGenerated: boolean,

    traversalArray: number[][],
    searchPaths: NodePath[],
    bestPath: NodePath[],
}
