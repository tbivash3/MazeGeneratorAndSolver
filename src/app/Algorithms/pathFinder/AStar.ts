import { Injectable } from '@angular/core';
import { NodePath } from '../utility/Node';
import { Utility } from './Utility';
import TinyQueue from 'tinyqueue';

@Injectable({ providedIn: 'root' })
export class AStar {
    constructor(private utility: Utility) { }

    finalNode: any;

    findPath(width: number, height: number, traversalArray: number[][]) {

        let graph = this.utility.createNodeGraph(width, height, traversalArray);

        let searchPath: NodePath[] = [];

        let allPaths: NodePath[][] = [];
        allPaths.push([]);

        let queue = this.getPriorityQueue();

        this.search(graph, 0, width * height - 1, new Set(), searchPath, queue);

        const bestPath = this.findBestPath(graph, 0, this.finalNode);

        return { searchPath, bestPath };
    }

    findBestPath(graph: Map<number, NodePath[]>, source: number, destination: number) {

        let bestPath: NodePath[] = [];
        bestPath.push(this.finalNode);

        while (true) {

            if (destination == source) break;

            graph.get(destination)?.forEach(path => {

                if (path.parentNode) {
                    bestPath.push(path);
                    destination = path.parentNode;
                }

            })

        }

        return bestPath;

    }

    search(graph: Map<number, NodePath[]>, source: number, destination: number, visited: Set<number>, searchPath: NodePath[], queue: TinyQueue<NodePath>) {

        let sourceNodePaths = graph.get(source) || [];

        visited.add(source);

        sourceNodePaths.forEach(path => {

            if (!visited.has(path.nextNode)) {
                path.parentNode = path.node;
                queue.push(path);
            }

        })

        const node = queue.pop();

        if (node) {
            searchPath.push(node);

            if (node.nextNode == destination) {
                this.finalNode = node;
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


