import { NodePath } from "../algorithms/utility/Node";

export interface state {
    mazeAlgorithm: string,
    pathAlgorithm: string,
    animationSpeed: number,

    mazeWidth: number,
    mazeHeight: number,

    mazeMaxWidth: number,
    mazeMaxHeight: number,

    startAnimation: boolean,
    reset: boolean,
    isAnimating: boolean,
    isAlgorithmSet: boolean,
    traversalArray: number[][],
    searchPaths: NodePath[],
    bestPath: NodePath[],
}
