export interface state {
    mazeAlgorithm: string,
    pathAlgorithm: string,
    animationSpeed: number,
    mazeWidth: number,
    mazeHeight: number,
    startAnimation: boolean,
    reset: boolean,
    isAnimating: boolean,
    isAlgorithmSet: boolean,
    traversalArray: [],
    searchPaths: [],
    bestPath: [],
}
