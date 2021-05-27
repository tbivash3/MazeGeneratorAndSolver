import { Injectable } from '@angular/core';
import { NodePath } from '../utility/Node';
import { Utility } from './Utility';

@Injectable({ providedIn: 'root' })
export class AStar {
    constructor(private utility: Utility) { }

    findPath(width: number, height: number, traversalArray: number[][]) {

        let graph = this.utility.createNodeGraph(width, height, traversalArray);

        return this.search(graph, 0, width * height - 1);
    }

    search(graph: Map<number, NodePath[]>, source: number, destination: number) {


    }


}
