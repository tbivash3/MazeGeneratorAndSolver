import { Injectable } from '@angular/core';
import { Helper } from '../utility/helper';
import { NodePath } from '../utility/Node';
import { Utility } from './Utility';

@Injectable({ providedIn: 'root' })
export class DepthFirstSearch {
    constructor(private utility: Utility) { }

    bestPathIndex = -1;
    searchPathIndex = -1;

    findPath(width: number, height: number, traversalArray: number[][]) {

        let graph = this.utility.createNodeGraph(width, height, traversalArray);

        let searchPath: NodePath[] = [];

        let allPaths: NodePath[][] = [];
        allPaths.push([]);

        this.search(graph, 0, width * height - 1, new Set(), searchPath, allPaths, 0);

        const bestPath = allPaths[this.bestPathIndex];

        searchPath = searchPath.splice(0, this.searchPathIndex + 1);

        return { searchPath, bestPath };
    }

    search(graph: Map<number, NodePath[]>, source: number, destination: number, visited: Set<number>, searchPath: NodePath[], allPaths: NodePath[][], parentPathIndex: number) {

        let sourceNodePaths = graph.get(source) || [];

        visited.add(source);

        sourceNodePaths.forEach(path => {

            if (!visited.has(path.nextNode)) {

                searchPath.push(path);

                allPaths.push([path, ...allPaths[parentPathIndex]]);

                if (path.nextNode == destination) {
                    this.bestPathIndex = allPaths.length - 1;
                    this.searchPathIndex = searchPath.length - 1;
                    return;
                }

                this.search(graph, path.nextNode, destination, visited, searchPath, allPaths, allPaths.length - 1);
            }

        })
    }
}
