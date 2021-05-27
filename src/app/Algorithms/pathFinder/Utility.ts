import { Injectable } from '@angular/core';
import { NodePath } from '../utility/Node';

@Injectable({ providedIn: 'root' })
export class Utility {

    constructor() { }

    createNodeGraph(width: number, height: number, traversalArray: number[][]) {

        let graph = new Map();

        traversalArray.forEach((data) => {
            if (data.length == 4) {

                const node = data[0];
                const nextNode = data[1];
                let direction = data[2];

                if (!graph.has(node)) {
                    graph.set(node, []);
                }

                let distFromSource = this.findDistance(nextNode, 0, width);
                let distFromDestination = this.findDistance(nextNode, width * height - 1, width)

                const nodePath: NodePath = { node, nextNode, direction, distFromSource, distFromDestination };
                graph.get(node).push(nodePath);


                direction = direction + 2;

                if (direction > 4) {
                    direction = direction - 4;
                }

                if (!graph.has(nextNode)) {
                    graph.set(nextNode, []);

                }

                distFromSource = this.findDistance(node, 0, width);
                distFromDestination = this.findDistance(node, width * height - 1, width);

                const nodePathAlt: NodePath = { node: nextNode, nextNode: node, direction, distFromSource, distFromDestination };
                graph.get(nextNode).push(nodePathAlt)

            }
        })

        return graph;
    }

    findDistance(node: number, destinationNode: number, width: number): any {

        let heightDiff = 0;
        let widthDiff = 0;

        widthDiff = Math.abs(node % width - destinationNode % width);

        heightDiff = Math.floor(Math.abs(node - destinationNode) / width);

        return Math.sqrt(Math.pow(heightDiff, 2) + Math.pow(widthDiff, 2));
    }

    findBestPath(searchPath: NodePath[], destination: number) {
        let bestPath: NodePath[] = [];

        for (let i = searchPath.length - 1; i >= 0; i--) {
            if (searchPath[i].nextNode == destination) {
                bestPath.push(searchPath[i]);
                destination = searchPath[i].node;
            }
        }

        return bestPath;
    }
}