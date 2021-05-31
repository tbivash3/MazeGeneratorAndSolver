import { NodePath } from "../algorithms/utility/Node";

export interface state {
    animateButtonText: string,
    animationSpeed: number,
    isAnimating: boolean,

    mazeWidth: number,
    mazeHeight: number,
    mazeMaxWidth: number,
    mazeMaxHeight: number,

    animateMaze: boolean,
    isMazeAlgorithmSet: boolean,
    isMazeGenerated: boolean,

    reset: boolean,

    isPathAlgorithmSet: boolean,
    animatePath: boolean,

    traversalArray: number[][],
    searchPaths: NodePath[],
    bestPath: NodePath[],
}
