export interface NodePath {
    node: number,
    nextNode: number,
    parentNode?: number,
    direction: number,
    distFromSource: number,
    distFromDestination: number,
}