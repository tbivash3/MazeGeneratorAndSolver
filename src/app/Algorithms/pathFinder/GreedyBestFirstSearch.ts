import { Injectable } from '@angular/core';
import { NodePath } from '../utility/Node';
import { Utility } from './Utility';
import TinyQueue from 'tinyqueue';

@Injectable({ providedIn: 'root' })
export class GreedyBestFirstSearch {
    constructor(private utility: Utility) { }

    findPath(width: number, height: number, traversalArray: number[][]) {

        let graph = this.utility.createNodeGraph(width, height, traversalArray);

        return this.search(graph, 0, width * height - 1);
    }

    search(graph: Map<number, NodePath[]>, source: number, destination: number) {

        let searchPath: NodePath[] = [];

        let allPaths: NodePath[][] = [];

        let visited: Set<number> = new Set();

        let queue = this.getPriorityQueue();

        let adjacentNodes = graph.get(source) || [];

        adjacentNodes.forEach(node => {
            queue.push(node);
        })

        visited.add(source);

        while (queue.length) {

            const node = queue.pop();

            console.log(node);

            if (node) {
                searchPath.push(node);
                visited.add(node.nextNode);
            }

            if (node?.nextNode == destination) {
                break;
            }

            adjacentNodes = graph.get(node?.nextNode || 0) || [];


            adjacentNodes.forEach(node => {

                if (!visited.has(node.nextNode)) {
                    queue.push(node);
                }
            })
        }

        return searchPath;
    }

    getPriorityQueue() {
        return new TinyQueue([], function (a: NodePath, b: NodePath) {
            const totalDistA = a.distFromDestination;
            const totalDistB = b.distFromDestination;

            return totalDistA - totalDistB;
        });
    }

}
