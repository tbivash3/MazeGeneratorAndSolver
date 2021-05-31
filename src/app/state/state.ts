import { NodePath } from "../algorithms/utility/Node";

export interface state {
    animateButtonText: string,
    animationSpeed: number,
    isAnimating: boolean,

    animateMaze: boolean,

    animatePath: boolean,

    mazeWidth: number,
    mazeHeight: number,

    mazeMaxWidth: number,
    mazeMaxHeight: number,

    startAnimation: boolean,
    reset: boolean,

    isMazeAlgorithmSet: boolean,

    isPathAlgorithmSet: boolean,

    isMazeGenerated: boolean,

    traversalArray: number[][],
    searchPaths: NodePath[],
    bestPath: NodePath[],
}
