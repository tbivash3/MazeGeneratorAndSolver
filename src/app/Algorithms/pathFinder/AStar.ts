import { Injectable } from '@angular/core';
import { NodePath } from '../utility/Node';
import { Utility } from './Utility';
import TinyQueue from 'tinyqueue';

@Injectable({ providedIn: 'root' })
export class AStar {
    constructor(private utility: Utility) { }

    findPath(width: number, height: number, traversalArray: number[][]) {

        let graph = this.utility.createNodeGraph(width, height, traversalArray);

        let searchPath: NodePath[] = [];

        let queue = this.getPriorityQueue();

        this.search(graph, 0, width * height - 1, new Set(), searchPath, queue);

        let bestPath = this.utility.findBestPath(searchPath, width * height - 1);;

        return { searchPath, bestPath };
    }

    search(graph: Map<number, NodePath[]>, source: number, destination: number, visited: Set<number>, searchPath: NodePath[], queue: TinyQueue<NodePath>) {

        let sourceNodePaths = graph.get(source) || [];

        visited.add(source);

        sourceNodePaths.forEach(path => {

            if (!visited.has(path.nextNode)) {
                queue.push(path);
            }

        })

        const node = queue.pop();

        if (node) {
            searchPath.push(node);

            if (node.nextNode == destination) {
                return;
            }
        }

        this.search(graph, node?.nextNode || 0, destination, visited, searchPath, queue);
    }

    getPriorityQueue() {
        return new TinyQueue([], function (a: NodePath, b: NodePath) {
            const totalDistA = a.distFromSource + a.distFromDestination;
            const totalDistB = b.distFromSource + b.distFromDestination;

            return totalDistA - totalDistB;
        });
    }
}


